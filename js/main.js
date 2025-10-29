// Main Application Logic
// Handles user interactions and orchestrates calculations

// Application state
const state = {
  selectedStrategy: 'aggressive',  // Default selection
  initialAmount: 10000,
  monthlyContribution: 500,
  years: 10,
  results: null,
  charts: {
    growth: null,
    allocation: null
  }
};

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeStrategySelector();
  initializeInputs();
  initializeTimePeriodSelector();
  initializeCalculateButton();
  initializeComparisonButton();
});

/**
 * Initialize strategy selector cards
 */
function initializeStrategySelector() {
  const container = document.getElementById('strategy-selector');
  if (!container) return;

  strategies.forEach(strategy => {
    const card = createStrategyCard(strategy);
    card.addEventListener('click', () => selectStrategy(strategy.id));
    container.appendChild(card);
  });

  // Select default strategy
  selectStrategy(state.selectedStrategy);
}

/**
 * Create a strategy card element
 */
function createStrategyCard(strategy) {
  const card = document.createElement('div');
  card.className = 'strategy-card';
  card.dataset.strategyId = strategy.id;

  card.innerHTML = `
    <div class="strategy-header">
      <h4>${strategy.name}</h4>
      <span class="info-icon" title="${strategy.description}">ⓘ</span>
    </div>
    <p class="strategy-return">${strategy.expectedReturnRange} avg</p>
    <p class="strategy-risk">Risk: ${strategy.riskLevel}</p>
    <p class="strategy-description">${strategy.description}</p>
  `;

  return card;
}

/**
 * Select a strategy
 */
function selectStrategy(strategyId) {
  state.selectedStrategy = strategyId;

  // Update UI
  document.querySelectorAll('.strategy-card').forEach(card => {
    if (card.dataset.strategyId === strategyId) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });
}

/**
 * Initialize amount inputs (initial and monthly)
 */
function initializeInputs() {
  // Initial amount input and slider
  const initialInput = document.getElementById('initial-amount');
  const initialSlider = document.getElementById('initial-slider');

  if (initialInput && initialSlider) {
    initialInput.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value.replace(/[^0-9]/g, ''));
      if (!isNaN(value) && value >= 100 && value <= 1000000) {
        state.initialAmount = value;
        initialSlider.value = value;
      }
      initialInput.value = formatCurrency(state.initialAmount);
    });

    initialInput.addEventListener('blur', (e) => {
      initialInput.value = formatCurrency(state.initialAmount);
    });

    initialSlider.addEventListener('input', (e) => {
      state.initialAmount = parseFloat(e.target.value);
      initialInput.value = formatCurrency(state.initialAmount);
    });
  }

  // Monthly contribution input and slider
  const monthlyInput = document.getElementById('monthly-contribution');
  const monthlySlider = document.getElementById('monthly-slider');

  if (monthlyInput && monthlySlider) {
    monthlyInput.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value.replace(/[^0-9]/g, ''));
      if (!isNaN(value) && value >= 0 && value <= 10000) {
        state.monthlyContribution = value;
        monthlySlider.value = value;
      }
      monthlyInput.value = formatCurrency(state.monthlyContribution);
    });

    monthlyInput.addEventListener('blur', (e) => {
      monthlyInput.value = formatCurrency(state.monthlyContribution);
    });

    monthlySlider.addEventListener('input', (e) => {
      state.monthlyContribution = parseFloat(e.target.value);
      monthlyInput.value = formatCurrency(state.monthlyContribution);
    });
  }
}

/**
 * Initialize time period selector
 */
function initializeTimePeriodSelector() {
  const buttons = document.querySelectorAll('.period-btn');
  const customInput = document.getElementById('custom-years');

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const years = parseInt(e.target.dataset.years);
      selectTimePeriod(years);
      if (customInput) customInput.value = '';
    });
  });

  if (customInput) {
    customInput.addEventListener('change', (e) => {
      const years = parseInt(e.target.value);
      if (years >= 1 && years <= 50) {
        selectTimePeriod(years);
        // Remove active class from preset buttons
        buttons.forEach(btn => btn.classList.remove('active'));
      }
    });
  }
}

/**
 * Select time period
 */
