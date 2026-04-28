# GuardTag Protocol — Specification v0.1

**Status:** Draft (Public Review)
**Authors:** Symbeon Labs
**License:** Apache-2.0 (spec text)
**Last Updated:** 2026-04-27

---

## 0. Abstract

GuardTag Protocol (GTP) defines a **Physical Truth Layer (PTL)** for objects and events.
It binds **physical artifacts** (labels/tags) to **verifiable digital identities** using **AI-based perception (optical fingerprinting)** plus optional **RF (NFC/RFID)** signals, producing a **Trust Score** per read event.
The protocol standardizes identifiers, data schemas, validation flows, and interoperability.

---

## 1. Design Goals

* **G1 — Verifiable Physicality:** prove that a physical item is genuine, not just its data.
* **G2 — Multi-layer Security:** optical + optional RF + history.
* **G3 — Interoperability:** sector-agnostic, pluggable into existing QR/RFID stacks.
* **G4 — Auditability:** deterministic logs and explainable scoring.
* **G5 — Edge-first:** works on-device; cloud enhances confidence.
* **G6 — Privacy by design:** minimal PII; signed events; optional ZK extensions.

---

## 2. Terminology

* **Tag (Seal):** physical carrier with visual pattern and optional RF chip.
* **GTID:** GuardTag Identifier (unique, high-entropy).
* **OFP:** Optical Fingerprint vector extracted from tag imagery.
* **Read Event:** a capture + validation instance.
* **Trust Score:** 0–100 confidence of authenticity/consistency.
* **Issuer:** entity that mints GTIDs/tags.
* **Verifier:** device/service performing reads.
* **Event Store:** append-only log of Read Events.

---

## 3. Protocol Primitives

### 3.1 GTID (GuardTag Identifier)

* **Format:** Base32 (Crockford) string
* **Length:** 26 chars (130 bits effective entropy recommended)
* **Structure (logical):**

  ```
  [version(2b)][issuer(32b)][random(80-96b)]
  ```
* **Properties:** globally unique, non-sequential, non-guessable.

**Example:**

```
GTID: 0Z7F-4K2M-9Q1D-8J5S-3H6R-1N2T
```

---

### 3.2 OFP (Optical Fingerprint)

* **Type:** float vector (dim 256–1024)
* **Extraction:** versioned model `ofp_extractor:vX.Y`
* **Invariances (target):** rotation ±15°, scale ±20%, illumination shifts
* **Distance:** cosine similarity (default)

**Canonical constraints:**

* `||OFP||_2 = 1` (L2-normalized)
* `sim(a,b) ∈ [-1,1]`

---

### 3.3 RF Payload (Optional)

* **NFC (13.56 MHz)** and/or **UHF RFID (860–960 MHz)**
* **Content:** signed payload with `GTID` and optional metadata.
* **Consistency rule:** RF GTID MUST match visual GTID when both present.

---

### 3.4 Read Event (RE)

A signed record produced on each scan.

```json
{
  "gtid": "string",
  "ofp": {
    "model": "ofp_extractor:v0.1",
    "vector_hash": "blake3-256",
    "similarity_ref": 0.9821
  },
  "rf": {
    "present": true,
    "type": "NFC",
    "payload_hash": "blake3-256",
    "gtid_match": true
  },
  "device": {
    "id": "did:key:z6Mk...",
    "app": "guardscan/0.1",
    "sensor": "camera|nfc|rfid"
  },
  "env": {
    "ts": "2026-04-27T23:59:00Z",
    "geo": "optional",
    "illumination": "auto"
  },
  "tamper": {
    "void_detected": false,
    "microfracture": false
  },
  "score": {
    "value": 94.3,
    "components": {
      "optical": 0.97,
      "rf": 1.0,
      "history": 0.92,
      "tamper": 1.0
    },
    "thresholds": {
      "valid": 85,
      "review": 70
    }
  },
  "sig": "ed25519:..."
}
```

---

### 3.5 Trust Score

* **Range:** 0–100
* **Default composition:**

  ```
  S = 100 * (w_o * O + w_r * R + w_h * H + w_t * T)
  ```

  * `O` optical similarity ∈ [0,1]
  * `R` RF consistency ∈ [0,1]
  * `H` history consistency ∈ [0,1]
  * `T` tamper integrity ∈ [0,1]
