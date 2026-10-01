import { describe, expect, it } from "vitest";
import { UEAP } from "../sdk";

describe("UEAP reference attestation", () => {
  it("creates an explicit attestation envelope", () => {
    const event = UEAP.createEvent({
      actor: "sensor-01",
      action: "temperature.read",
      object: "room-A",
      evidence: "42.5"
    });

    const attestation = UEAP.createAttestation(
      event,
      "issuer-01",
      "experimental",
      "proof-placeholder"
    );

    expect(attestation.version).toBe("0.2");
    expect(attestation.profile).toBe("ueap-reference-json-v0.1");
    expect(attestation.eventCommitment).toMatch(/^0x[0-9a-f]{64}$/);
  });

  it("returns INDETERMINATE instead of falsely claiming verification", () => {
    const event = UEAP.createEvent({
      actor: "sensor-01",
      action: "temperature.read",
      object: "room-A",
      evidence: "42.5"
    });

    const attestation = UEAP.createAttestation(event, "issuer-01", "experimental", "placeholder");
    const result = UEAP.verifyLocal(attestation);

    expect(result.status).toBe("INDETERMINATE");
    expect(result.proofValid).toBe(false);
  });
});
