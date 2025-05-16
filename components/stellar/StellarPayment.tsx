"use client";

import { useState } from 'react';
import { useStellar } from './StellarContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAptosWallet } from '@/hooks/useAptosWallet';

interface StellarPaymentProps {
  amount?: string;
  recipientAddress?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

export function StellarPayment({
  amount = '',
  recipientAddress = '',
  onSuccess,
  onCancel,
  title = 'Make a Payment',
  description = 'Send XLM to complete your transaction'
}: StellarPaymentProps) {
  const { isConnected, sendPayment, balance } = useStellar();
  const { connected: aptosConnected } = useAptosWallet();
  const { toast } = useToast();
  
  const [paymentAmount, setPaymentAmount] = useState(amount);
  const [destination, setDestination] = useState(recipientAddress);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle payment submission
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination || !paymentAmount) {
      toast({
        title: "Error",
        description: "Please enter destination address and amount",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      const success = await sendPayment(destination, paymentAmount);
      if (success) {
        toast({
          title: "Payment Successful",
          description: `You've sent ${paymentAmount} XLM successfully`,
        });
        if (onSuccess) onSuccess();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // If not connected to both wallets, show warning
  if (!aptosConnected || !isConnected) {
    return (
      <Card className="w-full max-w-md bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-blue-400">{title}</CardTitle>
          <CardDescription>
            Connect your wallets to make payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!aptosConnected && (
            <div className="p-3 bg-yellow-900/20 border border-yellow-900/30 rounded-md text-yellow-500 text-sm">
              Please connect your Aptos wallet first
            </div>
          )}
          
          {aptosConnected && !isConnected && (
            <div className="p-3 bg-yellow-900/20 border border-yellow-900/30 rounded-md text-yellow-500 text-sm">
              Please connect your Stellar wallet to make payments
            </div>
          )}
          
          <Button 
            onClick={onCancel} 
            variant="outline"
            className="w-full"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }

  // If connected, show payment form
  return (
    <Card className="w-full max-w-md bg-gray-900/80 border-gray-800">
      <CardHeader>
        <CardTitle className="text-blue-400">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-sm text-gray-400 flex justify-between items-center">
          <span>Available Balance:</span>
          <div className="flex items-center gap-2">
            <span className="stellar-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L15 9H23L17 14L19 22L12 17L5 22L7 14L1 9H9L12 1Z" fill="currentColor" />
              </svg>
              XLM
            </span>
            <span className="text-blue-400 font-semibold">{parseFloat(balance || '0').toFixed(2)}</span>
          </div>
        </div>
        
        <form onSubmit={handlePayment} className="space-y-4 payment-form">
          <div className="space-y-2">
            <Label htmlFor="destination">Recipient Address</Label>
            <Input
              id="destination"
              placeholder="G..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-gray-800 border-gray-700"
              disabled={!!recipientAddress}
            />
            {!!recipientAddress && (
              <p className="text-xs text-gray-500 mt-1">Recipient address is pre-filled for this payment</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (XLM)</Label>
            <Input
              id="amount"
              type="number"
              step="0.0001"
              min="0.0001"
              placeholder="0.00"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="bg-gray-800 border-gray-700"
              disabled={!!amount}
            />
            {!!amount && (
              <p className="text-xs text-gray-500 mt-1">Amount is pre-filled for this payment</p>
            )}
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              className="flex-1 gradient-button text-white font-medium"
              disabled={isProcessing || !paymentAmount || !destination}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
