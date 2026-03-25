import fs from 'fs';
import path from 'path';

const HISTORY_DIR = './history';

function getFilePath(name) {
  return path.join(HISTORY_DIR, `${name}-history.json`);
}

export function saveHistory(name, entry) {
  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR);
  }

  const file = getFilePath(name);

  let history = [];

  if (fs.existsSync(file)) {
    try {
      const content = fs.readFileSync(file, 'utf-8');

      // 🧠 Evita archivo vacío
      if (content.trim()) {
        history = JSON.parse(content);
      }

    } catch (error) {
      console.log("⚠️ Historial corrupto, reiniciando...");
      history = [];
    }
  }

  history.push({
    timestamp: new Date().toISOString(),
    ...entry
  });

  fs.writeFileSync(file, JSON.stringify(history, null, 2));
}