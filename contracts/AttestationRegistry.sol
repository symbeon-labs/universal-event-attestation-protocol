// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title AttestationRegistry
 * @notice A generic registry for cryptographically verifiable event attestations.
 * @dev Part of the Universal Event Attestation Protocol (UEAP).
 */
contract AttestationRegistry is AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Attestation {
        bytes32 eventHash;
        address issuer;
        bytes proof;
        uint256 timestamp;
        bool revoked;
    }

    /// @notice Mapping from attestation ID to Attestation data
    mapping(bytes32 => Attestation) public attestations;

    event AttestationRegistered(bytes32 indexed attestationId, bytes32 indexed eventHash, address indexed issuer);
    event AttestationRevoked(bytes32 indexed attestationId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    /**
     * @notice Registers a new event attestation.
     * @param eventHash The hash of the event schema.
     * @param proof The cryptographic proof (ZK or Signature).
     */
    function attest(bytes32 eventHash, bytes calldata proof) external onlyRole(ISSUER_ROLE) whenNotPaused nonReentrant returns (bytes32) {
        bytes32 attestationId = keccak256(abi.encodePacked(eventHash, msg.sender, block.timestamp));
        
        require(attestations[attestationId].timestamp == 0, "UEAP: Attestation already exists");

        attestations[attestationId] = Attestation({
            eventHash: eventHash,
            issuer: msg.sender,
            proof: proof,
            timestamp: block.timestamp,
            revoked: false
        });

        emit AttestationRegistered(attestationId, eventHash, msg.sender);
        return attestationId;
    }

    /**
     * @notice Verifies if an attestation is valid and not revoked.
     * @param attestationId The ID of the attestation.
     */
    function verify(bytes32 attestationId) external view returns (bool) {
        Attestation memory a = attestations[attestationId];
        return (a.timestamp > 0 && !a.revoked);
    }

    /**
     * @notice Revokes an attestation.
     * @param attestationId The ID to revoke.
     */
    function revoke(bytes32 attestationId) external onlyRole(ISSUER_ROLE) {
        require(attestations[attestationId].issuer == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "UEAP: Unauthorized");
        attestations[attestationId].revoked = true;
        emit AttestationRevoked(attestationId);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) { _pause(); }
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) { _unpause(); }
}
