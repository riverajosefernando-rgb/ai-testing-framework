export function generarEscenariosDesdeCambios(changes, endpoint = 'default') {

  return changes.map((change, index) => {

    // 🧠 Extraer campo
    const field = change.split(': ')[1]?.trim();

    // 🔴 Campo eliminado
    if (change.includes("eliminado")) {
      return {
        id: `SCN-${index + 1}`,
        nombre: `Validar campo eliminado: ${field}`,
        descripcion: change,
        tipo: "breaking-change",
        action: "removed",
        field,
        endpoint, // 💣 CLAVE
        risk: "HIGH",
        request: {}
      };
    }

    // 🟢 Campo nuevo
    if (change.includes("nuevo")) {
      return {
        id: `SCN-${index + 1}`,
        nombre: `Validar campo nuevo: ${field}`,
        descripcion: change,
        tipo: "compatibility",
        action: "added",
        field,
        endpoint, // 💣 CLAVE
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
      endpoint, // 💣 CLAVE
      risk: "LOW",
      request: {}
    };
  });
}