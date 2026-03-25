export function generarAssertsDeTipo(baseline, actual) {

  const asserts = [];

  for (const key in baseline) {

    if (actual[key] !== undefined) {

      const expectedType = typeof baseline[key];

      asserts.push({
        tipo: 'type',
        field: key,
        expectedType
      });
    }
  }

  return asserts;
}