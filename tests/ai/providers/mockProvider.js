export class MockProvider {

  async generarEscenarios(endpoint) {
    return {
      endpoint,
      casos: [
        {
          nombre: "Transferencia exitosa",
          request: { amount: 100 },
          expected: { status: "success", code: 200 }
        },
        {
          nombre: "Monto negativo",
          request: { amount: -50 },
          expected: { error: "invalid amount" }
        }
      ]
    };
  }

  async analyzeResponse(response) {
    const anomalies = [];
    const missingFields = [];

    if (!response.status) missingFields.push("status");
    if (response.amount && response.amount < 0)
      anomalies.push("Monto negativo");

    const riskLevel =
      anomalies.length > 0 ? "HIGH" :
      missingFields.length > 0 ? "MEDIUM" :
      "LOW";

    return {
      riskLevel,
      anomalies,
      missingFields,
      recommendations: ["Validar contrato API"]
    };
  }

  async analizarCambios(oldResponse, newResponse) {
    const cambios = [];

    for (const key in newResponse) {
      if (!oldResponse.hasOwnProperty(key)) {
        cambios.push(`Nuevo campo: ${key}`);
      } else if (oldResponse[key] !== newResponse[key]) {
        cambios.push(`Cambio en ${key}`);
      }
    }

    return {
      mensaje: cambios.length ? "Cambios detectados" : "Sin cambios",
      cambios
    };
  }
}