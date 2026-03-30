import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export function generateHTMLReport(history, fileName = 'ai-report.html') {

const timestamp = new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'short',
  timeStyle: 'medium'
}).format(new Date());
  
  const rows = history.map(entry => `
    <tr>
      <td>${entry.timestamp}</td>
      <td class="${entry.riskLevel}">${entry.riskLevel}</td>
      <td>
        <ul>
          ${entry.changes.map(c => `
            <li>
              <span class="endpoint">[${c.endpoint}]</span> → ${c.description}
            </li>
          `).join('')}
        </ul>
      </td>
    </tr>
  `).join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>AI Testing Dashboard</title>

    <!-- 🚫 Evitar cache -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <style>
      body {
        font-family: Arial;
        background: #0f172a;
        color: #e2e8f0;
        padding: 20px;
      }

      h1 {
        color: #38bdf8;
      }

      .timestamp {
        font-size: 12px;
        color: #94a3b8;
        margin-bottom: 10px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th, td {
        border: 1px solid #334155;
        padding: 10px;
        text-align: left;
      }

      th {
        background: #1e293b;
      }

      tr:nth-child(even) {
        background: #1e293b;
      }

      .LOW { color: #22c55e; font-weight: bold; }
      .MEDIUM { color: #f59e0b; font-weight: bold; }
      .HIGH { color: #ef4444; font-weight: bold; }

      ul {
        margin: 0;
        padding-left: 20px;
      }

      li {
        margin-bottom: 5px;
      }

      .endpoint {
        color: #38bdf8;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <h1>🧠 AI Testing Dashboard</h1>
    <p class="timestamp">Última actualización: ${timestamp}</p>
    <p>Historial de cambios detectados por IA</p>

    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Risk Level</th>
          <th>Cambios</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </body>
  </html>
  `;

  // 💾 Guardar archivo
  fs.writeFileSync(`reports/${fileName}`, html);

  // 🔗 Generar URL
  const fullPath = path.resolve(`reports/${fileName}`);
  const fileUrl = `file:///${fullPath.replace(/\\/g, '/')}`;

  console.log("\n📊 ===== AI DASHBOARD =====");
  console.log(`📄 Archivo: ${fileName}`);
  console.log(`🔗 ${fileUrl}`);
  console.log("📊 =======================\n");

  // 🚀 Abrir en navegador predeterminado
  let command;

  if (process.platform === 'win32') {
    command = `start "" "${fileUrl}"`; // 🔥 FIX CLAVE WINDOWS
  } else if (process.platform === 'darwin') {
    command = `open "${fileUrl}"`;
  } else {
    command = `xdg-open "${fileUrl}"`;
  }

  // 🔥 Delay para evitar que Playwright lo cierre
  setTimeout(() => {
    exec(command, { shell: true });
  }, 1000);
}