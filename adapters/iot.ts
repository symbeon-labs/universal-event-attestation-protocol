import { UEAPEvent } from "../core/event-schema";
import { SourceAdapter } from "./types";

export interface IoTReading {
  deviceId: string;
  measurement: string;
  targetId: string;
  observedAt: string | number;
  value: string;
  unit: string;
  location?: string;
}

export class IoTAdapter implements SourceAdapter<IoTReading> {
  readonly id = "iot";
  readonly version = "0.1";

  toUEAPEvent(source: IoTReading): UEAPEvent {
    return {
      version: "0.2",
      profile: "ueap-reference-json-v0.1",
      actor: source.deviceId,
      action: source.measurement,
      object: source.targetId,
      location: source.location,
      timestamp: source.observedAt,
      evidence: JSON.stringify({ unit: source.unit, value: source.value })
    };
  }
}
