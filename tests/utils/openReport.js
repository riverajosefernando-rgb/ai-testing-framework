import { exec } from 'child_process';
import path from 'path';

export function openReport(file = 'ai-report.html') {
  const fullPath = path.resolve(file);

  let command;

  if (process.platform === 'win32') {
    command = `start "" "${fullPath}"`;
  } else if (process.platform === 'darwin') {
    command = `open "${fullPath}"`;
  } else {
    command = `xdg-open "${fullPath}"`;
  }

  exec(command, {
    shell: true,
    detached: true
  }, (err) => {
    if (err) {
      console.error("❌ Error abriendo el dashboard:", err);
    } else {
      console.log("📊 Dashboard abierto correctamente");
    }
  });
}