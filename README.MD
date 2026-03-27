# 🚀 AI Testing Project (Playwright + IA)

Framework de pruebas automatizadas con Playwright + Inteligencia Artificial, capaz de detectar cambios en APIs, aprender del historial, generar escenarios automáticamente y ejecutar validaciones inteligentes.

---

## 🧠 ¿Qué hace este proyecto?

Este proyecto transforma el testing tradicional en un sistema inteligente que:

- Detecta endpoints automáticamente  
- Genera escenarios de prueba con IA  
- Ejecuta pruebas multi-endpoint  
- Detecta cambios en APIs  
- Aprende del historial (auto-adaptativo)  
- Genera asserts dinámicos  
- Clasifica riesgo automáticamente  
- Genera dashboard visual  
- Manejo de ambientes  

---

## 🌍 Manejo de ambientes

El sistema soporta múltiples entornos:

- mock → Usa WireMock (local)  
- dev → API de desarrollo  
- qa → API de pruebas  
- prod → API productiva  

---

## ⚙️ Configuración

```js
const ENV = process.env.ENV || 'mock';

const CONFIG = {
  mock: 'http://localhost:3000',
  dev: 'https://dev.api.bank.com',
  qa: 'https://qa.api.bank.com',
  prod: 'https://api.bank.com'
};

export const BASE_URL = CONFIG[ENV];
```

---

## 🧪 Ejecución por ambiente

### 🔵 Mock (con WireMock)

```bash
set ENV=mock
npx playwright test
```

- Levanta WireMock automáticamente  
- Usa datos simulados  

---

### 🟢 Dev / QA / Prod (sin WireMock)

```bash
set ENV=dev
npx playwright test
```

- NO levanta WireMock  
- Consume APIs reales  

---

## 🐳 Control automático de WireMock

El sistema decide automáticamente:

- Si ENV = mock → levanta WireMock  
- Si ENV ≠ mock → no levanta nada  

---

## 🔥 Flujo del sistema

1. Detecta endpoints automáticamente  
2. Genera escenarios con IA  
3. Ejecuta pruebas dinámicas  
4. Compara con baseline  
5. Detecta cambios  
6. Aprende del historial  
7. Genera nuevos tests  
8. Ejecuta asserts inteligentes  
9. Clasifica riesgo  
10. Genera dashboard  

---

## 🏗️ Arquitectura

```
tests/
├── api/
│   ├── ai-test.spec.js
│   ├── ai-login.spec.js
│   ├── ai-generated.spec.js
│   ├── ai-dynamic.spec.js
│
├── ai/
│   ├── analyzers/
│   ├── baseline/
│   ├── history/
│   ├── generators/
│   ├── reporters/
│
history/
ai-report.html
```

---

## ▶️ Ejecución

```bash
npx playwright test
```

---

## 📊 Dashboard

Genera el archivo:

```
ai-report.html
```

Incluye:

- Timestamp (hora local)  
- Nivel de riesgo  
- Cambios detectados  
- Endpoint afectado  

---

## ⚙️ Modos IA

- STRICT → Falla si hay breaking changes  
- FLEXIBLE → Solo advierte  
- LEARNING → Aprende automáticamente  

---

## 🚀 Características clave

- Testing autónomo  
- Generación automática de escenarios  
- Auto aprendizaje  
- Multi-endpoint  
- Dashboard visual  
- Clasificación de riesgo  
- Soporte multi-ambiente  
- Escalable  

---

## 💥 Nivel del proyecto

No es testing tradicional  
Es una plataforma QA inteligente  

---

## 👨‍💻 Autor

Proyecto desarrollado como evolución del QA tradicional hacia QA con IA.
