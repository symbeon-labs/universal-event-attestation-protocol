# UEAP Attestation Model v0.2

A UEAP attestation SHOULD contain:

- version
- profile
- eventCommitment
- evidenceCommitment (optional)
- provenanceCommitment (optional)
- issuer
- proof type and value
- issuedAt
- metadata

These fields define a protocol model; profiles may require additional fields.

The relationship between event identity and provenance MUST be explicit.
