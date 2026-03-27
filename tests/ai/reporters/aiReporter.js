export function printAIReport({ analysis, changes, endpoint }) {

  console.log("\n🧠 ===== AI REPORT =====");

  // 🔥 Endpoint visible
  if (endpoint) {
    console.log(`🔗 Endpoint: ${endpoint}`);
  }

  console.log("📊 Risk Level:", analysis.riskLevel);
  console.log("🚨 Anomalies:", analysis.anomalies);
  console.log("⚠️ Missing:", analysis.missingFields);

  if (changes && changes.changes) {
    console.log("\n🔍 Changes Detected:");

    changes.changes.forEach(c => {
      if (typeof c === 'string') {
        // compatibilidad con formato viejo
        console.log(" -", c);
      } else {
        console.log(` - [${c.endpoint || endpoint}] → ${c.description}`);
      }
    });

    console.log("🔥 Change Risk:", changes.riskLevel);
  }

  console.log("🧠 =====================\n");
}