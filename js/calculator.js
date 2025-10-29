// Financial Calculation Functions
// All calculations based on historical market data and compound interest formulas

/**
 * Format number as currency
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Format number as percentage
 * @param {number} value - The value to format (0.05 = 5%)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
function formatPercentage(value, decimals = 1) {
  return (value * 100).toFixed(decimals) + '%';
}

/**
 * Calculate future value of investment without monthly contributions
 * Formula: FV = PV * (1 + r)^t
 * @param {number} principal - Initial investment amount
 * @param {number} rate - Annual rate of return (decimal, e.g., 0.07 for 7%)
 * @param {number} years - Number of years
 * @returns {number} Future value
 */
function calculateFutureValue(principal, rate, years) {
  return principal * Math.pow(1 + rate, years);
}

/**
 * Calculate future value with monthly contributions
 * Formula: FV = PV(1+r)^t + PMT × [((1+r)^t - 1) / r]
 * @param {number} principal - Initial investment amount
 * @param {number} monthlyContribution - Monthly contribution amount
 * @param {number} annualRate - Annual rate of return (decimal)
 * @param {number} years - Number of years
 * @returns {number} Future value
 */
function calculateFutureValueWithContributions(principal, monthlyContribution, annualRate, years) {
  // Future value of initial investment
  const fvInitial = principal * Math.pow(1 + annualRate, years);

  // If no monthly contribution, return just the initial FV
  if (monthlyContribution === 0) {
    return fvInitial;
  }

  // Future value of monthly contributions (annuity)
  // Converting annual rate to monthly rate
  const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
  const months = years * 12;

  const fvContributions = monthlyContribution *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  return fvInitial + fvContributions;
}

/**
 * Calculate scenario outcomes (best, expected, worst case)
 * Using normal distribution approximation:
 * - Best case = 95th percentile (mean + 1.645 * stdDev)
 * - Expected = median (mean)
 * - Worst case = 5th percentile (mean - 1.645 * stdDev)
 *
 * @param {number} principal - Initial investment
 * @param {number} monthlyContribution - Monthly contribution
 * @param {object} strategy - Strategy object with avgReturn and volatility
 * @param {number} years - Investment time horizon
 * @returns {object} Scenario results
 */
function calculateScenarios(principal, monthlyContribution, strategy, years) {
  const { avgReturn, volatility } = strategy;

  // Calculate total amount invested
  const totalContributed = principal + (monthlyContribution * years * 12);

  // Expected case - use average return
  const expected = calculateFutureValueWithContributions(
    principal,
    monthlyContribution,
    avgReturn,
    years
  );

  // Adjust volatility for time period (volatility scales with sqrt of time)
  const timeAdjustedVolatility = volatility * Math.sqrt(years);

  // Calculate annualized returns for best and worst cases
  // Using +/- 1.645 standard deviations (90% confidence interval)
  const bestCaseReturn = Math.min(
    avgReturn + (1.645 * timeAdjustedVolatility / years),
    0.50  // Cap at 50% annual return
  );

  const worstCaseReturn = Math.max(
    avgReturn - (1.645 * timeAdjustedVolatility / years),
    -0.30 / years  // Floor at -30% total return
  );

  // Calculate future values for each scenario
  const bestCase = calculateFutureValueWithContributions(
    principal,
    monthlyContribution,
    bestCaseReturn,
    years
  );

  const worstCase = calculateFutureValueWithContributions(
    principal,
    monthlyContribution,
    worstCaseReturn,
    years
  );

  return {
    expected,
    bestCase,
    worstCase,
    totalContributed,
    totalGain: expected - totalContributed,
    avgAnnualReturn: avgReturn,
    scenarios: {
      expected: {
        value: expected,
        gain: expected - totalContributed,
        returnPercent: ((expected / totalContributed) - 1) * 100
      },
      best: {
        value: bestCase,
        gain: bestCase - totalContributed,
        returnPercent: ((bestCase / totalContributed) - 1) * 100
      },
      worst: {
        value: worstCase,
        gain: worstCase - totalContributed,
        returnPercent: ((worstCase / totalContributed) - 1) * 100
      }
    }
  };
}

/**
 * Calculate year-by-year projections for charting
 * @param {number} principal - Initial investment
 * @param {number} monthlyContribution - Monthly contribution
 * @param {object} strategy - Strategy object
 * @param {number} years - Total years
 * @returns {array} Array of year-by-year data
 */
function calculateYearByYear(principal, monthlyContribution, strategy, years) {
  const yearlyData = [];

  // Starting point (year 0)
  yearlyData.push({
    year: 0,
    expected: principal,
    best: principal,
    worst: principal
  });

  // Calculate for each year
  for (let year = 1; year <= years; year++) {
    const scenarios = calculateScenarios(
      principal,
      monthlyContribution,
      strategy,
      year
    );

    yearlyData.push({
      year,
      expected: scenarios.expected,
      best: scenarios.bestCase,
      worst: scenarios.worstCase
    });
  }

  return yearlyData;
}

/**
 * Calculate allocation amounts based on final value
 * @param {number} finalValue - Total investment value
 * @param {object} allocation - Allocation percentages
 * @returns {object} Allocation amounts
 */
function calculateAllocationAmounts(finalValue, allocation) {
  const amounts = {};
  for (const [key, percentage] of Object.entries(allocation)) {
    amounts[key] = finalValue * percentage;
  }
  return amounts;
}

/**
 * Compare all strategies with same parameters
 * @param {number} principal - Initial investment
 * @param {number} monthlyContribution - Monthly contribution
 * @param {number} years - Investment years
 * @returns {array} Comparison results for all strategies
 */
function compareStrategies(principal, monthlyContribution, years) {
  return strategies.map(strategy => {
    const results = calculateScenarios(principal, monthlyContribution, strategy, years);
    return {
      strategy: strategy.name,
      strategyId: strategy.id,
      finalValue: results.expected,
      totalGain: results.totalGain,
      avgReturn: strategy.avgReturn,
      riskLevel: strategy.riskLevel,
      volatility: strategy.volatility
    };
  });
}

/**
 * Easing function for animations
 * @param {number} t - Time progress (0-1)
 * @returns {number} Eased value
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animate a numeric value with counting effect
 * @param {string} elementId - ID of element to animate
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} duration - Animation duration in ms
 * @param {function} formatter - Function to format the value
 */
function animateValue(elementId, start, end, duration, formatter = formatCurrency) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const currentValue = start + (end - start) * easeOutCubic(progress);
    element.textContent = formatter(currentValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Export functions if in Node environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatCurrency,
    formatPercentage,
    calculateFutureValue,
    calculateFutureValueWithContributions,
    calculateScenarios,
    calculateYearByYear,
    calculateAllocationAmounts,
    compareStrategies,
    animateValue
  };
}
