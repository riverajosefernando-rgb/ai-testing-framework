import { expect } from '@playwright/test';

export function ejecutarAsserts(asserts, body) {

  for (const a of asserts) {

    console.log(`🧠 Ejecutando assert: ${a.tipo} → ${a.field || ''}`);

    switch (a.tipo) {

      case 'exists':
        expect(body).toHaveProperty(a.field);
        break;

      case 'notExists':
        expect(body).not.toHaveProperty(a.field);
        break;

      case 'notNull':
        expect(body).toBeTruthy();
        break;
        
      case 'type':
        expect(typeof body[a.field]).toBe(a.expectedType);
        break;

      default:
        console.warn("⚠️ Assert no reconocido:", a);
    }
  }
}