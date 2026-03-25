import { startWiremock } from '../scripts/wiremock.js';

export default async function globalSetup() {
  console.log("🌍 Global setup iniciado");
  startWiremock();

  // espera simple (suficiente con compose)
  await new Promise(r => setTimeout(r, 3000));
}