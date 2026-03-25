import fs from 'fs';

export function generateHTMLReport(history, fileName = 'ai-report.html') {

  const rows = history.map(entry => `
    <tr>
      <td>${entry.timestamp}</td>
      <td class="${entry.riskLevel}">${entry.riskLevel}</td>
      <td>
        <ul>
          ${entry.changes.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </td>
    </tr>
  `).join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>AI Testing Dashboard</title>
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
    </style>
  </head>

  <body>
    <h1>🧠 AI Testing Dashboard</h1>
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

  fs.writeFileSync(fileName, html);

  console.log(`📊 Dashboard generado: ${fileName}`);
}