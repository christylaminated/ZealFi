"use client";

import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { HexagonAvatar } from "@/components/hexagon-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, ExternalLink, LogOut } from "lucide-react";
import { useCallback } from "react";
import { useAptosWallet } from "@/hooks/useAptosWallet";
import { useToast } from "@/components/ui/use-toast";

export function WalletDisplay() {
  const { account, connected, disconnect, wallet } = useAptosWallet();
  const { toast } = useToast();

  const copyAddress = useCallback(async () => {
    if (!account?.address.toStringLong()) return;
    try {
      await navigator.clipboard.writeText(account.address.toStringLong());
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy wallet address", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address",
      });
    }
  }, [account?.address, toast]);

  if (!connected || !account) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 bg-transparent hover:bg-transparent">
          <HexagonAvatar 
            src="/images/default-avatar.png" 
            alt="User" 
            className="h-10 w-10 border-2 border-blue-500" 
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-gray-900 border border-gray-800">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium text-blue-400">Wallet</p>
          <p className="text-xs text-gray-400">
            {truncateAddress(account?.address.toStringLong() || "")}
          </p>
        </div>
        <DropdownMenuItem 
          onClick={copyAddress}
          className="cursor-pointer hover:bg-gray-800 text-gray-300 hover:text-white"
        >
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => {
            if (account?.address) {
              window.open(
                `https://explorer.aptoslabs.com/account/${account.address.toString()}`,
                "_blank"
              );
            }
          }}
          className="cursor-pointer hover:bg-gray-800 text-gray-300 hover:text-white"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View on Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={disconnect}
          className="cursor-pointer hover:bg-gray-800 text-gray-300 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
