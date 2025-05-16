"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { HomeScreen } from "@/components/home-screen";

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    // If not connected to wallet, redirect to login page
    if (!connected) {
      router.push("/login");
    }
  }, [connected, router]);

  // Only show HomeScreen if connected
  return connected ? <HomeScreen /> : null;
}
