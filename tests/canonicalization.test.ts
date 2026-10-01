import { describe, expect, it } from "vitest";
import { canonicalizeEvent } from "../core/canonicalize";
import { hashEvent } from "../core/event-hash";
import { UEAPEvent } from "../core/event-schema";

const event: UEAPEvent = {
  version: "0.2",
  profile: "ueap-reference-json-v0.1",
  actor: "sensor-01",
  action: "temperature.read",
  object: "room-A",
  location: "BR",
  timestamp: 1720000000,
  evidence: "42.5"
};

describe("UEAP reference canonicalization", () => {
  it("is deterministic", () => {
    expect(canonicalizeEvent(event)).toBe(canonicalizeEvent({ ...event }));
  });

  it("produces a stable ordered representation", () => {
    expect(canonicalizeEvent(event)).toBe(
      '{"action":"temperature.read","actor":"sensor-01","evidence":"42.5","location":"BR","object":"room-A","profile":"ueap-reference-json-v0.1","timestamp":1720000000,"version":"0.2"}'
    );
  });

  it("produces a deterministic commitment", () => {
    expect(hashEvent(event)).toBe(hashEvent({ ...event }));
  });

  it("rejects invalid timestamps", () => {
    expect(() => canonicalizeEvent({ ...event, timestamp: "not-a-date" })).toThrow();
  });

  it("detects semantic tampering", () => {
    expect(hashEvent(event)).not.toBe(hashEvent({ ...event, evidence: "43.5" }));
  });
});
