# Algorand React Starter (Workshop Session 1)

A small React web app that connects to an **Algorand** wallet and sends a payment. It was made during an Algorand workshop with the **AlgoKit** starter template, and it's a good base for building a dApp frontend on Algorand.

## What it does

- **Connect a wallet**: Pera, Defly, or the local KMD wallet (via `@txnlab/use-wallet`)
- **Show your account**: address and network
- **Send a transaction**: a simple ALGO payment to any address
- Works with **LocalNet**, **TestNet**, and **MainNet**

## Tech stack

React, TypeScript, Vite, AlgoKit Utils, algosdk, use-wallet, notistack

## Getting started

You need Node.js 18+, [AlgoKit CLI](https://github.com/algorandfoundation/algokit-cli) 2+, and Docker if you want a local network.

1. Install dependencies:

   ```bash
   algokit project bootstrap all
   ```

2. Create your environment file from the template:

   ```bash
   cp .env.template .env
   ```

   The defaults point to **LocalNet**. For TestNet, change the `VITE_ALGOD_*` and `VITE_INDEXER_*` values to a public TestNet node such as [AlgoNode](https://algonode.io/).

3. (LocalNet only) Start a local Algorand network:

   ```bash
   algokit localnet start
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

## Project structure

| Path | What it is |
| --- | --- |
| `src/Home.tsx` | Main page |
| `src/components/ConnectWallet.tsx` | Wallet picker |
| `src/components/Account.tsx` | Shows the connected account |
| `src/components/Transact.tsx` | Sends a payment |
| `src/utils/network/` | Reads network settings from `.env` |
| `session1/` | The full AlgoKit workspace from the workshop session |

## Learn more

- [AlgoKit docs](https://developer.algorand.org/docs/get-started/algokit/)
- [use-wallet docs](https://txnlab.gitbook.io/use-wallet)
