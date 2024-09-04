<p align="center">
  <a href="https://github.com/AbbasFaeqHadi/savjeecoin-react-frontend" rel="noopener">
    <img width="100" height="150" src="./client/src/assets/logo-savjee.svg" alt="SavjeeCoin Logo">
  </a>
</p>

# SavjeeCoin React Frontend

A React-based web app that lets users explore, create transactions, and mine blocks on a simple blockchain.

## 🔗 Purpose

You can create transactions, mine blocks, and explore your own blockchain.

## 🏁 Getting Started

Follow these instructions to get a copy of the SavjeeCoin React front-end running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AbbasFaeqHadi/savjeecoin-react-frontend.git
   cd blockchain
   ```

2. **Change to the savjeecoin directory and install dependencies:**

   ```bash
   cd savjeecoin
   npm install
   ```

3. **Go back to previous directory**

   ```bash
   cd ..
   ```

4. **Change to the client directory, install dependencies and start the application**

   ```bash
   cd client
   npm install
   npm run dev
   ```

   The application should now be running on `http://localhost:5174`.

## 📖 Content

- **Home Page:** View blocks on the blockchain and explore transactions within each block.

- **Creating New Transactions:** Generate new transactions to any wallet for any amount (no validation). New transactions are added to "pending transactions," ready for inclusion in the next block.

- **Pending Transactions:** View all pending transactions, which will be included in the next block when mining starts.

- **Wallet Details:** Click on any wallet address to see an overview, including the current balance and all transactions to/from that wallet.

- **Settings:** Modify how challenging it is to mine new blocks and how much reward miners receive for their efforts.

## ⚠️ Disclaimer

This project is for educational purposes only and is not a complete blockchain implementation.

## 🙌 Acknowledgments

Based on the [SavjeeCoin](https://github.com/Savjee/SavjeeCoin) simple blockchain implementation by [Savjee](https://github.com/Savjee).
