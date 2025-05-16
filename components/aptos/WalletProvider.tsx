"use client";

import { PropsWithChildren } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { APTOS_API_KEY, NETWORK } from "@/lib/aptos-constants";
import { useToast } from "@/components/ui/use-toast";

export function WalletProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();

  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: NETWORK, aptosApiKeys: {[NETWORK]: APTOS_API_KEY} }}
      onError={(error) => {
        console.error("Wallet error:", error);
        toast({
          variant: "destructive",
          title: "Wallet Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
