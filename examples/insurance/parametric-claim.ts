import { UEAP } from "../../sdk";

/**
 * @title Parametric Insurance Simulation
 * @notice Automatic claim triggering based on weather events (Drought/Flood).
 */
async function simulateInsuranceEvent() {
  const weatherEvent = UEAP.createEvent({
    actor: "Sat-Sentinel-6",
    action: "Climate.Measurement",
    object: "Agro-Region-C7",
    location: "Mato Grosso, BR",
    evidence: "rainfall_mm: 0; period_days: 45; drought_threshold: MET"
  });

  const attestation = await UEAP.generateAttestation(
    weatherEvent,
    "0xWeatherOracleAggregator",
    "ZK_PROVE_DROUGHT_INDEX_FOR_PAYOUT"
  );

  console.log("--- Parametric Insurance Event Registered ---");
  console.log(attestation);
  console.log("\n[Insurance Smart Contract]: Attestation verified. Triggering automatic payout to 0xFarmerAddress.");
}

simulateInsuranceEvent();
