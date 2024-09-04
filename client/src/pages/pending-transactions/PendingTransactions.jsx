import { useState } from "react";
import { useNavigate } from "react-router-dom";
import blockchainService from "../../services/blockchainService";
import TransactionsTable from "../../components/transactions-table/TransactionsTable";
import Alert from "../../components/alert/Alert";

/**
 * PendingTransactions component displays the list of pending transactions
 * and allows the user to mine them
 * @returns {JSX.Element} The rendered component for pending transactions.
 */
const PendingTransactions = () => {
  const [pendingTransactions, setPendingTransactions] = useState(
    blockchainService.getPendingTransactions()
  );

  const navigate = useNavigate(); // Initialize the navigate hook

  const [alert, setAlert] = useState({ show: false, title: "", message: "" });

  /**
   * Mines the pending transactions and updates the state.
   * Displays a success alert upon successful mining.
   */
  const minePendingTransactions = () => {
    blockchainService.minePendingTransactions();
    setPendingTransactions(blockchainService.getPendingTransactions());

    setAlert({
      show: true,
      title: "Success!",
      message: "Block mined successfully",
    });
  };

  return (
    <div className="container mt-4">
      <h1>Pending transactions</h1>
      <p className="text-muted">
        These transactions are waiting to be included in the next block. Next
        block is created when you start the mining process.
      </p>

      <TransactionsTable transactions={pendingTransactions} />

      <button
        className="btn btn-primary mt-3"
        onClick={minePendingTransactions}
      >
        Start mining
      </button>

      <Alert
        show={alert.show}
        onClose={() => {
          setAlert({ ...alert, show: false }); // Close alert handler
          navigate("/"); // Redirect to the main page
        }}
        title={alert.title}
        message={alert.message}
      />
    </div>
  );
};

export default PendingTransactions;
