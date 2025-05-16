"use client";

import { useState } from "react";
import { useAptosWallet } from "@/hooks/useAptosWallet";
import { useStellar } from "@/components/stellar/StellarContext";
import { StellarPayment } from "@/components/stellar/StellarPayment";
import { WalletDisplay } from "@/components/aptos/WalletDisplay";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export default function PaymentDemoPage() {
  const { connected: aptosConnected } = useAptosWallet();
  const { isConnected: stellarConnected, publicKey, balance } = useStellar();
  const router = useRouter();
  const { toast } = useToast();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Demo payment details
  const demoPayment = {
    amount: "1.5",
    recipientAddress: "GBZX4364PEPQTDICMIQDZ56K4T75QZCR4NBEYKO6PDRJAHZKGUOJPCXB" // Example Stellar address
  };

  const handleStartPayment = () => {
    if (!aptosConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your Aptos wallet first",
        variant: "destructive"
      });
      return;
    }
    
    if (!stellarConnected) {
      toast({
        title: "Stellar Wallet Required",
        description: "Please connect your Stellar wallet to make payments",
        variant: "destructive"
      });
      return;
    }
    
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setPaymentSuccess(true);
    toast({
      title: "Payment Complete",
      description: "Your demo payment was successful!",
    });
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    toast({
      title: "Payment Cancelled",
      description: "You've cancelled the payment process",
    });
  };

  const resetDemo = () => {
    setPaymentSuccess(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="p-4 border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-blue-400 glow-text">ZealFi</h1>
            <p className="text-sm font-semibold text-white">Payment Demo</p>
          </div>
          <div className="flex items-center gap-2">
            <WalletDisplay />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20 hexagon-grid">
        <div className="max-w-3xl mx-auto w-full">
          <Link href="/wallets">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Wallets
            </Button>
          </Link>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-400 glow-text mb-2">Stellar Payment Demo</h2>
            <p className="text-gray-400">
              This demo shows how ZealFi integrates Stellar payments while using Aptos for authentication.
            </p>
          </div>
          
          {showPayment ? (
            <div className="flex justify-center">
              <StellarPayment 
                amount={demoPayment.amount}
                recipientAddress={demoPayment.recipientAddress}
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
                title="Demo Payment"
                description="This is a test payment using the Stellar network"
              />
            </div>
          ) : paymentSuccess ? (
            <Card className="bg-gray-900/80 border-gray-800">
              <CardHeader>
                <CardTitle className="text-green-400">Payment Successful!</CardTitle>
                <CardDescription>
                  Your demo payment has been completed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-900/20 border border-green-900/30 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Status</span>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Amount</span>
                    <span className="text-white font-medium">{demoPayment.amount} XLM</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Recipient</span>
                    <span className="text-white font-mono text-xs truncate max-w-[200px]">
                      {demoPayment.recipientAddress}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Network</span>
                    <span className="text-white">Stellar Testnet</span>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button onClick={resetDemo} className="gradient-button text-white font-medium">
                    Try Another Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="bg-gray-900/80 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-blue-400">Payment Integration Demo</CardTitle>
                  <CardDescription>
                    Experience how ZealFi combines Aptos and Stellar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Aptos Wallet</span>
                      <Badge variant={aptosConnected ? "outline" : "destructive"} className={aptosConnected ? "bg-green-500/20 text-green-400 border-green-500/50" : ""}>
                        {aptosConnected ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Stellar Wallet</span>
                      <Badge variant={stellarConnected ? "outline" : "destructive"} className={stellarConnected ? "bg-green-500/20 text-green-400 border-green-500/50" : ""}>
                        {stellarConnected ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                    {stellarConnected && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Stellar Balance</span>
                          <span className="text-white font-medium">{parseFloat(balance || '0').toFixed(2)} XLM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Stellar Address</span>
                          <span className="text-white font-mono text-xs truncate max-w-[200px]">{publicKey}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="p-4 bg-blue-900/20 border border-blue-900/30 rounded-md">
                    <h4 className="font-semibold text-white mb-2">Demo Payment Details</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Amount</span>
                      <span className="text-white font-medium">{demoPayment.amount} XLM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Recipient</span>
                      <span className="text-white font-mono text-xs truncate max-w-[200px]">
                        {demoPayment.recipientAddress}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center pt-2">
                    <Button 
                      onClick={handleStartPayment} 
                      className="gradient-button text-white font-medium"
                      disabled={!aptosConnected || !stellarConnected}
                    >
                      Start Demo Payment
                    </Button>
                  </div>
                  
                  {(!aptosConnected || !stellarConnected) && (
                    <div className="p-3 bg-yellow-900/20 border border-yellow-900/30 rounded-md text-yellow-500 text-sm text-center">
                      Please connect both wallets to try the payment demo
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/80 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-blue-400">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                      <div className="bg-blue-500/20 text-blue-400 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                        <span className="font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-white">Login with Aptos</h4>
                      <p className="text-sm text-gray-400 mt-2">
                        Connect your Aptos wallet to authenticate
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                      <div className="bg-blue-500/20 text-blue-400 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                        <span className="font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-white">Connect Stellar</h4>
                      <p className="text-sm text-gray-400 mt-2">
                        Link your Stellar wallet for payments
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                      <div className="bg-blue-500/20 text-blue-400 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                        <span className="font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-white">Make Payments</h4>
                      <p className="text-sm text-gray-400 mt-2">
                        Send XLM quickly and with low fees
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Navigation currentPath="/payment-demo" />
    </div>
  );
}
