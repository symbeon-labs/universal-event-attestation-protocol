import { UEAPEvent } from "./event-schema";

/**
 * Deterministic JSON canonicalization for the UEAP reference implementation.
 *
 * Rules:
 * - object keys are sorted lexicographically;
 * - undefined object properties are omitted;
 * - arrays preserve order;
 * - strings are UTF-8 JSON strings;
 * - timestamps are normalized to Unix seconds before canonicalization.
 *
 * This is a reference profile, not yet a normative UEAP canonicalization standard.
 */
function normalize(value: unknown): unknown {
  if (value === undefined) return undefined;
  if (value === null || typeof value !== "object") return value;

  if (Array.isArray(value)) {
    return value.map(normalize);
  }

  const record = value as Record<string, unknown>;
  return Object.keys(record)
    .sort()
    .reduce<Record<string, unknown>>((out, key) => {
      const normalized = normalize(record[key]);
      if (normalized !== undefined) out[key] = normalized;
      return out;
    }, {});
}

export function normalizeTimestamp(timestamp: string | number): number {
  if (typeof timestamp === "number") {
    if (!Number.isSafeInteger(timestamp) || timestamp < 0) {
      throw new Error("UEAP: timestamp must be a non-negative safe integer");
    }
    return timestamp;
  }

  const parsed = Date.parse(timestamp);
  if (Number.isNaN(parsed)) {
    throw new Error("UEAP: invalid timestamp");
  }

  return Math.floor(parsed / 1000);
}

export function canonicalizeEvent(event: UEAPEvent): string {
  const normalized = {
    version: event.version,
    profile: event.profile,
    actor: event.actor,
    action: event.action,
    object: event.object,
    location: event.location,
    timestamp: normalizeTimestamp(event.timestamp),
    evidence: event.evidence
  };

  return JSON.stringify(normalize(normalized));
}
