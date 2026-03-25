import { execSync } from 'child_process';

export function startWiremock() {
  console.log("🚀 Iniciando WireMock con docker-compose...");
  execSync('docker-compose up -d', { stdio: 'inherit' });
}

export function stopWiremock() {
  console.log("🛑 Deteniendo WireMock...");
  execSync('docker-compose down', { stdio: 'inherit' });
}