# UEAP Adapter Conformance v0.2

An adapter translates a source-specific observation into a UEAP event.

## Adapter contract

A conforming adapter MUST:

1. declare a stable adapter identifier and version;
2. map source data into the declared UEAP profile;
3. preserve the semantic fields required by that profile;
4. preserve timestamp meaning and precision;
5. avoid leaking source-specific fields into the core event unless declared by the profile;
6. expose source/provenance information separately when the profile requires it;
7. produce deterministic output for equivalent source observations.

## Reference adapters

- `ERPAdapter` — ERP transaction record.
- `IoTAdapter` — IoT sensor reading.

Both target `ueap-reference-json-v0.1`.

## Cross-source experiment

Equivalent observations use:

- actor: `device-42`
- action: `temperature.read`
- object: `warehouse-A`
- location: `BR`
- timestamp: `1720000000`
- evidence: `42.5 C`

Expected result:

`ERP canonical representation == IoT canonical representation`

and therefore:

`ERP commitment == IoT commitment`

This is evidence about the experimental reference profile only. It is not a claim that UEAP has solved provenance binding or that this profile is normative.

The ERP `transactionId` and source-specific transport metadata are deliberately excluded from event identity for this experiment. Their placement remains a separate research question.
