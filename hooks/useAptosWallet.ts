"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useAptosWallet() {
  const { connected, account, wallet, disconnect } = useWallet();
  const router = useRouter();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Handle wallet connection state changes
  useEffect(() => {
    if (connected && account) {
      // Update wallet address
      setWalletAddress(account.address.toString());
      
      // Show success toast if we were in the connecting state
      if (isConnecting) {
        toast({
          title: "Wallet Connected",
          description: `Successfully connected to ${wallet?.name || 'wallet'}`,
          variant: "default",
        });
        setIsConnecting(false);
        
        // Redirect to goal-pods page after successful connection
        setTimeout(() => {
          router.push("/goal-pods");
        }, 500);
      }
    } else {
      setWalletAddress(null);
    }
  }, [connected, account, wallet, isConnecting, toast, router]);

  // Handle disconnect
  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
      variant: "default",
    });
    router.push("/login");
  };

  return {
    connected,
    account,
    wallet,
    walletAddress,
    isConnecting,
    setIsConnecting,
    disconnect: handleDisconnect,
  };
}
