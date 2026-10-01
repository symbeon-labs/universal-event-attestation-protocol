<div align="center">
<img src="./assets/banner_sovereign.png" width="100%" alt="UEAP Sovereign Banner">

# Universal Event Attestation Protocol (UEAP)

**An experimental open protocol model for turning observations and evidence into cryptographically verifiable attestations**

---

[![Status](https://img.shields.io/badge/Status-Experimental%20Specification-888888?style=for-the-badge)](./spec/UEAP_SPEC_v0.2.md)

</div>

## Overview

UEAP defines a domain-agnostic model for transforming observations and evidence into cryptographically verifiable attestations.

The protocol separates **what was observed**, **how the observation is represented**, **what is cryptographically committed**, and **how the resulting attestation is verified**.

**Core pipeline:**

`Reality → Observation → Evidence → Canonical Representation → Commitment → Proof → Attestation → Registry → Verification → Verified State`

> **Evidence before intervention.**

UEAP does not define the semantics of a particular domain. ERP systems, IoT devices, telemetry platforms, operational software, and other sources can be translated through adapters into a common UEAP representation.

## Architecture

```text
Source Systems
     │
     ├── ERP
     ├── IoT
     ├── Telemetry
     └── Other Observers
     │
     ▼
┌─────────────────────┐
│   Source Adapter    │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│     UEAP Event      │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│    Canonicalization │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│     Commitment      │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│     Attestation     │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ Verification /      │
│ Verified State      │
└─────────────────────┘
```

The current repository includes experimental ERP and IoT adapters demonstrating cross-source convergence into the same UEAP event representation.

## Cross-source experiment

A reference experiment maps semantically equivalent ERP and IoT observations to the same canonical UEAP representation.

```text
ERP ──┐
      ├──→ UEAP Event ──→ Canonical Representation ──→ Commitment
IoT ──┘
```

Under the current experimental reference profile:

- equivalent observations produce the same UEAP event;
- their canonical representations are identical;
- their commitments are identical.

This demonstrates **cross-source semantic convergence** under the reference profile.

It does **not** establish that the underlying observations share the same physical origin, nor does it solve provenance binding.

See [Adapter Conformance](./spec/adapter-conformance.md) and [Cross-Source Commitment Experiment](./experiments/CROSS_SOURCE_COMMITMENT_RESULT_v0.1.md).

## Core concepts

### Observation

A representation produced from an occurrence by a sensor, system, observer, or process.

### Evidence

Information supporting an observation. Evidence may be raw, transformed, referenced, or cryptographically committed.

### Canonical Representation

A deterministic representation used as the input to a cryptographic commitment.

### Commitment

A cryptographic binding to a canonical representation. The algorithm and encoding rules must be explicitly declared by the profile.

### Attestation

A structured claim binding an event representation, issuer/provenance information, proof material, and relevant metadata.

### Verification

A deterministic procedure that evaluates an attestation against its declared cryptographic and policy requirements.

### Verified State

A machine-readable result of verification. It describes what checks passed under the declared profile and policy; it is not an unconditional statement that the real-world event occurred.

## Adapter layer

Adapters translate source-specific observations into the UEAP event model.

Current reference adapters:

- **ERP Adapter** — operational transaction records.
- **IoT Adapter** — sensor observations.

Adapter conformance requires deterministic mapping, declared versions, preservation of semantic meaning, and explicit treatment of source/provenance information.

See [Adapter Conformance](./spec/adapter-conformance.md).

## Specification

- [UEAP Specification v0.2](./spec/UEAP_SPEC_v0.2.md)
- [Event Model](./spec/event-model.md)
- [Attestation Model](./spec/attestation-model.md)
- [Verification Model](./spec/verification-model.md)
- [Adapter Conformance](./spec/adapter-conformance.md)
- [Domain → Attestation Boundary](./spec/domain-attestation-boundary.md)
- [Conformance](./spec/conformance.md)
- [Terminology](./spec/terminology.md)
- [Implementation Status](./spec/implementation-status.md)

## Repository structure

```text
spec/           Protocol models and conformance rules
core/           Reference event and commitment implementation
adapters/       Source-to-UEAP adapters
sdk/            Reference SDK interface
contracts/      Experimental registry and verification contracts
proofs/         Domain-specific proof experiments
protocols/      Domain extensions
experiments/    Research experiments and recorded results
tests/          Reference conformance tests
```

## Domain extensions

GreenProof, GuardTag, ESG circuits, oracle integrations, and other application-specific components are examples or extensions.

They are **not part of the UEAP core** unless explicitly incorporated into a future specification.

## Research boundary

The following remain active research questions:

- event identity versus provenance;
- single versus separate commitments for event identity and provenance;
- canonicalization profiles;
- proof-system profiles;
- registry interoperability;
- issuer status and revocation across profiles;
- composition of attestations from multiple sources.

These questions are being evaluated experimentally rather than presented as settled protocol requirements.

## Security boundary

UEAP cryptography verifies declared cryptographic relationships.

It does **not** independently establish:

- physical truth;
- sensor accuracy;
- issuer honesty;
- semantic correctness;
- absence of compromised infrastructure;
- correctness of an external domain process.

## Status

**v0.2 — Experimental Specification**

This repository is an evolving research and reference implementation. The current specification does not claim protocol stability, production readiness, novelty, or patentability.

**Evidence before intervention.**