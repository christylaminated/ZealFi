"use client";

import { useState } from 'react';
import { useStellar } from './StellarContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function StellarWallet() {
  const { 
    stellarPublicKey, 
    isConnected, 
    balance, 
    isLoading, 
    connectWallet, 
    disconnectWallet,
    sendPayment,
    refreshBalance
  } = useStellar();
  const { toast } = useToast();
  
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Copy address to clipboard
  const copyAddress = async () => {
    if (!stellarPublicKey) return;
    
    try {
      await navigator.clipboard.writeText(stellarPublicKey);
      toast({
        title: "Address Copied",
        description: "Stellar address copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  // View account on Stellar Explorer
  const viewOnExplorer = () => {
    if (!stellarPublicKey) return;
    window.open(`https://stellar.expert/explorer/testnet/account/${stellarPublicKey}`, '_blank');
  };

  // Handle payment submission
  const handleSendPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination || !amount) {
      toast({
        title: "Error",
        description: "Please enter destination address and amount",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    try {
      await sendPayment(destination, amount);
      setDestination('');
      setAmount('');
    } finally {
      setIsSending(false);
    }
  };

  // If not connected, show connect button
  if (!isConnected) {
    return (
      <Card className="w-full max-w-md bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-blue-400">Stellar Wallet</CardTitle>
          <CardDescription>
            Connect your Stellar wallet to make payments
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Button 
            onClick={connectWallet} 
            disabled={isLoading}
            className="gradient-button text-white font-medium"
          >
            {isLoading ? "Connecting..." : "Connect Stellar Wallet"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // If connected, show wallet interface
  return (
    <Card className="w-full max-w-md bg-gray-900/80 border-gray-800">
      <CardHeader>
        <CardTitle className="text-blue-400">Stellar Wallet</CardTitle>
        <CardDescription>
          Make payments with your Stellar wallet
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Wallet Info */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Address</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-blue-400 truncate max-w-[180px]">
                {stellarPublicKey}
              </span>
              <button
                onClick={copyAddress}
                className="text-gray-400 hover:text-white p-1"
                title="Copy Address"
              >
                <Copy className="h-3 w-3" />
              </button>
              <button
                onClick={viewOnExplorer}
                className="text-gray-400 hover:text-white p-1"
                title="View on Explorer"
              >
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Balance</span>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">
                {isLoading ? "Loading..." : `${parseFloat(balance || '0').toFixed(2)} XLM`}
              </span>
              <button
                onClick={() => refreshBalance()}
                className="text-gray-400 hover:text-white p-1"
                disabled={isLoading}
                title="Refresh Balance"
              >
                <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Send Payment Form */}
        <form onSubmit={handleSendPayment} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination Address</Label>
            <Input
              id="destination"
              placeholder="G..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (XLM)</Label>
            <Input
              id="amount"
              type="number"
              step="0.0001"
              min="0.0001"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full gradient-button text-white font-medium"
            disabled={isSending || isLoading}
          >
            {isSending ? "Sending..." : "Send Payment"}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="border-t border-gray-800 pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={disconnectWallet}
          className="text-xs w-full"
        >
          Disconnect Stellar Wallet
        </Button>
      </CardFooter>
    </Card>
  );
}
