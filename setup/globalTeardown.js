import { stopWiremock } from '../scripts/wiremock.js';

export default async function globalTeardown() {
  console.log("🧹 Global teardown iniciado");
  stopWiremock();
}