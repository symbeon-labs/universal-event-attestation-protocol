# UEAP — Identity / Provenance A/B Experiment v0.1

**Status:** Experimental research artifact  
**Reference profile:** ueap-reference-json-v0.1

## Objective

Test whether provenance should be part of the event identity commitment or remain a separately committed layer.

The experiment uses semantically equivalent observations from two source domains: ERP and IoT.

## Model A — provenance-bound event identity

~~~~text
Domain source → UEAP event + provenance → canonical representation → event commitment
~~~~

The source/provenance fields participate directly in the committed event object.

**Expected property:** semantically equivalent events from different sources receive different commitments because their provenance differs.

## Model B — domain-independent event identity

~~~~text
Domain source → UEAP event ─────────→ event commitment
                 └ provenance ─────→ provenance commitment
~~~~

The event commitment is derived from the domain-independent UEAP event. Provenance is preserved through a separate commitment.

**Expected property:** semantically equivalent events can share an event commitment while retaining independently verifiable provenance commitments.

## Current reference result

| Property | Model A | Model B |
|---|---:|---:|
| Semantic canonical equality | YES | YES |
| Event commitment equality | NO | YES |
| Provenance preserved | YES | YES |
| Cross-source event interoperability | Reduced | Preserved |
| Provenance independently addressable | YES | YES |

The implementation encodes these expectations as executable assertions in tests/identity-provenance-ab.test.ts.

**Important:** this is an experimental observation about the chosen reference profile. It is not a normative UEAP decision.

## Interpretation

The experiment makes the architectural trade-off explicit:

- binding provenance directly into event identity maximizes source specificity;
- separating provenance preserves a source-independent event identity while retaining provenance as cryptographically addressable information.

This supports continued investigation of a two-layer commitment model:

~~~~text
Event Commitment
       +
Provenance Commitment
       ↓
Attestation
~~~~

It does not establish that this model is novel, superior, patentable, or required by UEAP.

## Next experiment

Extend the model to two independent sources attesting the same event, conflicting evidence, provenance tampering, event tampering, combined-attestation verification, and composition into an operational verified state.

The results should remain experimental until incorporated into a reviewed protocol profile.