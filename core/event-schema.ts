export interface UEAPEvent {
  actor: string;
  action: string;
  object: string;
  location: string;
  timestamp: string | number;
  evidence: string;
}

export interface UEAPAttestation {
  eventHash: string;
  issuer: string;
  proof: string;
  timestamp: number;
  signature?: string;
}
