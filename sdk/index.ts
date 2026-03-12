import { hashEvent } from "../core/event-hash";
import { UEAPEvent, UEAPAttestation } from "../core/event-schema";

/**
 * @title UEAP SDK
 * @notice Simplified interface for interacting with the Universal Event Attestation Protocol.
 */
export class UEAP {
  /**
   * Creates a standardized UEAP event.
   */
  static createEvent(data: Omit<UEAPEvent, "timestamp">): UEAPEvent {
    return {
      ...data,
      timestamp: Math.floor(Date.now() / 1000)
    };
  }

  /**
   * Generates a local attestation object (mocking proof generation).
   */
  static async generateAttestation(event: UEAPEvent, issuer: string, proof: string): Promise<UEAPAttestation> {
    return {
      eventHash: hashEvent(event),
      issuer,
      proof,
      timestamp: Math.floor(Date.now() / 1000)
    };
  }

  /**
   * Verifies an attestation structure locally.
   */
  static verifyLocal(attestation: UEAPAttestation): boolean {
    return !!(attestation.eventHash && attestation.issuer && attestation.proof);
  }
}