function selectTimePeriod(years) {
  state.years = years;

  // Update button states
  document.querySelectorAll('.period-btn').forEach(btn => {
    if (parseInt(btn.dataset.years) === years) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Initialize calculate button
 */
function initializeCalculateButton() {
  const button = document.getElementById('calculate-btn');
  if (button) {
    button.addEventListener('click', calculateAndDisplay);
  }

  const recalculateBtn = document.getElementById('recalculate-btn');
  if (recalculateBtn) {
    recalculateBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Initialize comparison button
 */
function initializeComparisonButton() {
  const compareBtn = document.getElementById('compare-btn');
  if (compareBtn) {
    compareBtn.addEventListener('click', showComparison);
  }

  const hideComparisonBtn = document.getElementById('hide-comparison-btn');
  if (hideComparisonBtn) {
    hideComparisonBtn.addEventListener('click', () => {
      document.getElementById('comparison').style.display = 'none';
    });
  }
}

/**
 * Main calculation and display function
 */
function calculateAndDisplay() {
  // Get selected strategy
  const strategy = strategies.find(s => s.id === state.selectedStrategy);
  if (!strategy) return;

  // Perform calculations
  state.results = calculateScenarios(
    state.initialAmount,
    state.monthlyContribution,
    strategy,
    state.years
  );

  // Display results
  displayPrimaryResults(state.results, strategy);
  displayScenarios(state.results);
  createGrowthChart(state.results, strategy);
  createAllocationChart(state.results, strategy);

  // Show results section
  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Hide comparison if it was showing
  document.getElementById('comparison').style.display = 'none';
}

/**
 * Display primary results
 */
function displayPrimaryResults(results, strategy) {
  // Update years display
  const yearsDisplay = document.getElementById('years-display');
  if (yearsDisplay) yearsDisplay.textContent = state.years;

  // Animate final value
  animateValue('final-value', 0, results.expected, 1500);

  // Update other values
  const totalInvested = document.getElementById('total-invested');
  if (totalInvested) totalInvested.textContent = formatCurrency(results.totalContributed);

  const totalGain = document.getElementById('total-gain');
  if (totalGain) {
    totalGain.textContent = formatCurrency(results.totalGain);
    totalGain.className = results.totalGain >= 0 ? 'gain-positive' : 'gain-negative';
  }

  const gainPercent = document.getElementById('gain-percent');
  if (gainPercent) {
    gainPercent.textContent = formatPercentage(results.totalGain / results.totalContributed);
  }

  const avgReturn = document.getElementById('avg-return');
  if (avgReturn) {
    avgReturn.textContent = formatPercentage(strategy.avgReturn);
  }
}

/**
 * Display scenario analysis
 */
function displayScenarios(results) {
  const container = document.getElementById('scenario-display');
  if (!container) return;

  const showBest = document.getElementById('show-best')?.checked !== false;
  const showExpected = document.getElementById('show-expected')?.checked !== false;
  const showWorst = document.getElementById('show-worst')?.checked !== false;

  const scenarios = [
    {
      type: 'best',
      icon: '📈',
      title: 'Best Case',
      subtitle: '95th percentile',
      data: results.scenarios.best,
      show: showBest
    },
    {
      type: 'expected',
      icon: '📊',
      title: 'Expected Case',
      subtitle: 'Median projection',
      data: results.scenarios.expected,
      show: showExpected
    },
    {
      type: 'worst',
      icon: '📉',
      title: 'Worst Case',
      subtitle: '5th percentile',
      data: results.scenarios.worst,
      show: showWorst
    }
  ];

  container.innerHTML = '';

  scenarios.forEach(scenario => {
    if (!scenario.show) return;

    const card = document.createElement('div');
    card.className = `scenario-card ${scenario.type}`;
    card.innerHTML = `
      <div class="scenario-header">
        <div>
          <div class="scenario-icon">${scenario.icon}</div>
        </div>
        <div>
          <div class="scenario-title">${scenario.title}</div>
          <div class="scenario-subtitle">${scenario.subtitle}</div>
        </div>
      </div>
      <div class="scenario-value">${formatCurrency(scenario.data.value)}</div>
      <div class="scenario-gain">
        Gain: ${formatCurrency(scenario.data.gain)}
        (${scenario.data.returnPercent >= 0 ? '+' : ''}${scenario.data.returnPercent.toFixed(1)}%)
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Create growth over time chart
 */
function createGrowthChart(results, strategy) {
  const canvas = document.getElementById('growth-chart');
  if (!canvas) return;

  // Destroy existing chart
  if (state.charts.growth) {
    state.charts.growth.destroy();
  }

  // Get year-by-year data
  const yearlyData = calculateYearByYear(
    state.initialAmount,
    state.monthlyContribution,
    strategy,
    state.years
  );

  // Check which scenarios to show
  const showBest = document.getElementById('show-best')?.checked !== false;
  const showExpected = document.getElementById('show-expected')?.checked !== false;
  const showWorst = document.getElementById('show-worst')?.checked !== false;

  // Prepare datasets
  const datasets = [];

  if (showExpected) {
    datasets.push({
      label: 'Expected',
      data: yearlyData.map(d => d.expected),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      borderWidth: 3,
      fill: false,
      tension: 0.4
    });
  }

  if (showBest) {
    datasets.push({
      label: 'Best Case',
      data: yearlyData.map(d => d.best),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      borderDash: [5, 5],
      fill: false,
      tension: 0.4
    });
  }

  if (showWorst) {
    datasets.push({
      label: 'Worst Case',
      data: yearlyData.map(d => d.worst),
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderWidth: 2,
      borderDash: [5, 5],
      fill: false,
      tension: 0.4
    });
  }

  const ctx = canvas.getContext('2d');
  state.charts.growth = new Chart(ctx, {
    type: 'line',
    data: {
      labels: yearlyData.map(d => `Year ${d.year}`),
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context) => {
              return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => formatCurrency(value)
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  });
}

/**
 * Create allocation pie chart
 */
function createAllocationChart(results, strategy) {
  const canvas = document.getElementById('allocation-chart');
  if (!canvas) return;

  // Destroy existing chart
  if (state.charts.allocation) {
    state.charts.allocation.destroy();
  }

  // Calculate allocation amounts
  const amounts = calculateAllocationAmounts(results.expected, strategy.allocation);

  // Prepare data
  const allocationData = Object.entries(strategy.allocation);
  const labels = allocationData.map(([key]) => strategy.allocationLabels[key]);
  const values = allocationData.map(([_, value]) => value * 100);

  const ctx = canvas.getContext('2d');
  state.charts.allocation = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: allocationColors,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const percentage = context.parsed;
              const key = Object.keys(strategy.allocation)[context.dataIndex];
              const amount = amounts[key];
              return `${context.label}: ${percentage.toFixed(1)}% (${formatCurrency(amount)})`;
            }
          }
        }
      }
    }
  });

  // Display strategy name
  const strategyNameDisplay = document.getElementById('strategy-name-display');
  if (strategyNameDisplay) {
    strategyNameDisplay.textContent = `${strategy.name} Strategy Allocation`;
  }

  // Display allocation details as list
  displayAllocationDetails(allocationData, amounts, strategy);
}

/**
 * Display allocation details as text list
 */
function displayAllocationDetails(allocationData, amounts, strategy) {
  const container = document.getElementById('allocation-details');
  if (!container) return;

  container.innerHTML = '';

  allocationData.forEach(([key, percentage], index) => {
    const item = document.createElement('div');
    item.className = 'allocation-item';
    item.innerHTML = `
      <div class="allocation-label">
        <div class="allocation-color" style="background-color: ${allocationColors[index]}"></div>
        <span class="allocation-name">${strategy.allocationLabels[key]}</span>
      </div>
      <div>
        <span class="allocation-percentage">${(percentage * 100).toFixed(0)}%</span>
        <span class="allocation-amount">${formatCurrency(amounts[key])}</span>
      </div>
    `;
    container.appendChild(item);
  });
}

/**
 * Show strategy comparison
 */
function showComparison() {
  const comparison = compareStrategies(
    state.initialAmount,
    state.monthlyContribution,
    state.years
  );

  displayComparisonTable(comparison);

  const comparisonSection = document.getElementById('comparison');
  if (comparisonSection) {
    comparisonSection.style.display = 'block';
    comparisonSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Display comparison table
 */
function displayComparisonTable(comparison) {
  const tbody = document.getElementById('comparison-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  comparison.forEach(item => {
    const row = document.createElement('tr');
    if (item.strategyId === state.selectedStrategy) {
      row.classList.add('selected');
    }

    const riskClass = item.riskLevel === 'Low' ? 'risk-low' :
                      item.riskLevel === 'Medium' ? 'risk-medium' : 'risk-high';

    row.innerHTML = `
      <td><strong>${item.strategy}</strong></td>
      <td>${formatCurrency(item.finalValue)}</td>
      <td>${formatCurrency(item.totalGain)}</td>
      <td>${formatPercentage(item.avgReturn)}</td>
      <td><span class="risk-badge ${riskClass}">${item.riskLevel}</span></td>
      <td>${formatPercentage(item.volatility)}</td>
    `;

    tbody.appendChild(row);
  });
}

