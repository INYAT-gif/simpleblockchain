import { useBlockchain } from "../../context/BlockchainContext";

/**
 * Settings component allows users to adjust blockchain difficulty
 * and mining reward settings.
 *
 * @component
 * @returns {JSX.Element} The rendered component for settings form.
 */
const Settings = () => {
  const blockchainService = useBlockchain();

  /**
   * Handles the change of the mining difficulty input.
   *
   * @param {Object} event - The event object from the input change.
   */
  const handleDifficultyChange = (event) => {
    blockchainService.blockchainInstance.difficulty = parseInt(
      event.target.value,
      10
    );
  };

  /**
   * Handles the change of the mining reward input.
   *
   * @param {Object} event - The event object from the input change.
   */
  const handleMiningRewardChange = (event) => {
    blockchainService.blockchainInstance.miningReward = parseInt(
      event.target.value,
      10
    );
  };

  return (
    <div className="container mt-4">
      <h1>Settings</h1>
      <p>
        Control how the blockchain behaves when new transactions or blocks are
        created. Changes are automatically saved.
      </p>

      <div className="form-group mt-4">
        <label>Difficulty</label>
        <input
          type="number"
          className="form-control"
          value={blockchainService.difficulty}
          onChange={handleDifficultyChange}
        />

        <small className="form-text text-muted">
          Difficulty controls how long the mining process takes. Higher numbers
          will make mining a lot slower!
          <br />
          Default: 1
        </small>
      </div>

      <div className="form-group mt-4">
        <label>Mining reward</label>
        <input
          type="number"
          className="form-control"
          value={blockchainService.miningReward}
          onChange={handleMiningRewardChange}
        />

        <small className="form-text text-muted">
          How much coins a miner receives for successfully creating a new block
          for the chain.
          <br />
          Default: 100
        </small>
      </div>
    </div>
  );
};

export default Settings;
