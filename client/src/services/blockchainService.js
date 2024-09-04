import { Blockchain } from "../../../savjeecoin/src/blockchain";
import EC from "elliptic"; // Elliptic library for cryptographic operations

/**
 * Class representing th blockchain service which encapsulates
 * blockchain operations and provides methods to interact with it.
 */
class BlockchainService {
  constructor() {
    this.blockchainInstance = new Blockchain();
    this.walletKeys = []; // Array to hold multiple wallet key pairs.
    this.blockchainInstance.difficulty = 1; // Set mining difficulty level to low
    this.generateWalletKeys();
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    ); // Mine initial pending transactions
  }

  /**
   * Get the balance of a specific address.
   * @param {string} address - The wallet address.
   * @returns {number} The balance of the given address.
   */
  getBalanceOfAddress(address) {
    return this.blockchainInstance.getBalanceOfAddress(address);
  }

  /**
   * Get the current state of the blockchain (all blocks).
   * @returns {Array} The array of blocks in the blockchain.
   */
  getBlocks() {
    return this.blockchainInstance.chain;
  }

  /**
   * Get the list of pending transactions.
   * @returns {Array} The array of pending transactions.
   */
  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  /**
   * Mine the pending transactions and reward the miner.
   */
  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  /**
   * Add a new transaction to the blockchain.
   * @param {Object} tx - The transaction object.
   */
  addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx);
  }

  /**
   * Check if the address is from the current user.
   *
   * @param {string} address - The wallet address.
   * @returns
   */
  addressIsFromCurrentUser(address) {
    return address === this.walletKeys[0].publicKey;
  }

  /**
   * Generate a new key pair for the wallet and store it.
   */
  generateWalletKeys() {
    const ec = new EC.ec("secp256k1"); // Instance of elliptic curve
    const key = ec.genKeyPair(); // Generate new public and private key pair

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic("hex"),
      privateKey: key.getPrivate("hex"),
    });
  }
}

const blockchainService = new BlockchainService();
export default blockchainService;
