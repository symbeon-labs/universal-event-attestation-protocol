import { UEAP } from "../../sdk";

/**
 * @title Green Energy Generation Simulation
 * @notice Tokenization of renewable energy produced by solar/wind plants.
 */
async function simulateEnergyEvent() {
  const energyEvent = UEAP.createEvent({
    actor: "SolarPlant-Alpha",
    action: "Energy.Generation",
    object: "Grid-Inverter-01",
    location: "Ceará, BR",
    evidence: "generation_kwh: 1250.5; period: 2026-03-12T00:00Z; source: Solar"
  });

  const attestation = await UEAP.generateAttestation(
    energyEvent,
    "0xEnergyRegistryOracle",
    "ZK_PROVE_MWh_GENERATION_VALID"
  );

  console.log("--- Green Energy Attestation Registered ---");
  console.log(attestation);
}

simulateEnergyEvent();
