import fs from 'fs';

export function getHistory(name) {
  const file = `./history/${name}-history.json`;

  if (!fs.existsSync(file)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}