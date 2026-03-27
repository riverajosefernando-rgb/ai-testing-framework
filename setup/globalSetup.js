import { startWiremock } from '../scripts/wiremock.js';
import { IS_MOCK } from '../tests/config/environment.js';

export default async function globalSetup() {
  console.log("🌍 Global setup iniciado");

  if (!IS_MOCK) {
    console.log("ℹ️ ENV != mock → NO se inicia WireMock");
    return;
  }

  console.log("🚀 Iniciando WireMock...");
  startWiremock();

  // espera para asegurar que levante
  await new Promise(r => setTimeout(r, 3000));
}