import { ethers } from "ethers";
import { canonicalize, canonicalizeEvent } from "../core/canonicalize";
import { hashEvent } from "../core/event-hash";
import { ERPBoundaryAdapter } from "../boundary/erp";
import { IoTBoundaryAdapter } from "../boundary/iot";

const erp = new ERPBoundaryAdapter();
const iot = new IoTBoundaryAdapter();

const erpInput = {
  transactionId: "ERP-9182",
  actorId: "device-42",
  operation: "temperature.read",
  objectId: "warehouse-A",
  occurredAt: 1720000000,
  evidence: "42.5 C",
  location: "BR"
};

const iotInput = {
  deviceId: "device-42",
  measurement: "temperature.read",
  targetId: "warehouse-A",
  observedAt: 1720000000,
  value: "42.5",
  unit: "C",
  location: "BR"
};

export function runIdentityProvenanceExperiment() {
  const erpResult = erp.toUEAP(erpInput);
  const iotResult = iot.toUEAP(iotInput);

  const eventCanonicalERP = canonicalizeEvent(erpResult.event);
  const eventCanonicalIoT = canonicalizeEvent(iotResult.event);

  const modelAERP = { event: erpResult.event, provenance: erpResult.provenance };
  const modelAIoT = { event: iotResult.event, provenance: iotResult.provenance };

  const modelACommitmentERP = ethers.keccak256(ethers.toUtf8Bytes(canonicalize(modelAERP)));
  const modelACommitmentIoT = ethers.keccak256(ethers.toUtf8Bytes(canonicalize(modelAIoT)));

  const modelBCommitmentERP = hashEvent(erpResult.event);
  const modelBCommitmentIoT = hashEvent(iotResult.event);

  const provenanceERP = ethers.keccak256(
    ethers.toUtf8Bytes(canonicalize(erpResult.provenance))
  );
  const provenanceIoT = ethers.keccak256(
    ethers.toUtf8Bytes(canonicalize(iotResult.provenance))
  );

  return {
    semanticCanonicalEquality: eventCanonicalERP === eventCanonicalIoT,
    modelAEventCommitmentEquality: modelACommitmentERP === modelACommitmentIoT,
    modelBEventCommitmentEquality: modelBCommitmentERP === modelBCommitmentIoT,
    provenancePreserved: provenanceERP !== provenanceIoT,
    provenanceCommitmentERP: provenanceERP,
    provenanceCommitmentIoT: provenanceIoT,
    modelACommitmentERP,
    modelACommitmentIoT,
    modelBCommitmentERP,
    modelBCommitmentIoT
  };
}