* **Default weights (v0.1):**

  * `w_o=0.45, w_r=0.25, w_h=0.20, w_t=0.10`
* **Decision bands:**

  * `≥85`: VALID
  * `70–84`: REVIEW
  * `<70`: SUSPICIOUS

> Implementations MAY override weights per sector, but MUST disclose them in `score.thresholds`.

---

## 4. End-to-End Flow

1. **Mint**
   * Issuer generates `GTID`
   * Generates/prints tag (visual pattern + optional RF)
   * Stores reference OFP (or multiple captures) in registry

2. **Capture**
   * Verifier app captures image (and RF if present)
   * Preprocess (crop, normalize)

3. **Extract**
   * Compute OFP via `ofp_extractor`
   * Retrieve reference OFP(s) by `GTID`

4. **Match**
   * Compute similarity (cosine)
   * Run anomaly/tamper checks

5. **Score**
   * Compute Trust Score
   * Apply thresholds

6. **Record**
   * Emit signed Read Event to Event Store

---

## 5. Data Models

### 5.1 Registry (Reference)

```json
{
  "gtid": "string",
  "issuer": "string",
  "ofp_refs": [
    {"model": "ofp_extractor:v0.1", "vector_hash": "blake3-256"}
  ],
  "rf_profile": {"nfc": true, "rfid": false},
  "sector": "events|logistics|auto|pharma|luxury|industrial",
  "created_at": "ISO-8601"
}
```

### 5.2 Event Store

* Append-only
* Indexed by `gtid`, time, geo (optional)
* Supports vector index for OFP (ANN)

---

## 6. Security Considerations

* **Cloning Resistance:** optical micro-variations + OFP matching.
* **Replay Protection:** signed events + timestamps + device IDs.
* **RF Cloning Mitigation:** cross-check with optical layer.
* **Tamper Evidence:** VOID layers, microfracture signals.
* **Keys:** Ed25519 for event signing; rotation policies required.
* **Transport:** TLS 1.3+.

---

## 7. Privacy

* Avoid storing PII in events.
* Geo is OPTIONAL and SHOULD be coarse-grained.
* Support DID-based device identities.
* Future extension: ZK proofs for selective disclosure.

---

## 8. Interoperability

* **QR Compatibility:** GTID encoded as QR (URI scheme below).
* **URI Scheme:**

  ```
  guardtag://v1/{GTID}
  ```
* **RF Payload:** MUST include GTID and signature.
* **SDKs:** mobile/web/python reference implementations.

---

## 9. Versioning

* **Spec Version:** `v0.1`
* **Model Versioning:** `ofp_extractor:vX.Y`
* **Backward Compatibility:**
  * Readers MUST accept prior minor versions.
  * Breaking changes require major version bump.

---

## 10. Compliance Levels

* **Level 0:** QR + GTID only (no OFP)
* **Level 1:** QR + OFP (optical validation)
* **Level 2:** QR + OFP + NFC
* **Level 3:** QR + OFP + NFC + RFID + tamper sensors

Implementations MUST declare level.

---

## 11. Reference APIs (minimal)

### 11.1 Ingest Read Event

`POST /v1/read-events`

* body: Read Event JSON
* response: `{ "accepted": true, "id": "..." }`

### 11.2 Get Registry

`GET /v1/registry/{gtid}`

### 11.3 Score (server-side assist)

`POST /v1/score`

* body: partial event (no score)
* response: computed score

---

## 12. Conformance

An implementation is GTP-compliant if it:

1. Generates valid GTIDs (entropy + format)
2. Produces OFP using a versioned extractor
3. Emits signed Read Events with required fields
4. Computes Trust Score and exposes thresholds
5. Supports the URI scheme

---

## 13. Test Vectors (v0.1)

* **TV-01 (Exact Match):** similarity >= 0.98 -> VALID
* **TV-02 (Illumination Shift):** similarity >= 0.92 -> VALID
* **TV-03 (Partial Copy):** similarity <= 0.75 -> SUSPICIOUS
* **TV-04 (RF mismatch):** R=0 -> SUSPICIOUS regardless of O

---

## 14. Roadmap (Non-Normative)

* v0.2: multi-capture OFP sets; temporal models
* v0.3: ZK proofs; decentralized attestations
* v1.0: formal certification program; hardware profiles

---

## 15. License

This specification is licensed under Apache-2.0.
