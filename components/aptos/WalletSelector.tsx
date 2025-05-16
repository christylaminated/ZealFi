"use client";

import {
  APTOS_CONNECT_ACCOUNT_URL,
  AboutAptosConnect,
  AboutAptosConnectEducationScreen,
  AdapterWallet,
  AdapterNotDetectedWallet,
  AptosPrivacyPolicy,
  WalletItem,
  groupAndSortWallets,
  isAptosConnectWallet,
  isInstallRequired,
  truncateAddress,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { ArrowLeft, ArrowRight, ChevronDown, Copy, LogOut, User } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WalletSelectorProps {
  onBeforeConnect?: () => void;
}

export function WalletSelector({ onBeforeConnect }: WalletSelectorProps) {
  const { account, connected, disconnect, wallet } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const copyAddress = useCallback(async () => {
    if (!account?.address.toStringLong()) return;
    try {
      await navigator.clipboard.writeText(account.address.toStringLong());
      console.log("Copied wallet address to clipboard");
    } catch (error) {
      console.error("Failed to copy wallet address", error);
    }
  }, [account?.address]);

  return connected ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          {account?.ansName || truncateAddress(account?.address.toStringLong()) || "Unknown"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={copyAddress} className="gap-2">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>
        {wallet && isAptosConnectWallet(wallet) && (
          <DropdownMenuItem asChild>
            <a href={APTOS_CONNECT_ACCOUNT_URL} target="_blank" rel="noopener noreferrer" className="flex gap-2">
              <User className="h-4 w-4" /> Account
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={disconnect} className="gap-2">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-button text-white font-medium">Connect Wallet</Button>
      </DialogTrigger>
      <ConnectWalletDialog close={closeDialog} onBeforeConnect={onBeforeConnect} />
    </Dialog>
  );
}

interface ConnectWalletDialogProps {
  close: () => void;
}

interface ConnectWalletDialogProps {
  close: () => void;
  onBeforeConnect?: () => void;
}

function ConnectWalletDialog({ close, onBeforeConnect }: ConnectWalletDialogProps) {
  const { wallets = [] } = useWallet();
  const { aptosConnectWallets, availableWallets, installableWallets } = groupAndSortWallets(wallets);

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  return (
    <DialogContent className="max-h-screen overflow-auto">
      <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
        <DialogHeader>
          <DialogTitle className="flex flex-col text-center leading-snug">
            {hasAptosConnectWallets ? (
              <>
                <span>Log in or sign up</span>
                <span>with Social + Aptos Connect</span>
              </>
            ) : (
              "Connect Wallet"
            )}
          </DialogTitle>
        </DialogHeader>

        {hasAptosConnectWallets && (
          <div className="flex flex-col gap-2 pt-3">
            {aptosConnectWallets.map((wallet) => (
              <AptosConnectWalletRow key={wallet.name} wallet={wallet} onConnect={close} onBeforeConnect={onBeforeConnect} />
            ))}
            <p className="flex gap-1 justify-center items-center text-muted-foreground text-sm">
              Learn more about{" "}
              <AboutAptosConnect.Trigger className="flex gap-1 py-3 items-center text-foreground">
                Aptos Connect <ArrowRight size={16} />
              </AboutAptosConnect.Trigger>
            </p>
            <AptosPrivacyPolicy className="flex flex-col items-center py-1">
              <p className="text-xs leading-5">
                <AptosPrivacyPolicy.Disclaimer />{" "}
                <AptosPrivacyPolicy.Link className="text-muted-foreground underline underline-offset-4" />
                <span className="text-muted-foreground">.</span>
              </p>
              <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-muted-foreground" />
            </AptosPrivacyPolicy>
            <div className="flex items-center gap-3 pt-4 text-muted-foreground">
              <div className="h-px w-full bg-secondary" />
              Or
              <div className="h-px w-full bg-secondary" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-3">
          {availableWallets.map((wallet) => (
            <WalletRow key={wallet.name} wallet={wallet} onConnect={close} onBeforeConnect={onBeforeConnect} />
          ))}
          {!!installableWallets.length && (
            <div className="flex flex-col gap-3">
              <Button size="sm" variant="ghost" className="gap-2">
                More wallets <ChevronDown />
              </Button>
              <div className="flex flex-col gap-3">
                {installableWallets.map((wallet) => (
                  <WalletRow key={wallet.name} wallet={wallet} onConnect={close} onBeforeConnect={onBeforeConnect} />
                ))}
              </div>
            </div>
          )}
        </div>
      </AboutAptosConnect>
    </DialogContent>
  );
}

interface WalletRowProps {
  wallet: AdapterWallet | AdapterNotDetectedWallet;
  onConnect?: () => void;
  onBeforeConnect?: () => void;
}

function WalletRow({ wallet, onConnect, onBeforeConnect }: WalletRowProps) {
  return (
    <WalletItem
      wallet={wallet}
      onConnect={() => {
        if (onBeforeConnect) onBeforeConnect();
        if (onConnect) onConnect();
      }}
      className="flex items-center justify-between px-4 py-3 gap-4 border rounded-md"
    >
      <div className="flex items-center gap-4">
        <WalletItem.Icon className="h-6 w-6" />
        <WalletItem.Name className="text-base font-normal" />
      </div>
      {isInstallRequired(wallet) ? (
        <Button size="sm" variant="ghost" asChild>
          <WalletItem.InstallLink />
        </Button>
      ) : (
        <WalletItem.ConnectButton asChild>
          <Button size="sm">Connect</Button>
        </WalletItem.ConnectButton>
      )}
    </WalletItem>
  );
}

function AptosConnectWalletRow({ wallet, onConnect, onBeforeConnect }: WalletRowProps) {
  return (
    <WalletItem wallet={wallet} onConnect={() => {
        if (onBeforeConnect) onBeforeConnect();
        if (onConnect) onConnect();
      }}>
      <WalletItem.ConnectButton asChild>
        <Button size="lg" variant="outline" className="w-full gap-4">
          <WalletItem.Icon className="h-5 w-5" />
          <WalletItem.Name className="text-base font-normal" />
        </Button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}

function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
  // Use type assertion to work around TypeScript errors
  const screenAny = screen as any;
  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4"
        onClick={() => screenAny.back?.()}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">{screenAny.title || screenAny.Title || 'About Aptos Connect'}</h2>
        <p className="text-sm text-muted-foreground">{screenAny.description || screenAny.Description || ''}</p>
      </div>

      <div className="space-y-2">
        {(screenAny.bullets || screenAny.Bullets || []).map((bullet: any, i: number) => (
          <div key={i} className="flex gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              {i + 1}
            </div>
            <p className="text-sm">{typeof bullet === 'string' ? bullet : bullet.text || ''}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => screenAny.next?.()} className="px-8">
          {screenAny.nextButtonText || screenAny.NextButtonText || "Next"}
        </Button>
      </div>
    </div>
  );
}
