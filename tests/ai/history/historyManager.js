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

      if (content.trim()) {
        history = JSON.parse(content);
      }

    } catch (error) {
      console.log("⚠️ Historial corrupto, reiniciando...");
      history = [];
    }
  }

  // 🔥 AQUÍ ESTÁ LA MAGIA
  const formattedChanges = (entry.changes || []).map(c => {
    // soporta formato viejo (string)
    if (typeof c === 'string') {
      return {
        endpoint: name,
        description: c
      };
    }

    // formato nuevo
    return {
      endpoint: c.endpoint || name,
      description: c.description || JSON.stringify(c)
    };
  });

  history.push({
    timestamp: new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'short',
    timeStyle: 'medium'
}).format(new Date()),
    endpoint: name, // 🔥 guardamos endpoint explícito
    ...entry,
    changes: formattedChanges
  });

  fs.writeFileSync(file, JSON.stringify(history, null, 2));
}