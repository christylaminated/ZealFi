"use client";

import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Copy, ExternalLink } from "lucide-react";
import { useAptosWallet } from "@/hooks/useAptosWallet";
import { useToast } from "@/components/ui/use-toast";

export function WalletInfo() {
  const { connected, account, wallet } = useAptosWallet();
  const { toast } = useToast();

  // Copy wallet address to clipboard
  const copyAddress = async () => {
    if (!account?.address) return;
    
    try {
      await navigator.clipboard.writeText(account.address.toString());
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  // View account on explorer
  const viewOnExplorer = () => {
    if (!account?.address) return;
    window.open(
      `https://explorer.aptoslabs.com/account/${account.address.toString()}`,
      "_blank"
    );
  };

  if (!connected || !account) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-gray-400">
        <span className="mr-2">Connected:</span>
        <span className="font-mono text-blue-400">{truncateAddress(account.address.toString())}</span>
      </div>
      <button
        onClick={copyAddress}
        className="text-gray-400 hover:text-white p-1"
        title="Copy Address"
      >
        <Copy className="h-3 w-3" />
      </button>
      <button
        onClick={viewOnExplorer}
        className="text-gray-400 hover:text-white p-1"
        title="View on Explorer"
      >
        <ExternalLink className="h-3 w-3" />
      </button>
    </div>
  );
}
