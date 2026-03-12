import { UEAP } from "../../sdk";

/**
 * @title GuardDrive Telemetry Simulation
 * @notice Demonstrates UEAP usage for vehicle event attestations.
 */
async function simulateVehicleEvent() {
  const vehicleEvent = UEAP.createEvent({
    actor: "V-ID-8829-BRA",
    action: "Telemetry.Overspeed",
    object: "Engine-ECU-01",
    location: "-23.5505, -46.6333", // São Paulo
    evidence: "speed: 124km/h; limit: 110km/h"
  });

  console.log("--- GuardDrive Event Created ---");
  console.log(JSON.stringify(vehicleEvent, null, 2));

  const attestation = await UEAP.generateAttestation(
    vehicleEvent,
    "0xGuardDriveIssuerAddress",
    "ZK_PROVE_SPEED_LIMIT_EXCEEDED_MOCK"
  );

  console.log("\n--- UEAP Attestation Generated ---");
  console.log(attestation);
  
  const isValid = UEAP.verifyLocal(attestation);
  console.log(`\nLocal Verification: ${isValid ? "✅ VALID" : "❌ INVALID"}`);
}

simulateVehicleEvent();
