import { getAIProvider } from '../aiFactory.js';

export class CopilotProvider extends AIProvider {
  async analyzeResponse(response) {
    return {
      riskLevel: "LOW",
      anomalies: [],
      missingFields: [],
      recommendations: ["Copilot pendiente"]
    };
  }
}