export function aprenderDelHistorial(history) {

  const frecuencia = {};

  for (const entry of history) {
    for (const change of entry.changes) {
      frecuencia[change] = (frecuencia[change] || 0) + 1;
    }
  }

  return frecuencia;
}

export function filtrarCambiosRecurrentes(changes, frecuencia) {

  return changes.filter(c => (frecuencia[c] || 0) < 3);
}