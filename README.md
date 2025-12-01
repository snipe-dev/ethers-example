# simple ethers.js test
# This `README.md` was created using ChatGPT because I was too lazy to write a description for this test project myself.😁

A small test project written in **TypeScript** using **Node.js** and **ethers.js v6**.

The goal of this repository is to demonstrate basic but real-world Web3 tasks:
- connecting to an RPC node
- reading a wallet’s native balance
- interacting with an ERC-20 token contract
- normalizing on-chain values using token decimals
- calculating a wallet’s share of the total token supply

The project is intentionally kept **simple and transparent**, without frameworks or unnecessary abstractions.

---

## Project Structure

The project contains two independent test files that demonstrate different approaches to reading on-chain data.

### `simple.ts`

A straightforward example of working with `ethers.js`.

What this file does:
- connects to an RPC node
- reads the native balance of a wallet
- creates an ERC-20 contract instance
- queries the following contract methods:
    - `balanceOf`
    - `decimals`
    - `totalSupply`
    - `symbol`
- normalizes raw values using `decimals`
- prints to console:
    - native wallet balance
    - token balance
    - total token supply
    - percentage of total supply held by the wallet

This file demonstrates the **classic and most readable approach** to interacting with a smart contract.

---

### `multicall.ts`

An extended example that demonstrates an alternative data-fetching strategy.

Main idea:
- group multiple on-chain calls together
- reduce the number of RPC requests
- prepare for more efficient data fetching in larger applications

This file is useful as a reference for:
- optimizing read-only blockchain calls
- working with multiple contract calls at once
- building more advanced Web3 tooling

---

## Configuration

All configuration is located in:

config/config.ts

It contains:
- RPC URL
- wallet address
- token contract address
- native network symbol (e.g. BNB, ETH)

⚠️ This project **does not use private keys** and **does not send transactions**.  
It is strictly read-only and safe to run.

---

## Install dependencies:

```bash
npm install
```

##  Run:

```bash
npm run start
```

