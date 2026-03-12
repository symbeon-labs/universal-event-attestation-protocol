import { ethers } from "ethers";
import { UEAPEvent } from "./event-schema";

/**
 * @notice Generates a deterministic hash for a UEAP event schema.
 */
export function hashEvent(event: UEAPEvent): string {
  const encoded = ethers.abiCoder.encode(
    ["string", "string", "string", "string", "uint256", "string"],
    [
      event.actor,
      event.action,
      event.object,
      event.location,
      typeof event.timestamp === "string" ? Math.floor(new Date(event.timestamp).getTime() / 1000) : event.timestamp,
      event.evidence
    ]
  );
  return ethers.keccak256(encoded);
}
