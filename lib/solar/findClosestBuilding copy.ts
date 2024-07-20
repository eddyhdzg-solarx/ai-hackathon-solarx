// Solar configuration, from buildingInsights.solarPotential.solarPanelConfigs
let panelsCount = 20
let yearlyEnergyDcKwh = 12000

// Basic settings
let monthlyAverageEnergyBill: number = 300
let energyCostPerKwh = 0.31
let panelCapacityWatts = 400
let solarIncentives: number = 7000
let installationCostPerWatt: number = 4.0
let installationLifeSpan: number = 20

// Advanced settings
let dcToAcDerate = 0.85
let efficiencyDepreciationFactor = 0.995
let costIncreaseFactor = 1.022
let discountRate = 1.04

// Solar installation
let installationSizeKw: number = (panelsCount * panelCapacityWatts) / 1000
let installationCostTotal: number =
  installationCostPerWatt * installationSizeKw * 1000

// Energy consumption
let monthlyKwhEnergyConsumption: number =
  monthlyAverageEnergyBill / energyCostPerKwh
let yearlyKwhEnergyConsumption: number = monthlyKwhEnergyConsumption * 12

// Energy produced for installation life span
let initialAcKwhPerYear: number = yearlyEnergyDcKwh * dcToAcDerate
let yearlyProductionAcKwh: number[] = [
  ...Array(installationLifeSpan).keys()
].map(year => initialAcKwhPerYear * efficiencyDepreciationFactor ** year)

// Cost with solar for installation life span
let yearlyUtilityBillEstimates: number[] = yearlyProductionAcKwh.map(
  (yearlyKwhEnergyProduced, year) => {
    const billEnergyKwh = yearlyKwhEnergyConsumption - yearlyKwhEnergyProduced
    const billEstimate =
      (billEnergyKwh * energyCostPerKwh * costIncreaseFactor ** year) /
      discountRate ** year
    return Math.max(billEstimate, 0) // bill cannot be negative
  }
)
let remainingLifetimeUtilityBill: number = yearlyUtilityBillEstimates.reduce(
  (x, y) => x + y,
  0
)
let totalCostWithSolar: number =
  installationCostTotal + remainingLifetimeUtilityBill - solarIncentives
console.log(`Cost with solar: $${totalCostWithSolar.toFixed(2)}`)

// Cost without solar for installation life span
let yearlyCostWithoutSolar: number[] = [
  ...Array(installationLifeSpan).keys()
].map(
  year =>
    (monthlyAverageEnergyBill * 12 * costIncreaseFactor ** year) /
    discountRate ** year
)
let totalCostWithoutSolar: number = yearlyCostWithoutSolar.reduce(
  (x, y) => x + y,
  0
)
console.log(`Cost without solar: $${totalCostWithoutSolar.toFixed(2)}`)

// Savings with solar for installation life span
let savings: number = totalCostWithoutSolar - totalCostWithSolar
console.log(`Savings: $${savings.toFixed(2)} in ${installationLifeSpan} years`)
