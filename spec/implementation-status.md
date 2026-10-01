# UEAP v0.2 — Implementation Status Audit

**Audit basis:** UEAP Specification v0.2  
**Status:** Experimental / engineering audit  
**Purpose:** distinguish normative protocol concepts from current reference code, stubs, and domain extensions.

## 1. Classification

| Component | Classification | Alignment | Action |
|---|---|---|---|
| `spec/UEAP_SPEC_v0.2.md` | Normative specification | Core model established | Maintain as protocol boundary |
| `spec/event-model.md` | Normative model | Partial | Align TypeScript schema with profile/version concepts |
| `spec/attestation-model.md` | Normative model | Partial | Align SDK object with commitment/proof/profile vocabulary |
| `spec/verification-model.md` | Normative model | Partial | Replace boolean-only local verification with structured result |
| `spec/conformance.md` | Normative guidance | Partial | Convert requirements into executable tests |
| `core/event-schema.ts` | Reference implementation | Partial | Refactor around profile/version and explicit commitment semantics |
| `core/event-hash.ts` | Reference implementation | Not yet conformant | Introduce explicit canonicalization before commitment |
| `sdk/index.ts` | Reference implementation | Not yet conformant | Remove implicit/mock proof semantics from the core API |
| `contracts/AttestationRegistry.sol` | Reference registry | Partial | Separate registry validity from cryptographic proof validity |
| `contracts/Verifier.sol` | Stub | Not conformant as a verifier | Keep clearly marked non-production |
| `proofs/zk/circom/ESGScore.circom` | Domain extension | Outside core | Keep under application/extension boundary |
| `protocols/guardtag/spec.md` | Domain extension | Outside core | Keep as extension; do not make normative |
| GreenProof / Chainlink integrations | Domain/reference experiments | Outside core | Keep separate from UEAP requirements |

## 2. Blocking inconsistencies

### A. Canonical representation is specified but not implemented

The v0.2 specification requires a deterministic canonical representation before commitment. The current implementation hashes ABI-encoded fields directly.

**Required direction:** introduce an explicit canonicalization layer whose output can be inspected, tested, versioned, and then committed.

### B. Event model is narrower than the v0.2 model

The current TypeScript event contains source fields but does not explicitly carry a profile/version. It also does not distinguish event identity, evidence, and provenance as separate protocol concepts.

**Required direction:** add profile/version support while keeping the unresolved event-identity/provenance commitment decision configurable rather than hard-coded.

### C. SDK currently mocks proof generation

`generateAttestation()` accepts a caller-supplied proof and returns an object without cryptographic proof generation or verification.

**Required direction:** make its reference nature explicit and provide a structured verification result instead of a boolean field check.

### D. Registry verification is registry-state verification

`AttestationRegistry.verify()` currently checks existence and revocation. It does not verify the proof bytes or commitment semantics.

**Required direction:** preserve this distinction: registry state is one input to UEAP verification, not the complete verification procedure.

### E. The Solidity verifier is a stub

The previous contract description presented it as a Groth16 verifier while only checking `input[0] == 1`.

**Current action:** explicitly label it as an experimental, non-production stub.

## 3. Non-blocking research decisions

The following remain intentionally unresolved at v0.2:

- whether source/provenance belongs inside event identity;
- whether provenance uses a separate commitment;
- which canonicalization profile becomes normative;
- which proof systems become normative;
- how registries should interoperate;
- how revocation and issuer status are represented across profiles.

These questions should be resolved by experiments and conformance evidence rather than by prematurely changing the public protocol boundary.

## 4. Next engineering sequence

1. Implement a canonicalization module with deterministic test vectors.
2. Add profile/version to the reference event and attestation models.
3. Replace boolean `verifyLocal` with a structured verification result.
4. Add conformance tests for deterministic canonicalization, commitment determinism, tamper rejection, profile/version validation, provenance preservation, and revocation handling.
5. Refactor the registry interface so its role is explicitly persistence/revocation, not proof verification.
6. Only after those tests pass, evaluate alternative event/provenance commitment models in a separate research experiment.

## 5. Acceptance boundary

UEAP should not be described as "stable", "production-ready", "fully cryptographically verified", or "truth-establishing" while the items above remain open.

The v0.2 specification remains the source of truth for the protocol boundary; the implementation is an evolving reference and research artifact.
