# UEAP Verification Model v0.2

Verification evaluates an attestation against its declared profile.

Suggested result states:

- VERIFIED
- REJECTED
- INDETERMINATE

A result SHOULD expose:

- attestation validity;
- proof validity;
- commitment validity;
- issuer status;
- profile;
- verification timestamp;
- reason.

VERIFIED means the declared cryptographic and policy checks passed. It MUST NOT be interpreted as an unconditional statement that the real-world event occurred.
