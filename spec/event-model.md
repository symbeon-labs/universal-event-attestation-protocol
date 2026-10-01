# UEAP Event Model v0.2

The core event model is intentionally minimal.

Fields:

- actor
- action
- object
- location (optional)
- timestamp
- evidence
- profile

Implementations MAY extend the model, but extensions MUST be versioned and declared by profile.

The core model does not define the semantics of actor, action or object for a particular domain.
