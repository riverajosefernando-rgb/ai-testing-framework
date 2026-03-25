export function detectBreakingChanges(oldRes, newRes) {

  const changes = [];
  let riskLevel = "LOW";

  for (const key in oldRes) {
    if (!newRes.hasOwnProperty(key)) {
      changes.push(`❌ Campo eliminado: ${key}`);
      riskLevel = "HIGH";
    }
  }

  for (const key in newRes) {
    if (!oldRes.hasOwnProperty(key)) {
      changes.push(`➕ Campo nuevo: ${key}`);
      if (riskLevel !== "HIGH") riskLevel = "MEDIUM";
    } else if (oldRes[key] !== newRes[key]) {
      changes.push(`🔄 Cambio en ${key}: ${oldRes[key]} → ${newRes[key]}`);
      if (riskLevel !== "HIGH") riskLevel = "MEDIUM";
    }
  }

  return {
    riskLevel,
    changes
  };
}