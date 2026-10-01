import { hashEvent } from "../core/event-hash";
import { UEAPEvent, UEAPAttestation, UEAPVerificationResult } from "../core/event-schema";
import { normalizeTimestamp } from "../core/canonicalize";

export class UEAP {
  static createEvent(data: Omit<UEAPEvent, "timestamp"> & { timestamp?: string | number }): UEAPEvent {
    return {
      ...data,
      version: data.version ?? "0.2",
      profile: data.profile ?? "ueap-reference-json-v0.1",
      timestamp: data.timestamp ?? Math.floor(Date.now() / 1000)
    };
  }

  static createAttestation(
    event: UEAPEvent,
    issuer: string,
    proofType: string,
    proofValue: string,
    metadata?: Record<string, unknown>
  ): UEAPAttestation {
    return {
      version: event.version,
      profile: event.profile,
      eventCommitment: hashEvent(event),
      issuer,
      proof: { type: proofType, value: proofValue },
      issuedAt: Math.floor(Date.now() / 1000),
      metadata
    };
  }

  static verifyLocal(attestation: UEAPAttestation): UEAPVerificationResult {
    const valid =
      !!attestation.version &&
      !!attestation.profile &&
      /^0x[0-9a-fA-F]{64}$/.test(attestation.eventCommitment) &&
      !!attestation.issuer &&
      !!attestation.proof?.type &&
      !!attestation.proof?.value &&
      Number.isSafeInteger(attestation.issuedAt);

    return {
      status: valid ? "INDETERMINATE" : "REJECTED",
      attestationValid: valid,
      proofValid: false,
      commitmentValid: valid,
      issuerStatus: "UNSPECIFIED",
      profile: attestation.profile || "unknown",
      verificationTimestamp: Math.floor(Date.now() / 1000),
      reason: valid
        ? "Structural checks passed; cryptographic proof verification is not implemented by the reference SDK."
        : "Attestation structure is invalid."
    };
  }

  static normalizeTimestamp(timestamp: string | number): number {
    return normalizeTimestamp(timestamp);
  }
}
