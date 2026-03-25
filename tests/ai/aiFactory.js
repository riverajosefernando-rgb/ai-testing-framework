import { MockProvider } from './providers/mockProvider.js';
// import { CopilotProvider } from './providers/copilotProvider.js';

export function getAIProvider() {
  const provider = process.env.AI_PROVIDER || "mock";

  switch (provider) {
    case "copilot":
      // return new CopilotProvider();
      throw new Error("Copilot aún no implementado");

    case "mock":
    default:
      return new MockProvider();
  }
}