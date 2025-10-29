# Investment Calculator

A comprehensive web-based investment calculator that helps users project potential returns based on historical market data and different investment strategies.

## Features

- **4 Investment Strategies**: Conservative, Moderate, Aggressive, and Income-Focused
- **Scenario Analysis**: View best case, expected, and worst case projections
- **Interactive Charts**: Visualize growth over time and asset allocation
- **Monthly Contributions**: Calculate returns with regular monthly investments
- **Strategy Comparison**: Compare all strategies side-by-side
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Educational**: Based on historical market data and research

## Live Demo

[Add your deployed URL here after deployment]

## Project Structure

```
investment-calculator/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling
├── js/
│   ├── strategies.js      # Investment strategy configurations
│   ├── calculator.js      # Financial calculation functions
│   └── main.js           # Main application logic
└── README.md             # This file
```

## Investment Strategies

### Conservative (4-6% expected return)
- **Goal**: Capital preservation with modest growth
- **Risk Level**: Low
- **Time Horizon**: 1-5 years
- **Allocation**: 60% Bonds, 20% Money Market, 15% Dividend Stocks, 5% Commodities

### Moderate (6-8% expected return)
- **Goal**: Balanced growth with manageable risk
- **Risk Level**: Medium
- **Time Horizon**: 5-15 years
- **Allocation**: 50% Stocks, 30% Bonds, 10% REITs, 10% International

### Aggressive (8-10% expected return)
- **Goal**: Maximum long-term growth
- **Risk Level**: High
- **Time Horizon**: 15+ years
- **Allocation**: 70% Stocks, 15% International, 10% Alternatives, 5% Bonds

### Income-Focused (7-11% expected return)
- **Goal**: Regular cash flow generation
- **Risk Level**: Medium
- **Time Horizon**: 5+ years
- **Allocation**: 40% Dividend Stocks, 30% REITs, 20% Bonds, 10% Preferred Stocks

## How to Use

1. **Choose a Strategy**: Select from Conservative, Moderate, Aggressive, or Income-Focused
2. **Enter Investment Amount**:
   - Initial investment ($100 - $1,000,000)
   - Optional monthly contribution ($0 - $10,000)
3. **Select Timeline**: Choose 1, 5, 10, 20, or 30 years (or enter custom)
4. **Calculate**: Click "Calculate Returns" to see your projections
5. **Review Results**:
   - View expected final value
   - See best and worst case scenarios
   - Analyze growth chart
   - Review asset allocation
6. **Compare**: Click "Compare All Strategies" to see side-by-side comparison

## Calculations

### Future Value Formula
The calculator uses compound interest formulas:

**Without monthly contributions:**
```
FV = PV × (1 + r)^t
```

**With monthly contributions:**
```
FV = PV(1+r)^t + PMT × [((1+r)^t - 1) / r]
```

Where:
- FV = Future Value
- PV = Present Value (initial investment)
- PMT = Monthly Payment (contribution)
- r = Annual rate of return
- t = Time in years

### Scenario Analysis
- **Expected Case**: Uses historical average return
- **Best Case**: 95th percentile (mean + 1.645 × standard deviation)
- **Worst Case**: 5th percentile (mean - 1.645 × standard deviation)

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling with CSS variables and responsive design
- **JavaScript (ES6+)**: Application logic and calculations
- **Chart.js**: Interactive charts and visualizations
- **No frameworks**: Pure vanilla JavaScript for maximum compatibility

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process or dependencies required!

```bash
# If you have Python installed, you can run a local server:
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)
1. Create a free Netlify account
2. Drag and drop the `investment-calculator` folder
3. Your site will be live instantly with a custom URL

### Option 3: Vercel (Free)
1. Create a free Vercel account
2. Import your GitHub repository or upload files
3. Deploy with one click

### Option 4: Surge (Free)
```bash
npm install -g surge
cd investment-calculator
surge
```

## Customization

### Change Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
  --primary-blue: #2563eb;
  --success-green: #10b981;
  /* Add your custom colors */
}
```

### Modify Strategies
Edit `js/strategies.js` to adjust returns, allocations, or add new strategies:
```javascript
{
  id: 'custom',
  name: 'Custom Strategy',
  avgReturn: 0.08,
  volatility: 0.15,
  // ... more config
}
```

### Adjust Calculation Logic
Modify functions in `js/calculator.js` to change calculation methods.

## Disclaimer

**IMPORTANT**: This calculator is for educational purposes only and should not be considered financial advice.

- Past performance does not guarantee future results
- Investment returns are projections based on historical data
- Actual returns will vary and may be significantly different
- Consult with a licensed financial advisor before making investment decisions
- Consider your personal financial situation, goals, and risk tolerance

## Data Sources

Calculations are based on:
- Historical market data (1926-2024)
- S&P 500 index returns
- Bond market historical performance
- Real estate investment trust (REIT) data
- Academic investment research

## Credits

- Design and development: [Your Name]
- Based on: Investment Approaches Comparison Framework
- Charts powered by: Chart.js
- Icons: Unicode emoji

## License

MIT License - Feel free to use and modify for personal or commercial projects.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Bug fixes
- Feature enhancements
- Documentation improvements
- Additional investment strategies

## Support

For questions or issues:
- Open a GitHub issue
- Contact: [Your Email]

## Changelog

### Version 1.0.0 (2025-10-29)
- Initial release
- 4 investment strategies
- Scenario analysis
- Interactive charts
- Strategy comparison
- Responsive design

---

Made with ❤️ for investors everywhere
