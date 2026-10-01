import { describe, expect, it } from "vitest";
import { runIdentityProvenanceExperiment } from "../experiments/identity-provenance-ab";

describe("UEAP identity/provenance A/B experiment", () => {
  it("preserves semantic convergence while separating provenance", () => {
    const result = runIdentityProvenanceExperiment();

    expect(result.semanticCanonicalEquality).toBe(true);
    expect(result.modelAEventCommitmentEquality).toBe(false);
    expect(result.modelBEventCommitmentEquality).toBe(true);
    expect(result.provenancePreserved).toBe(true);
  });
});
