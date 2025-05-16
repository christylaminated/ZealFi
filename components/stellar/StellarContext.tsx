"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as StellarSdk from 'stellar-sdk';
import { useAptosWallet } from '@/hooks/useAptosWallet';
import { useToast } from '@/components/ui/use-toast';

// Define the Stellar network to use (testnet for development)
const STELLAR_NETWORK = 'TESTNET';
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

// Define the context type
interface StellarContextType {
  stellarPublicKey: string | null;
  stellarKeyPair: StellarSdk.Keypair | null;
  isConnected: boolean;
  balance: string | null;
  isLoading: boolean;
  publicKey: string | null; // Added for easier access in components
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendPayment: (destination: string, amount: string, asset?: StellarSdk.Asset) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

// Create the context
const StellarContext = createContext<StellarContextType | undefined>(undefined);

// Provider component
export function StellarProvider({ children }: { children: ReactNode }) {
  const { connected: aptosConnected, account: aptosAccount } = useAptosWallet();
  const { toast } = useToast();
  
  const [stellarPublicKey, setStellarPublicKey] = useState<string | null>(null);
  const [stellarKeyPair, setStellarKeyPair] = useState<StellarSdk.Keypair | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for stored Stellar keys when Aptos wallet is connected
  useEffect(() => {
    if (aptosConnected && aptosAccount) {
      const storedKey = localStorage.getItem(`stellar_key_${aptosAccount.address.toString()}`);
      if (storedKey) {
        try {
          // Recover the keypair from the stored secret
          const keyPair = StellarSdk.Keypair.fromSecret(storedKey);
          setStellarKeyPair(keyPair);
          setStellarPublicKey(keyPair.publicKey());
          setIsConnected(true);
          refreshBalance(keyPair.publicKey());
        } catch (error) {
          console.error("Failed to recover Stellar keypair:", error);
          localStorage.removeItem(`stellar_key_${aptosAccount.address.toString()}`);
        }
      }
    } else {
      // Disconnect Stellar wallet if Aptos wallet is disconnected
      disconnectWallet();
    }
  }, [aptosConnected, aptosAccount]);

  // Connect to Stellar wallet
  const connectWallet = async () => {
    if (!aptosConnected || !aptosAccount) {
      toast({
        title: "Error",
        description: "Please connect your Aptos wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate a new Stellar keypair
      const keyPair = StellarSdk.Keypair.random();
      
      // Store the secret key securely (in a real app, use a more secure method)
      localStorage.setItem(`stellar_key_${aptosAccount.address.toString()}`, keyPair.secret());
      
      setStellarKeyPair(keyPair);
      setStellarPublicKey(keyPair.publicKey());
      setIsConnected(true);
      
      toast({
        title: "Stellar Wallet Connected",
        description: "Your Stellar wallet has been created and linked to your Aptos account",
      });
      
      // Fund the account on testnet for development purposes
      try {
        await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(keyPair.publicKey())}`);
        await refreshBalance(keyPair.publicKey());
      } catch (fundError) {
        console.error("Failed to fund testnet account:", fundError);
      }
    } catch (error) {
      console.error("Failed to create Stellar wallet:", error);
      toast({
        title: "Error",
        description: "Failed to create Stellar wallet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect from Stellar wallet
  const disconnectWallet = () => {
    if (aptosAccount) {
      localStorage.removeItem(`stellar_key_${aptosAccount.address.toString()}`);
    }
    setStellarKeyPair(null);
    setStellarPublicKey(null);
    setBalance(null);
    setIsConnected(false);
  };

  // Refresh account balance
  const refreshBalance = async (publicKey: string = stellarPublicKey || '') => {
    if (!publicKey) return;
    
    setIsLoading(true);
    try {
      const account = await server.loadAccount(publicKey);
      const xlmBalance = account.balances.find(
        (b: any) => b.asset_type === 'native'
      );
      
      setBalance(xlmBalance ? xlmBalance.balance : '0');
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  // Send a payment
  const sendPayment = async (
    destination: string,
    amount: string,
    asset: StellarSdk.Asset = StellarSdk.Asset.native()
  ): Promise<boolean> => {
    if (!stellarKeyPair || !stellarPublicKey) {
      toast({
        title: "Error",
        description: "Stellar wallet not connected",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      // First, check if the destination account exists
      try {
        await server.loadAccount(destination);
      } catch (error) {
        // If the destination doesn't exist, we need to create it with a create_account operation
        // This is common on testnet when sending to new addresses
        toast({
          title: "Notice",
          description: "Creating destination account first (testnet only)",
        });
        
        try {
          // Fund the account using friendbot (testnet only)
          await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(destination)}`);
          // Wait a moment for the account to be created
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (fundError) {
          console.error("Failed to create destination account:", fundError);
        }
      }

      // Load the sender account
      const account = await server.loadAccount(stellarPublicKey);
      
      // Build the transaction
      const fee = await server.fetchBaseFee();
      const transaction = new StellarSdk.TransactionBuilder(account, { 
        fee: fee.toString(), 
        networkPassphrase: StellarSdk.Networks[STELLAR_NETWORK]
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination,
            asset,
            amount,
          })
        )
        .setTimeout(30)
        .build();
      
      // Sign the transaction
      transaction.sign(stellarKeyPair);
      
      // Submit the transaction with retry logic
      let result;
      try {
        result = await server.submitTransaction(transaction);
      } catch (submitError: any) {
        console.error("Transaction submission error:", submitError);
        
        // Check if it's a timeout or connection issue
        if (submitError.response && submitError.response.status === 400) {
          // Sometimes the transaction might have gone through despite the error
          // Wait a bit and check if the balance changed
          await new Promise(resolve => setTimeout(resolve, 3000));
          const oldBalance = balance;
          await refreshBalance();
          
          if (balance !== oldBalance) {
            // Balance changed, so transaction probably went through
            toast({
              title: "Payment Likely Successful",
              description: `Balance changed, payment of ${amount} XLM may have succeeded despite error.`,
            });
            return true;
          }
        }
        
        toast({
          title: "Payment Failed",
          description: submitError.message || "Failed to send payment. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Payment Sent",
        description: `Successfully sent ${amount} XLM to ${destination.substring(0, 8)}...`,
      });
      
      // Refresh balance after payment
      await refreshBalance();
      
      return true;
    } catch (error: any) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to send payment. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Provide the context value
  const contextValue = {
    stellarPublicKey,
    stellarKeyPair,
    isConnected,
    balance,
    isLoading,
    publicKey: stellarPublicKey, // Add publicKey alias for stellarPublicKey
    connectWallet,
    disconnectWallet,
    sendPayment,
    refreshBalance,
  };

  return (
    <StellarContext.Provider value={contextValue}>
      {children}
    </StellarContext.Provider>
  );
}

// Custom hook to use the Stellar context
export function useStellar() {
  const context = useContext(StellarContext);
  if (context === undefined) {
    throw new Error('useStellar must be used within a StellarProvider');
  }
  return context;
}
