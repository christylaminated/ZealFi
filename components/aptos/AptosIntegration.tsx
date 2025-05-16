"use client";

import { useAptosWallet } from "@/hooks/useAptosWallet";
import { WalletInfo } from "./WalletInfo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function AptosIntegration() {
  const { connected, account, wallet } = useAptosWallet();
  const { toast } = useToast();
  const [isTransacting, setIsTransacting] = useState(false);

  // Example function to simulate a transaction
  const simulateTransaction = async () => {
    if (!connected || !account) return;
    
    setIsTransacting(true);
    toast({
      title: "Processing",
      description: "Simulating transaction...",
    });
    
    // Simulate a delay for transaction processing
    setTimeout(() => {
      setIsTransacting(false);
      toast({
        title: "Success",
        description: "Transaction completed successfully!",
        variant: "default",
      });
    }, 2000);
  };

  if (!connected || !account) {
    return null;
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WalletInfo />
        
        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-blue-400">Aptos Actions</CardTitle>
            <CardDescription>
              Interact with the Aptos blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={simulateTransaction} 
              disabled={isTransacting}
              className="w-full gradient-button text-white font-medium"
            >
              {isTransacting ? "Processing..." : "Simulate Transaction"}
            </Button>
            
            <div className="text-sm text-gray-400 mt-4">
              <p>This is a placeholder for Aptos blockchain interactions.</p>
              <p className="mt-2">In a real application, you would implement:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Token transfers</li>
                <li>Smart contract interactions</li>
                <li>NFT minting/trading</li>
                <li>Staking and rewards</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
