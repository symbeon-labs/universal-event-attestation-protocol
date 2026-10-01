import { IoTAdapter, IoTReading } from "../adapters/iot";
import { DomainRepresentation } from "./types";
import { ReferenceBoundaryAdapter } from "./reference";

export class IoTBoundaryAdapter extends ReferenceBoundaryAdapter<IoTReading> {
  readonly id = "iot-boundary";
  readonly version = "0.1";
  readonly domain = "iot";

  private readonly adapter = new IoTAdapter();

  toDomainRepresentation(source: IoTReading): DomainRepresentation {
    return {
      domain: this.domain,
      adapterId: this.id,
      adapterVersion: this.version,
      sourceRef: source.deviceId,
      payload: source
    };
  }

  toUEAP(source: IoTReading) {
    return this.result(
      this.toDomainRepresentation(source),
      this.adapter.toUEAPEvent(source)
    );
  }
}
