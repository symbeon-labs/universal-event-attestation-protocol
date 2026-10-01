# UEAP Domain → Attestation Boundary — Experimental Model

**Status:** Experimental architecture model

This document translates the current research hypothesis into an executable reference boundary. It does not establish a normative UEAP requirement.

## Boundary

~~~~text
Domain System
     ↓
Domain Representation
     ↓
Boundary Adapter
     ↓
Deterministic UEAP Representation
     ↓
Evidence Binding / Commitment
     ↓
Proof
     ↓
Attestation
     ↓
Independent Verification
     ↓
Verified State
~~~~

## Responsibility split

| Layer | Responsibility |
|---|---|
| Domain system | Produce a domain-specific observation or operational record |
| Boundary adapter | Map source semantics into the declared UEAP profile |
| UEAP representation | Provide a domain-independent event representation |
| Evidence binding | Bind declared evidence to the representation |
| Commitment | Produce a cryptographic commitment under the profile |
| Proof | Supply declared proof material |
| Attestation | Package commitments, issuer, proof, provenance and metadata |
| Verification | Evaluate cryptographic and policy requirements |
| Verified State | Expose a machine-readable verification result |

## Key invariant under investigation

Two heterogeneous sources may produce the same UEAP event commitment when their observations are semantically equivalent under the same profile, while provenance remains separately addressable.

This invariant is demonstrated experimentally by the ERP and IoT reference adapters.

## Non-goals

The boundary does not claim to:

- establish physical truth;
- establish source honesty;
- eliminate semantic ambiguity;
- replace domain-specific verification;
- define ORC resolution;
- define VAE decision or execution.

## Relation to ORC and VAE

UEAP ends at verification and verified state.

~~~~text
UEAP → Verified State → ORC → VAE
~~~~

ORC and VAE therefore remain downstream consumers rather than components of the UEAP core.

## Research status

The boundary is the subject of ongoing prior-art and interoperability research. Its individual components are widely represented in existing systems; the open question concerns the technical composition and interface between heterogeneous domain representations and a generic attestation/verification layer.

Any future normative requirement must be supported by conformance tests and reviewed against the prior-art matrix.