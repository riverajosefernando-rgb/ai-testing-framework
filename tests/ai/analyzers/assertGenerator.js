export function generarAssertsIA(escenario) {

  const asserts = [];
  const descripcion = escenario.descripcion || "";

  // 🔴 Campo eliminado
  if (descripcion.includes('eliminado')) {
    const campo = descripcion.split(': ')[1]?.trim();

    asserts.push({
      tipo: 'notExists',
      field: campo
    });
  }

  // 🟢 Campo nuevo
  if (descripcion.includes('nuevo')) {
    const campo = descripcion.split(': ')[1]?.trim();

    asserts.push({
      tipo: 'exists',
      field: campo
    });
  }

  // 🟡 Fallback
  if (asserts.length === 0) {
    asserts.push({
      tipo: 'notNull'
    });
  }

  return asserts;
}