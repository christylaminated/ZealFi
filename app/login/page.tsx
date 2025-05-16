"use client";

import { useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { AptosWalletButton } from "@/components/aptos/AptosWalletButton";
import Image from "next/image";

export default function LoginPage() {
  const { connected } = useWallet();
  const router = useRouter();

  // Redirect to web3 page if already connected
  useEffect(() => {
    if (connected) {
      router.push("/goal-pods");
    }
  }, [connected, router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-400 glow-text mb-2">ZealFi</h1>
        <p className="text-xl font-semibold text-white">
          Stake Your Goals.
          <br />
          Share Your Wins.
        </p>
      </div>

      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900/80 rounded-xl backdrop-blur-md border border-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-8">
            Connect your Petra wallet to access the ZealFi platform and start staking your goals.
          </p>
        </div>

        <div className="flex justify-center">
          <AptosWalletButton />
        </div>

        <div className="pt-6 text-center">
          <p className="text-sm text-gray-500">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-1/3 pointer-events-none overflow-hidden opacity-30">
        <div className="hexagon-grid absolute inset-0"></div>
      </div>
    </div>
  );
}
