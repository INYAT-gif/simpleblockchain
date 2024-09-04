import { useState } from "react";
import { useBlockchain } from "../../context/BlockchainContext";
import { Transaction } from "../../../../savjeecoin/src/blockchain";
import Alert from "../../components/alert/Alert";
import "./CreateTransaction.css";

/**
 * CreateTransaction component allows the user to create a new blockchain transaction.
 *
 * @component
 * @returns {JSX.Element} The rendered component for creating transactions.
 */
const CreateTransaction = () => {
  const blockchainService = useBlockchain();
  const walletKey = blockchainService.walletKeys[0];

  // State to manage user input
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });

  /**
   * Calculate the total amount of pending transactions for the wallet.
   *
   * @returns {number} The total amount of pending transactions for the wallet.
   */
  const getTotalPendingAmount = () => {
    const pendingTransactions = blockchainService.getPendingTransactions();
    return pendingTransactions
      .filter((tx) => tx.fromAddress === walletKey.publicKey)
      .reduce((total, tx) => total + tx.amount, 0);
  };

  /**
   * Handles the creation of a new transaction.
   * Checks for sufficient balance, valid recipient address, and valid amount.
   * Shows an alert if any checks fail.
   */
  const createTransaction = () => {
    const balance = blockchainService.getBalanceOfAddress(walletKey.publicKey);
    const totalPendingAmount = getTotalPendingAmount();
    const transactionAmount = parseFloat(amount);

    // Show Alert component if balance is insufficient, recipient address is empty, or amount is invalid
    if (transactionAmount > balance - totalPendingAmount) {
      setAlert({
        show: true,
        title: "Insufficient funds!",
        message: (
          <>
            <p>
              You do not have enough SavjeeCoin to make this transaction. Please
              fund your wallet.
            </p>
            <ul style={{ listStyle: "none" }}>
              <li>Balance: {balance}</li>
              <li>Pending: {totalPendingAmount}</li>
              <li>Transaction amount: {transactionAmount}</li>
            </ul>
          </>
        ),
      });
      return;
    }

    if (toAddress === "") {
      setAlert({
        show: true,
        title: "Invalid recipient address!",
        message: "The recipient's address cannot be empty.",
      });
      return;
    }

    if (amount === "" || transactionAmount <= 0) {
      setAlert({
        show: true,
        title: "Invalid amount!",
        message: "The amount must be greater than zero.",
      });
      return;
    }

    setAlert({ show: false });

    // Create new transaction
    const newTx = new Transaction(
      walletKey.publicKey,
      toAddress,
      transactionAmount
    );

    newTx.sign(walletKey.keyObj);
    blockchainService.addTransaction(newTx);

    // Reset form inputs
    setToAddress("");
    setAmount("");
  };

  return (
    <div className="container mt-4">
      <h1>Create transaction</h1>
      <p>Transfer some money to someone!</p>

      <div className="form-group mt-3">
        <label>From address</label>
        <input
          type="text"
          className="form-control"
          value={walletKey.publicKey}
          disabled
        />
        <small className="form-text text-muted">
          This is your wallet address. You cannot change it because you can only
          spend your own coins.
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="toAddress">To address</label>
        <input
          type="text"
          className="form-control"
          id="toAddress"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <small className="form-text text-muted">
          The address of the wallet where you want to send the money to. You can
          type random text here (if you are not interested in recovering the
          funds).
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <small className="form-text text-muted">
          The amount of money you want to send to the recipient. Note the amount
          shall not be higher than your balance.
        </small>
      </div>

      <button onClick={createTransaction} className="btn btn-primary">
        Sign & create transaction
      </button>

      <Alert
        show={alert.show}
        onClose={() => setAlert({ show: false })}
        {...alert}
      />
    </div>
  );
};

export default CreateTransaction;
