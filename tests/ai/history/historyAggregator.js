import fs from 'fs';
import path from 'path';

const HISTORY_DIR = './history';

export function getAllHistory() {
  if (!fs.existsSync(HISTORY_DIR)) {
    return [];
  }

  const files = fs.readdirSync(HISTORY_DIR);

  let allHistory = [];

  for (const file of files) {
    try {
      const fullPath = path.join(HISTORY_DIR, file);
      const content = fs.readFileSync(fullPath, 'utf-8');

      if (content.trim()) {
        const parsed = JSON.parse(content);

        // 🔥 aseguramos que sea array
        if (Array.isArray(parsed)) {
          allHistory = allHistory.concat(parsed);
        }
      }

    } catch (error) {
      console.log(`⚠️ Error leyendo ${file}, ignorado`);
    }
  }

  return allHistory;
}