import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/components/aptos/WalletProvider"
import { StellarProvider } from "@/components/stellar/StellarContext"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZealFi - Stake Your Goals. Share Your Wins.",
  description: "Stake stablecoins to back your personal goals and earn rewards",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <WalletProvider>
            <StellarProvider>
              {children}
              <Toaster />
            </StellarProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
