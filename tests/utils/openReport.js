import { exec } from 'child_process';

export function openReport(file = 'ai-report.html') {

  const command =
    process.platform === 'win32'
      ? `start ${file}`
      : process.platform === 'darwin'
      ? `open ${file}`
      : `xdg-open ${file}`;

  exec(command, (err) => {
    if (err) {
      console.error("❌ Error abriendo el dashboard:", err);
    }
  });
}