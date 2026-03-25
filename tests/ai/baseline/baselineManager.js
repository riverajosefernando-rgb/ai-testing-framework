import fs from 'fs';
import path from 'path';

const BASELINE_DIR = './baselines';

function getFilePath(name) {
  return path.join(BASELINE_DIR, `${name}.json`);
}

export function saveBaseline(name, data) {
  if (!fs.existsSync(BASELINE_DIR)) {
    fs.mkdirSync(BASELINE_DIR);
  }

  fs.writeFileSync(getFilePath(name), JSON.stringify(data, null, 2));
}

export function getBaseline(name) {
  const file = getFilePath(name);

  if (!fs.existsSync(file)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(file));
}