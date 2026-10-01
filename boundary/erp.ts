import { ERPAdapter, ERPRecord } from "../adapters/erp";
import { DomainRepresentation } from "./types";
import { ReferenceBoundaryAdapter } from "./reference";

export class ERPBoundaryAdapter extends ReferenceBoundaryAdapter<ERPRecord> {
  readonly id = "erp-boundary";
  readonly version = "0.1";
  readonly domain = "erp";

  private readonly adapter = new ERPAdapter();

  toDomainRepresentation(source: ERPRecord): DomainRepresentation {
    return {
      domain: this.domain,
      adapterId: this.id,
      adapterVersion: this.version,
      sourceRef: source.transactionId,
      payload: source
    };
  }

  toUEAP(source: ERPRecord) {
    return this.result(
      this.toDomainRepresentation(source),
      this.adapter.toUEAPEvent(source)
    );
  }
}
