import { UEAPEvent } from "../core/event-schema";
import { SourceAdapter } from "./types";

export interface ERPRecord {
  transactionId: string;
  actorId: string;
  operation: string;
  objectId: string;
  occurredAt: string | number;
  evidence: string;
  location?: string;
}

export class ERPAdapter implements SourceAdapter<ERPRecord> {
  readonly id = "erp";
  readonly version = "0.1";

  toUEAPEvent(source: ERPRecord): UEAPEvent {
    return {
      version: "0.2",
      profile: "ueap-reference-json-v0.1",
      actor: source.actorId,
      action: source.operation,
      object: source.objectId,
      location: source.location,
      timestamp: source.occurredAt,
      evidence: source.evidence
    };
  }
}
