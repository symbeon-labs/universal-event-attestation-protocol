import { ethers } from "ethers";
import { UEAPEvent } from "./event-schema";
import { canonicalizeEvent } from "./canonicalize";

/**
 * Reference commitment over the declared canonical representation.
 * The canonicalization/primitive pair is experimental, not normative UEAP.
 */
export function hashEvent(event: UEAPEvent): string {
  return ethers.keccak256(ethers.toUtf8Bytes(canonicalizeEvent(event)));
}
