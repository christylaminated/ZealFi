"use client";

import { WalletSelector } from "./WalletSelector";
import { useAptosWallet } from "@/hooks/useAptosWallet";

export function AptosWalletButton() {
  const { setIsConnecting } = useAptosWallet();
  
  // When the WalletSelector is rendered, we're in the process of connecting
  // This will be used by our hook to show toast and redirect after connection
  return <WalletSelector onBeforeConnect={() => setIsConnecting(true)} />;
}
