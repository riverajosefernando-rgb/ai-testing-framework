import { getAIProvider } from '../aiFactory.js'; 

export async function analizarCambios(oldResponse, newResponse) {
  const ai = getAIProvider();
  return ai.analizarCambios(oldResponse, newResponse);
}