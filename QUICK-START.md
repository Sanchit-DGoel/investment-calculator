# Quick Start Guide

## Test Your Calculator in 3 Simple Steps

### Step 1: Open the Calculator
Navigate to the `investment-calculator` folder and double-click `index.html`

The calculator will open in your default web browser!

### Step 2: Try It Out
1. Select a strategy (default is "Aggressive")
2. Enter an amount (default: $10,000 initial + $500/month)
3. Choose a timeline (default: 10 years)
4. Click "Calculate Returns"

### Step 3: Explore Features
- View your projected investment value
- See best/worst case scenarios
- Check the growth chart
- Review asset allocation
- Compare all strategies

---

## What You Should See

### Initial Investment Value After 10 Years:
- **Conservative**: ~$145,000
- **Moderate**: ~$167,000
- **Aggressive**: ~$188,000
- **Income-Focused**: ~$179,000

(Results are for $10,000 initial + $500/month over 10 years)

---

## Next Steps

### Want to Deploy Online?
See `DEPLOYMENT-GUIDE.md` for detailed instructions

### Want to Create a Backup?
- **Windows**: Double-click `create-backup.bat`
- **Manual**: Right-click folder → Send to → Compressed (zipped) folder

### Want to Customize?
- **Colors**: Edit `css/styles.css` (line 7-30)
- **Strategies**: Edit `js/strategies.js`
- **Calculations**: Edit `js/calculator.js`

---

## Troubleshooting

### Calculator Not Working?
1. Make sure you opened `index.html` in a web browser
2. Check that all files are in the correct folders:
   ```
   investment-calculator/
   ├── index.html
   ├── css/styles.css
   └── js/ (all 3 JavaScript files)
   ```
3. Try a different browser (Chrome, Firefox, Edge)

### Charts Not Showing?
- Check your internet connection (Chart.js loads from CDN)
- Wait a few seconds for charts to load
- Refresh the page (F5)

---

## File Overview

| File | Purpose |
|------|---------|
| `index.html` | Main calculator page |
| `css/styles.css` | All styling and design |
| `js/strategies.js` | Investment strategy configurations |
| `js/calculator.js` | Financial calculation functions |
| `js/main.js` | User interface logic |
| `README.md` | Full documentation |
| `DEPLOYMENT-GUIDE.md` | How to get online |
| `QUICK-START.md` | This file |
| `create-backup.bat` | Automatic backup creator |

---

## Need Help?

1. Read the full `README.md` for detailed information
2. Check `DEPLOYMENT-GUIDE.md` for deployment help
3. Review the code comments in each JavaScript file

---

**Enjoy your investment calculator!** 🎉📊💰
