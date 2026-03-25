import fs from 'fs';

const FILE = './generated-scenarios.json';

export function saveGeneratedScenarios(scenarios) {

  if (!scenarios || scenarios.length === 0) {
    console.log("⚠️ No hay escenarios para guardar");
    return;
  }

  let existing = [];

  if (fs.existsSync(FILE)) {
    try {
      const content = fs.readFileSync(FILE, 'utf-8');
      if (content.trim()) {
        existing = JSON.parse(content);
      }
    } catch {
      console.log("⚠️ Archivo corrupto, reiniciando...");
    }
  }

  // 🔥 evitar duplicados
  const nuevos = scenarios.filter(s =>
    !existing.some(e => e.nombre === s.nombre)
  );

  const updated = [...existing, ...nuevos];

  fs.writeFileSync(FILE, JSON.stringify(updated, null, 2));

  console.log(`💾 Escenarios guardados: ${nuevos.length}`);
}