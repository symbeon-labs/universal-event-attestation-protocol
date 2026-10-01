import { ethers } from "ethers";
import { canonicalize } from "../core/canonicalize";
import { UEAPEvent } from "../core/event-schema";
import { DomainBoundaryAdapter, DomainRepresentation, UEAPBoundaryResult } from "./types";

export function commitCanonical(value: unknown): string {
  return ethers.keccak256(ethers.toUtf8Bytes(canonicalize(value)));
}

export function buildProvenanceCommitment(result: UEAPBoundaryResult): string {
  return commitCanonical(result.provenance);
}

export function buildBoundaryResult(
  source: DomainRepresentation,
  event: UEAPEvent
): UEAPBoundaryResult {
  return {
    event,
    sourceRef: source.sourceRef,
    adapterId: source.adapterId,
    adapterVersion: source.adapterVersion,
    provenance: {
      domain: source.domain,
      sourceRef: source.sourceRef,
      adapterId: source.adapterId,
      adapterVersion: source.adapterVersion
    }
  };
}

/**
 * Reference boundary adapter.
 *
 * The boundary deliberately produces two independently inspectable objects:
 * 1. the domain-independent UEAP event;
 * 2. provenance describing where the event came from.
 *
 * This is an experimental implementation of the Domain → Attestation Boundary
 * hypothesis; it is not yet a normative UEAP requirement.
 */
export abstract class ReferenceBoundaryAdapter<TSource>
  implements DomainBoundaryAdapter<TSource>
{
  abstract readonly id: string;
  abstract readonly version: string;
  abstract readonly domain: string;

  abstract toDomainRepresentation(source: TSource): DomainRepresentation;

  abstract toUEAP(source: TSource): UEAPBoundaryResult;

  protected result(source: DomainRepresentation, event: UEAPEvent): UEAPBoundaryResult {
    return buildBoundaryResult(source, event);
  }
}
