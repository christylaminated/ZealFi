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
## 🎥 Demo Video

[![Watch the demo](https://img.youtube.com/vi/qT3aCh5ahPZGSfjyD4uc/0.jpg)](https://app.screencastify.com/v3/watch/qT3aCh5ahPZGSfjyD4uc)

👉 Click the image above to watch the full demo.

