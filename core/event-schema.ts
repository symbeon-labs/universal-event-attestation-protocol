export interface UEAPEvent {
  version: string;
  profile: string;
  actor: string;
  action: string;
  object: string;
  location?: string;
  timestamp: string | number;
  evidence: string;
}

export interface UEAPAttestation {
  version: string;
  profile: string;
  eventCommitment: string;
  evidenceCommitment?: string;
  provenanceCommitment?: string;
  issuer: string;
  proof: { type: string; value: string };
  issuedAt: number;
  metadata?: Record<string, unknown>;
}

export type UEAPVerificationStatus = "VERIFIED" | "REJECTED" | "INDETERMINATE";

export interface UEAPVerificationResult {
  status: UEAPVerificationStatus;
  attestationValid: boolean;
  proofValid: boolean;
  commitmentValid: boolean;
  issuerStatus: "KNOWN" | "UNKNOWN" | "UNSPECIFIED";
  profile: string;
  verificationTimestamp: number;
  reason?: string;
}
