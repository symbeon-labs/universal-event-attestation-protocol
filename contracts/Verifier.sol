// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ExperimentalVerifierStub
 * @notice NON-PRODUCTION reference stub for the GreenProof ESG experiment.
 * @dev This contract DOES NOT perform Groth16 pairing verification.
 *      It only checks that the supplied public input equals 1.
 *
 * This file is not a UEAP normative verifier and MUST NOT be treated as
 * cryptographic proof verification in production.
 */
contract Verifier {
    /**
     * @notice Experimental placeholder for a Groth16 verification interface.
     * @return true only when input[0] == 1.
     *
     * WARNING: proof parameters a, b and c are intentionally unused.
     * A production verifier must perform the actual BN254 pairing checks.
     */
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) public pure returns (bool) {
        a; b; c;
        return input[0] == 1;
    }
}
