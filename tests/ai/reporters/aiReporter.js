export function printAIReport({ analysis, changes }) {

  console.log("\n🧠 ===== AI REPORT =====");

  console.log("📊 Risk Level:", analysis.riskLevel);
  console.log("🚨 Anomalies:", analysis.anomalies);
  console.log("⚠️ Missing:", analysis.missingFields);

  if (changes) {
    console.log("\n🔍 Changes Detected:");
    changes.changes.forEach(c => console.log(" -", c));
    console.log("🔥 Change Risk:", changes.riskLevel);
  }

  console.log("🧠 =====================\n");
}