# 🚀 AI Testing Project (Playwright + IA)

Framework de pruebas automatizadas con Playwright + Inteligencia Artificial, capaz de detectar cambios en APIs, aprender del historial, generar escenarios automáticamente y ejecutar validaciones inteligentes.

---

# 🧠 ¿Qué hace este proyecto?

Este proyecto transforma el testing tradicional en un sistema inteligente que:

- Detecta endpoints automáticamente  
- Genera escenarios de prueba con IA  
- Ejecuta pruebas multi-endpoint  
- Detecta cambios en APIs  
- Aprende del historial (auto-adaptativo)  
- Genera asserts dinámicos  
- Clasifica riesgo automáticamente  
- Genera dashboard visual  

---

# 🔥 Flujo del sistema

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

# 🏗️ Arquitectura

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

history/  
ai-report.html  

---

# ⚙️ Instalación

npm install

---

# ▶️ Ejecución

npx playwright test

---

# 🧪 Ejecución inteligente

Ejemplo real:

🧠 Generando escenarios IA para login  
🧠 Generando escenarios IA para transfer  

🧪 [login] Caso 1  
🧪 [transfer] Caso 2  

---

# 🔍 Detección de cambios

Ejemplo:

➕ Campo nuevo: currency  
➕ Campo nuevo: newField  

---

# 🤖 Generación automática de tests

Validar campo nuevo: currency  

Se convierte en:

{ tipo: 'exists', field: 'currency' }

---

# 🧠 Aprendizaje automático

El sistema:

- Recuerda cambios anteriores  
- Evita ruido  
- Se adapta automáticamente  

---

# 📊 Dashboard

Muestra:

- Timestamp (hora local)  
- Nivel de riesgo  
- Cambios detectados  
- Endpoint afectado  

---

# ⚙️ Modos IA

AI_MODE

🔴 STRICT  
Falla si hay breaking changes reales  

🟡 FLEXIBLE  
Solo genera advertencias  

🟢 LEARNING  
Aprende automáticamente nuevos cambios  

---

# 🌎 Manejo de fechas

- Hora local automática  
- Adaptada al servidor  
- Formato legible  

---

# 🚀 Características clave

- Testing autónomo  
- Generación automática de escenarios  
- Auto aprendizaje  
- Multi-endpoint  
- Dashboard visual  
- Clasificación de riesgo  
- Escalable  

---

# 💥 Nivel del proyecto

Este proyecto implementa:

- Observabilidad de APIs  
- Testing adaptativo  
- Inteligencia en validaciones  

No es testing tradicional  
Es una plataforma QA inteligente  

---

# 🔥 Roadmap

- Dashboard web (localhost)  
- Auto-refresh en tiempo real  
- Métricas por endpoint  
- Alertas automáticas  
- Integración con CI/CD  

---

# 👨‍💻 Autor

Proyecto desarrollado como evolución del QA tradicional hacia QA con IA.