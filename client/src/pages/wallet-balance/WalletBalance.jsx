import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlockchain } from "../../context/BlockchainContext";
import TransactionsTable from "../../components/transactions-table/TransactionsTable";

/**
 * WalletBalance component shows the balance of a specific wallet
 * and lists all transactions associated with it.
 *
 * @component
 * @returns {JSX.Element} The rendered wallet balance component.
 */
const WalletBalance = () => {
  const { address } = useParams(); // Get wallet address from route parameters
  const blockchainService = useBlockchain(); // Access blockchain service from context

  // State to manage wallet details
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setWalletAddress(address);

    // Get balance and transactions for the wallet address
    const blockchain = blockchainService.blockchainInstance;
    const walletBalance = blockchain.getBalanceOfAddress(address);
    const walletTransactions = blockchain.getAllTransactionsForWallet(address);

    setBalance(walletBalance);
    setTransactions(walletTransactions);
  }, [address, blockchainService]);

  return (
    <div className="container">
      <h1>Wallet details</h1>
      <p style={{ wordWrap: "break-word" }}>
        <strong>Address:</strong>
        <br />
        {walletAddress}
      </p>

      <p>
        <strong>Balance:</strong>
        <br />
        {balance}
      </p>

      <hr />

      <h1>Transactions</h1>
      {transactions.length === 0 ? (
        <p>This wallet has made no transactions (yet)</p>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
    </div>
  );
};

export default WalletBalance;
