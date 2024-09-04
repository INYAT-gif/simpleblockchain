import "./BlockView.css";
import PropTypes from "prop-types";

/**
 * Renders a card displaying information about a single block in the blockchain.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.block - The block data object.
 * @param {function} props.onClick - Function to handle the click event on the block.
 * @param {boolean} props.isSelected - Indicates if the block is currently selected.
 * @returns {JSX.Element} The rendered block view card.
 */
const BlockView = ({ block, onClick, isSelected }) => {
  const isGenesisBlock = block.previousHash === "0"; // Check if the block is the gensis block.

  return (
    <div className={`card ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <div className="card-body">
        <h5 className="card-title">
          Block {block.index}
          {isGenesisBlock && (
            <small className="text-muted">(Genesis block)</small>
          )}
        </h5>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span>Hash</span>
          <br />
          <div
            className="text-truncate"
            style={{ color: `#${block.hash.substring(0, 6)}` }}
          >
            <small>{block.hash}</small>
          </div>
          <br />
          <span>Hash of previous block</span>
          <br />
          <div
            className="text-truncate"
            style={{ color: `#${block.previousHash.substring(0, 6)}` }}
          >
            <small>{block.previousHash}</small>
          </div>
        </li>

        <li className="list-group-item">
          <span>Nonce</span>
          <br />
          <div className="text-truncate text-muted">
            <small>{block.nonce}</small>
          </div>
        </li>

        <li className="list-group-item">
          <span>Timestamp</span>
          <br />
          <div className="text-truncate text-muted">
            <small>{block.timestamp}</small>
          </div>
        </li>
      </ul>
    </div>
  );
};

BlockView.propTypes = {
  block: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default BlockView;
