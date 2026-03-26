import fs from 'fs';

export function getEndpoints() {

  const files = fs.readdirSync('.');

  return files
    .filter(f => f.startsWith('generated-scenarios-'))
    .map(f => {

      const name = f
        .replace('generated-scenarios-', '')
        .replace('.json', '');

      return {
        name,
        path: `/${name}`,
        method: 'POST' // 🔥 puedes hacerlo dinámico después
      };
    });
}