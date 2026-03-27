import { exec } from 'child_process';
import path from 'path';

const file = process.argv[2] || 'ai-report.html';
const fullPath = path.resolve(file);

const command = `start "" "${fullPath}"`;

exec(command, { shell: 'cmd.exe', detached: true }, (err) => {
  if (err) {
    console.error("❌ Error abriendo dashboard:", err);
  } else {
    console.log("📊 Dashboard abierto correctamente");
  }
});

// 🔥 esto es CLAVE → desacopla el proceso
process.exit(0);