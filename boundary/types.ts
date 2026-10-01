import { UEAPEvent } from "../core/event-schema";

export interface DomainRepresentation {
  readonly domain: string;
  readonly adapterId: string;
  readonly adapterVersion: string;
  readonly sourceRef: string;
  readonly payload: unknown;
}

export interface UEAPBoundaryResult {
  event: UEAPEvent;
  sourceRef: string;
  adapterId: string;
  adapterVersion: string;
  provenance: {
    domain: string;
    sourceRef: string;
    adapterId: string;
    adapterVersion: string;
  };
}

export interface DomainBoundaryAdapter<TSource> {
  readonly id: string;
  readonly version: string;
  readonly domain: string;
  toDomainRepresentation(source: TSource): DomainRepresentation;
  toUEAP(source: TSource): UEAPBoundaryResult;
}
