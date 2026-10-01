import { hashEvent } from "../core/event-hash";
import { canonicalizeEvent } from "../core/canonicalize";
import { ERPAdapter } from "../adapters/erp";
import { IoTAdapter } from "../adapters/iot";

const erpEvent = new ERPAdapter().toUEAPEvent({
  transactionId: "ERP-1001",
  actorId: "device-42",
  operation: "temperature.read",
  objectId: "warehouse-A",
  occurredAt: 1720000000,
  evidence: JSON.stringify({ unit: "C", value: "42.5" }),
  location: "BR"
});

const iotEvent = new IoTAdapter().toUEAPEvent({
  deviceId: "device-42",
  measurement: "temperature.read",
  targetId: "warehouse-A",
  observedAt: 1720000000,
  value: "42.5",
  unit: "C",
  location: "BR"
});

export const experiment = {
  canonicalRepresentationEqual: canonicalizeEvent(erpEvent) === canonicalizeEvent(iotEvent),
  commitmentEqual: hashEvent(erpEvent) === hashEvent(iotEvent),
  erpCommitment: hashEvent(erpEvent),
  iotCommitment: hashEvent(iotEvent)
};
