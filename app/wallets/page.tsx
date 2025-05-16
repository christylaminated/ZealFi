"use client";

import { useAptosWallet } from "@/hooks/useAptosWallet";
import { useStellar } from "@/components/stellar/StellarContext";
import { StellarWallet } from "@/components/stellar/StellarWallet";
import { AptosWalletButton } from "@/components/aptos/AptosWalletButton";
import { WalletDisplay } from "@/components/aptos/WalletDisplay";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WalletsPage() {
  const { connected: aptosConnected } = useAptosWallet();
  const { isConnected: stellarConnected } = useStellar();
  const router = useRouter();

  // Redirect to login if not connected to Aptos
  useEffect(() => {
    if (!aptosConnected) {
      router.push("/login");
    }
  }, [aptosConnected, router]);

  if (!aptosConnected) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="p-4 border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-blue-400 glow-text">ZealFi</h1>
            <p className="text-sm font-semibold text-white">Wallets & Payments</p>
          </div>
          <div className="flex items-center gap-2">
            <WalletDisplay />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20 hexagon-grid">
        <div className="max-w-7xl mx-auto w-full">
          <Link href="/goal-pods">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Goal Pods
            </Button>
          </Link>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-400 glow-text mb-2">Your Wallets</h2>
            <p className="text-gray-400">
              ZealFi uses Aptos for authentication and Stellar for payments. Connect both wallets to get the full experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aptos Wallet Card */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-blue-400">Aptos Wallet</h3>
                  <p className="text-sm text-gray-400">Used for authentication</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M52.6545 49.1092C51.3876 49.1092 50.1208 48.7999 49.0631 48.1812L38.1749 41.7999C37.5562 41.4906 36.9376 41.4906 36.3189 41.7999L25.4307 48.1812C23.3153 49.4281 20.5813 49.1092 18.7751 47.3031C16.969 45.4969 16.6501 42.7629 17.897 40.6475L24.2783 29.7593C24.5876 29.1407 24.5876 28.522 24.2783 27.9033L17.897 17.0151C16.6501 14.8997 16.969 12.1657 18.7751 10.3596C20.5813 8.55339 23.3153 8.23448 25.4307 9.48136L36.3189 15.8627C36.9376 16.172 37.5562 16.172 38.1749 15.8627L49.0631 9.48136C51.1785 8.23448 53.9125 8.55339 55.7187 10.3596C57.5248 12.1657 57.8437 14.8997 56.5968 17.0151L50.2155 27.9033C49.9062 28.522 49.9062 29.1407 50.2155 29.7593L56.5968 40.6475C57.8437 42.7629 57.5248 45.4969 55.7187 47.3031C54.8907 48.4501 53.7438 49.1092 52.6545 49.1092Z" fill="#38BDF8"/>
                  </svg>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Status</span>
                  <span className={`text-sm ${aptosConnected ? 'text-green-400' : 'text-red-400'}`}>
                    {aptosConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <AptosWalletButton />
              </div>
            </div>
            
            {/* Stellar Wallet Card */}
            <StellarWallet />
          </div>
          
          {/* Payment Demo Section */}
          {aptosConnected && stellarConnected && (
            <div className="mt-10 p-6 bg-gray-900/80 border border-gray-800 rounded-xl">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Payment Integration</h3>
              <p className="text-gray-400 mb-6">
                ZealFi uses Aptos for authentication and smart contracts, while Stellar handles fast and low-cost payments.
                This hybrid approach gives you the best of both blockchains.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                  <div className="bg-blue-500/20 text-blue-400 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white">Secure Login</h4>
                  <p className="text-sm text-gray-400 mt-2">
                    Aptos provides secure wallet-based authentication
                  </p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                  <div className="bg-blue-500/20 text-blue-400 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white">Fast Payments</h4>
                  <p className="text-sm text-gray-400 mt-2">
                    Stellar enables quick and low-cost transactions
                  </p>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-lg text-center">
                  <div className="bg-blue-500/20 text-blue-400 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white">Smart Contracts</h4>
                  <p className="text-sm text-gray-400 mt-2">
                    Aptos powers ZealFi's goal staking contracts
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Navigation currentPath="/wallets" />
    </div>
  );
}
