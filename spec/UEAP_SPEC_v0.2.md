# Universal Event Attestation Protocol (UEAP) — Specification v0.2

**Status:** Experimental Specification  
**Scope:** Core protocol model  
**Normative language:** MUST, SHOULD, MAY are used in their conventional specification sense.

## 1. Purpose

UEAP defines a domain-agnostic model for transforming observations and evidence into cryptographically verifiable attestations.

UEAP does not define what constitutes truth in a domain. It defines how a claim about an observed event can be represented, committed, proved, attested, registered, and independently verified.

## 2. Core Pipeline

Reality → Observation → Evidence → Canonical Representation → Commitment → Proof → Attestation → Registry → Verification → Verified State

## 3. Core Objects

### Observation
A representation produced from an occurrence by an observer, sensor, system, or process.

### Evidence
Information supporting an observation. Evidence MAY be raw, transformed, referenced, or cryptographically committed.

### Canonical Representation
A deterministic representation of the attested event used as the input to a cryptographic commitment.

### Commitment
A cryptographic binding to a canonical representation. The primitive and encoding MUST be explicitly identified.

### Proof
Cryptographic material allowing a verifier to establish a stated property of the commitment, evidence, issuer, or event.

### Attestation
A structured claim that binds an event representation, issuer/provenance information, proof material, and relevant metadata.

### Registry
An optional persistence layer for attestations. Recording an attestation MUST NOT be interpreted as independently establishing the truth of the underlying event.

### Verification
A deterministic procedure that evaluates whether an attestation satisfies its declared cryptographic and policy requirements.

### Verified State
A machine-readable result produced by verification. It describes the verification result and policy context; it is not, by itself, a universal claim that the underlying real-world event is true.

## 4. Domain Independence

The UEAP core MUST remain independent of domain-specific semantics.

Domain adapters MAY transform source-specific observations into UEAP representations.

## 5. Provenance

Provenance identifies relevant origin and transformation context.

The protocol MUST distinguish event identity, evidence, and provenance.

Implementations MAY bind these elements in one commitment or use separate commitments. The choice MUST be declared by the attestation profile.

## 6. Cryptographic Agility

UEAP MUST identify the cryptographic algorithms and encoding rules used by an implementation.

The core specification does not mandate a universal primitive unless explicitly made normative by a future version.

## 7. Verification

A verifier SHOULD return structured results containing attestation validity, proof validity, commitment validity, issuer/provenance status, policy/profile identifier, verification timestamp, and a failure reason when applicable.

## 8. Conformance

A conforming implementation MUST:

1. produce a deterministic canonical representation;
2. identify its commitment scheme;
3. identify its proof mechanism;
4. expose the attestation structure;
5. provide an independent verification procedure;
6. declare domain-specific extensions separately from the core.

## 9. Security Boundary

UEAP cryptography verifies cryptographic relationships. It does not independently establish physical truth, sensor accuracy, issuer honesty, semantic correctness, or absence of compromised infrastructure.

## 10. Versioning

Breaking changes to the protocol core require a major version change. Experimental extensions SHOULD be versioned independently.

## 11. Status

v0.2 is an experimental specification. It is not a claim of protocol stability, production readiness, novelty, or patentability.
