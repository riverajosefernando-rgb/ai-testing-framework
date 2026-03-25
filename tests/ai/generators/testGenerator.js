import { getAIProvider } from '../aiFactory.js';

export async function generarEscenarios(endpoint) {
  const ai = getAIProvider();
  return ai.generarEscenarios(endpoint);
}