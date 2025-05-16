"use client";

import { useAptosWallet } from "@/hooks/useAptosWallet";
import { AptosIntegration } from "@/components/aptos/AptosIntegration";
import { AptosWalletButton } from "@/components/aptos/AptosWalletButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WalletPage() {
  const { connected } = useAptosWallet();
  const router = useRouter();

  // Redirect to login if not connected
  useEffect(() => {
    if (!connected) {
      router.push("/login");
    }
  }, [connected, router]);

  if (!connected) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="p-4 border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-blue-400 glow-text">ZealFi</h1>
            <p className="text-sm font-semibold text-white">Wallet Integration</p>
          </div>
          <AptosWalletButton />
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-20 hexagon-grid">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-400 glow-text mb-2">Aptos Wallet</h2>
            <p className="text-gray-400">
              Your wallet is connected to the Aptos blockchain. You can view your wallet information and interact with the blockchain below.
            </p>
          </div>
          
          <AptosIntegration />
        </div>
      </main>

      <footer className="p-4 border-t border-gray-800 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>ZealFi u00a9 {new Date().getFullYear()} - Powered by Aptos Blockchain</p>
        </div>
      </footer>
    </div>
  );
}
