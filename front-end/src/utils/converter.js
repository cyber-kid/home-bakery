const conversionRates = {
  L: { ML: 1000, L: 1 },
  ML: { L: 0.001, ML: 1 },
  KG: { G: 1000, LB: 2.20462, KG: 1 },
  G: { KG: 0.001, G: 1 },
  LB: { KG: 0.453592, LB: 1 },
}

export const convert = (fromUnit, toUnit, amount) => {
  if (!conversionRates[fromUnit] || !conversionRates[fromUnit][toUnit]) {
    throw new Error(`Conversion from ${fromUnit} to ${toUnit} is not supported.`)
  }

  return amount.mul(conversionRates[fromUnit][toUnit])
}