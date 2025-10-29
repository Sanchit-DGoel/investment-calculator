// Investment Strategy Configurations
// Based on Investment Approaches Comparison Framework

const strategies = [
  {
    id: 'conservative',
    name: 'Conservative',
    description: 'Capital preservation with modest growth. Focus on bonds and stable assets.',
    avgReturn: 0.05,  // 5% annual return
    volatility: 0.08,  // 8% standard deviation
    allocation: {
      bonds: 0.60,
      moneyMarket: 0.20,
      dividendStocks: 0.15,
      commodities: 0.05
    },
    allocationLabels: {
      bonds: 'Bonds (Government/Corporate)',
      moneyMarket: 'Money Market/HYSA',
      dividendStocks: 'Dividend-Paying Stocks',
      commodities: 'Gold/Commodities'
    },
    riskLevel: 'Low',
    timeHorizon: '1-5 years',
    expectedReturnRange: '4-6%',
    bestFor: 'Capital preservation, near-term goals, risk-averse investors'
  },
  {
    id: 'moderate',
    name: 'Moderate',
    description: 'Balanced growth with manageable risk. Mix of stocks and bonds.',
    avgReturn: 0.07,  // 7% annual return
    volatility: 0.12,  // 12% standard deviation
    allocation: {
      stocks: 0.50,
      bonds: 0.30,
      reits: 0.10,
      international: 0.10
    },
    allocationLabels: {
      stocks: 'Stock Index Funds/ETFs',
      bonds: 'Bond Funds',
      reits: 'REITs',
      international: 'International Equities'
    },
    riskLevel: 'Medium',
    timeHorizon: '5-15 years',
    expectedReturnRange: '6-8%',
    bestFor: 'Balanced growth, medium-term goals, moderate risk tolerance'
  },
  {
    id: 'aggressive',
    name: 'Aggressive',
    description: 'Maximum long-term growth potential. Stock-heavy portfolio.',
    avgReturn: 0.09,  // 9% annual return
    volatility: 0.18,  // 18% standard deviation
    allocation: {
      stocks: 0.70,
      international: 0.15,
      alternatives: 0.10,
      bonds: 0.05
    },
    allocationLabels: {
      stocks: 'Stock Index Funds/Individual Stocks',
      international: 'International/Emerging Markets',
      alternatives: 'Alternative Investments',
      bonds: 'Bonds'
    },
    riskLevel: 'High',
    timeHorizon: '15+ years',
    expectedReturnRange: '8-10%+',
    bestFor: 'Long-term wealth building, high risk tolerance, young investors'
  },
  {
    id: 'income',
    name: 'Income-Focused',
    description: 'Generate regular cash flow. Focus on dividend and income-producing assets.',
    avgReturn: 0.08,  // 8% annual return (4-6% yield + 3-5% appreciation)
    volatility: 0.12,  // 12% standard deviation
    allocation: {
      dividendStocks: 0.40,
      reits: 0.30,
      bonds: 0.20,
      preferredStocks: 0.10
    },
    allocationLabels: {
      dividendStocks: 'Dividend Stocks/Dividend ETFs',
      reits: 'REITs',
      bonds: 'Bonds',
      preferredStocks: 'Preferred Stocks/High-Yield Bonds'
    },
    riskLevel: 'Medium',
    timeHorizon: '5+ years',
    expectedReturnRange: '7-11%',
    bestFor: 'Regular income generation, retirees, income-focused investors'
  }
];

// Chart colors for allocation visualization
const allocationColors = [
  '#3b82f6',  // Blue
  '#8b5cf6',  // Purple
  '#f59e0b',  // Orange
  '#10b981',  // Green
  '#ef4444'   // Red
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { strategies, allocationColors };
}
