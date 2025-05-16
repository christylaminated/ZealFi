# 🎯 ZealFi — Stake Your Goals. Share Your Wins.

**ZealFi** is a decentralized social platform that helps people commit to their goals by staking stablecoins — and getting rewarded only if they follow through.

---

## 🚀 What It Does

- Users **create or join goal pods** (e.g., workout 3x/week, reduce screen time, complete a side project).
- They **stake stablecoins** into a shared pool using their **Aptos wallet**.
- If they complete their goal (verified by peers or wearables), they **get their stake back — plus a reward**.
- If they don’t, their funds are redistributed to those who did.
- A built-in **social layer** allows users to share wins, build reputation, and stay motivated together.

---

## ⚙️ Tech Stack

### 🧠 Smart Contracts
- Built with **Move** and deployed on **Aptos Testnet**
- Handles:
  - Goal pod creation
  - Staking logic
  - Verification and deadlines
  - Automated reward distribution

### 🌉 Cross-Chain Payment Bridge
- Uses **Stellar** for fast and accessible USDC payments
- `stellar-sdk` listens for incoming payments on **Stellar Testnet**
- Backend mints equivalent value on Aptos, enabling non-Aptos users to participate

### 💻 Frontend
- **React** + **Tailwind CSS**
- Integrated with **Petra Wallet** via the Aptos TypeScript SDK
- Allows users to:
  - Explore goal pods
  - Connect wallets
  - Stake, verify, and share progress

---
## 🎥 Demo Video (CLICK IMAGE BELOW)

[![Watch the demo](https://img.youtube.com/vi/qT3aCh5ahPZGSfjyD4uc/0.jpg)](https://app.screencastify.com/v3/watch/qT3aCh5ahPZGSfjyD4uc)

CLICK IMAGE ABOVE TO WATCH DEMO VIDEO
<img width="494" alt="Screenshot 2025-05-16 at 1 46 04 PM" src="https://github.com/user-attachments/assets/5f770b22-bd0c-4fe7-9c29-9bccc4e1d6fc" />
<img width="1426" alt="Screenshot 2025-05-16 at 1 46 23 PM" src="https://github.com/user-attachments/assets/f41c0d0c-06f1-43a9-a20e-99b51b320960" />

ZealFi uses Aptos for on-chain logic and smart contracts, where users connect with Petra Wallet to stake funds into goal pods and trigger rewards via Move-based contracts. Stellar is used for fast, low-cost USDC payments; when a user sends funds on Stellar, the backend verifies the transaction with stellar-sdk and mints equivalent value on Aptos, bridging the two chains.

