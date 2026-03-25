import fs from 'fs';

// 🧠 archivo dinámico (si hay endpoint)
function getFile(endpoint) {
  return endpoint
    ? `./generated-scenarios-${endpoint}.json`
    : './generated-scenarios.json'; // fallback (compatibilidad)
}

export function saveGeneratedScenarios(scenarios, endpoint = null) {

  if (!scenarios || escenarios.length === 0) {
    console.log("⚠️ No hay escenarios para guardar");
    return;
  }

  const file = getFile(endpoint);

  let existing = [];

  if (fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf-8');

      if (content.trim()) {
        existing = JSON.parse(content);
      }

    } catch {
      console.log("⚠️ Archivo corrupto, reiniciando...");
    }
  }

  // 🔥 evitar duplicados (nombre + endpoint)
  const nuevos = escenarios.filter(s =>
    !existing.some(e =>
      e.nombre === s.nombre &&
      (e.endpoint || endpoint) === (s.endpoint || endpoint)
    )
  );

  // 🧠 agregar endpoint automáticamente si no viene
  const escenariosConEndpoint = nuevos.map(s => ({
    ...s,
    endpoint: s.endpoint || endpoint || 'default'
  }));

  const updated = [...existing, ...escenariosConEndpoint];

  fs.writeFileSync(file, JSON.stringify(updated, null, 2));

  console.log(`💾 Escenarios guardados (${endpoint || 'default'}): ${escenariosConEndpoint.length}`);
}