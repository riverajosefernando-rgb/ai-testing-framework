export function generarEscenariosDesdeCambios(changes) {

  return changes.map((change, index) => {

    // 🧠 Extraer campo (lo que viene después de ": ")
    const field = change.split(': ')[1]?.trim();

    // 🔴 Campo eliminado
    if (change.includes("eliminado")) {
      return {
        id: `SCN-${index + 1}`,
        nombre: `Validar campo eliminado: ${field}`, // 💣 único
        descripcion: change,
        tipo: "breaking-change",
        action: "removed",
        field,
        risk: "HIGH",
        request: {}
      };
    }

    // 🟢 Campo nuevo
    if (change.includes("nuevo")) {
      return {
        id: `SCN-${index + 1}`,
        nombre: `Validar campo nuevo: ${field}`, // 💣 único
        descripcion: change,
        tipo: "compatibility",
        action: "added",
        field,
        risk: "MEDIUM",
        request: {}
      };
    }

    // 🟡 Otros cambios
    return {
      id: `SCN-${index + 1}`,
      nombre: `Validar cambio en: ${field || 'estructura'}`,
      descripcion: change,
      tipo: "regression",
      action: "modified",
      field,
      risk: "LOW",
      request: {}
    };
  });
}