import { stopWiremock } from '../scripts/wiremock.js';
import { IS_MOCK } from '../../config/environment.js';

export default async function globalTeardown() {
  console.log("🧹 Global teardown iniciado");

  if (!IS_MOCK) {
    console.log("ℹ️ ENV != mock → NO se detiene WireMock");
    return;
  }

  stopWiremock();
}