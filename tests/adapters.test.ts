import { describe, expect, it } from "vitest";
import { ERPAdapter } from "../adapters/erp";
import { IoTAdapter } from "../adapters/iot";
import { hashEvent } from "../core/event-hash";
import { canonicalizeEvent } from "../core/canonicalize";

describe("UEAP cross-source adapter experiment", () => {
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

  it("maps both sources into the same UEAP event", () => {
    expect(erpEvent).toEqual(iotEvent);
  });

  it("produces identical canonical representations", () => {
    expect(canonicalizeEvent(erpEvent)).toBe(canonicalizeEvent(iotEvent));
  });

  it("produces the same commitment", () => {
    expect(hashEvent(erpEvent)).toBe(hashEvent(iotEvent));
  });
});
