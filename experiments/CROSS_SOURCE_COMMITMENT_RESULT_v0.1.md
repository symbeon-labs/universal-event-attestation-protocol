# Cross-Source Commitment Experiment — v0.1

## Objective

Test whether semantically equivalent observations from an ERP and an IoT source can be transformed into the same UEAP event and therefore the same commitment under the experimental reference profile.

## Inputs

### ERP

- transactionId: ERP-1001
- actorId: device-42
- operation: temperature.read
- objectId: warehouse-A
- occurredAt: 1720000000
- evidence: {"unit":"C","value":"42.5"}
- location: BR

### IoT

- deviceId: device-42
- measurement: temperature.read
- targetId: warehouse-A
- observedAt: 1720000000
- value: 42.5
- unit: C
- location: BR

## Adapter output

Both adapters produce the same UEAP event fields:

`version=0.2`  
`profile=ueap-reference-json-v0.1`  
`actor=device-42`  
`action=temperature.read`  
`object=warehouse-A`  
`location=BR`  
`timestamp=1720000000`  
`evidence={"unit":"C","value":"42.5"}`

## Canonical representation

The deterministic canonicalizer sorts keys and produces the same representation for both adapter outputs:

`{"action":"temperature.read","actor":"device-42","evidence":"{\"unit\":\"C\",\"value\":\"42.5\"}","location":"BR","object":"warehouse-A","profile":"ueap-reference-json-v0.1","timestamp":1720000000,"version":"0.2"}`

Therefore:

**canonicalRepresentationEqual = true**

Because the commitment function hashes exactly this canonical UTF-8 representation, both sources also produce the same commitment:

**commitmentEqual = true**

## Result

**CROSS_SOURCE_IDENTITY_PRESERVED**

The experiment demonstrates that source-specific representations can converge on one event identity under the current reference profile.

## Critical limitation

This result does **not** prove that the ERP record and IoT reading came from the same real-world source, nor does it preserve their provenance inside the event commitment.

In fact, the experiment intentionally excludes:

- ERP transactionId;
- source-system identity;
- transport metadata;
- adapter identity.

Therefore the result establishes only:

**semantic convergence → canonical convergence → commitment convergence**

It does not establish:

**provenance convergence**.

## Research consequence

This gives us the exact separation needed for the next experiment:

### Model A
`event identity = semantic event + source/provenance`

### Model B
`event identity = semantic event`  
`provenance = separate commitment/metadata`

The current experiment supports testing Model B without prematurely making it normative.

## Status

Experimental evidence for the reference profile. Not a normative UEAP requirement and not a novelty claim.
