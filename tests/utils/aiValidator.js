import { analizarCambios } from '../ai/analyzers/responseAnalyzer.js';

export async function validarConIA(oldResponse, newResponse) {
  const analisis = await analizarCambios(oldResponse, newResponse);

  console.log("🧠 IA detectó:");
  console.log(analisis);
}