# Deployment Guide
## How to Deploy Your Investment Calculator and Get a Public Link

This guide provides step-by-step instructions for deploying your investment calculator to the internet. All options listed are **FREE** and require no credit card.

---

## Table of Contents
1. [Quick Start - Test Locally](#quick-start---test-locally)
2. [Option 1: GitHub Pages (Recommended)](#option-1-github-pages-recommended)
3. [Option 2: Netlify (Easiest)](#option-2-netlify-easiest)
4. [Option 3: Vercel](#option-3-vercel)
5. [Option 4: Surge](#option-4-surge)
6. [Backup Your Code](#backup-your-code)

---

## Quick Start - Test Locally

Before deploying, test the calculator on your local machine:

### Method 1: Open Directly in Browser
1. Navigate to the `investment-calculator` folder
2. Double-click `index.html`
3. The calculator should open in your default browser

### Method 2: Using Python Local Server (Recommended)
```bash
# Navigate to the investment-calculator directory
cd "C:\Claude\AI Training\BMAD-METHOD\investment-calculator"

# Start local server (Python 3)
python -m http.server 8000

# Open in browser: http://localhost:8000
```

### Method 3: Using Node.js http-server
```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to directory
cd "C:\Claude\AI Training\BMAD-METHOD\investment-calculator"

# Start server
http-server

# Open in browser: http://localhost:8080
```

---

## Option 1: GitHub Pages (Recommended)

**Best for**: Version control, free hosting, custom domains, long-term projects

**What you'll get**: `https://yourusername.github.io/investment-calculator`

### Step-by-Step Instructions:

#### 1. Create a GitHub Account (if you don't have one)
- Go to [github.com](https://github.com)
- Click "Sign up"
- Follow the registration process

#### 2. Create a New Repository
1. Click the "+" icon in top right → "New repository"
2. Repository name: `investment-calculator` (or any name you prefer)
3. Description: "Investment calculator with projections and analysis"
4. Select "Public"
5. Check "Add a README file" (optional)
6. Click "Create repository"

#### 3. Upload Your Files

**Option A: Via GitHub Web Interface (Easy)**
1. In your new repository, click "Add file" → "Upload files"
2. Drag and drop these files/folders:
   - `index.html`
   - `css/` folder (with styles.css inside)
   - `js/` folder (with all .js files inside)
   - `README.md`
3. Add commit message: "Initial commit - Investment calculator"
4. Click "Commit changes"

**Option B: Via Git Command Line (Advanced)**
```bash
# Navigate to your investment-calculator folder
cd "C:\Claude\AI Training\BMAD-METHOD\investment-calculator"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Investment calculator"

# Add remote repository (replace with your username and repo name)
git remote add origin https://github.com/yourusername/investment-calculator.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 4. Enable GitHub Pages
1. In your repository, click "Settings"
2. Scroll down to "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait 1-2 minutes for deployment
6. Your site will be live at: `https://yourusername.github.io/investment-calculator`

#### 5. Test Your Site
- Click the provided URL
- Test all calculator functions
- Try on mobile devices

### Updating Your Site (After Initial Deployment)
When you make changes:
1. Edit your local files
2. Upload changes to GitHub (via web interface or git commands)
3. GitHub Pages will automatically rebuild (takes 1-2 minutes)

---

## Option 2: Netlify (Easiest)

**Best for**: Instant deployment, drag-and-drop, automatic SSL

**What you'll get**: `https://your-site-name.netlify.app` (customizable)

### Step-by-Step Instructions:

#### 1. Create a Netlify Account
- Go to [netlify.com](https://netlify.com)
- Click "Sign up"
- Sign up with GitHub, GitLab, Bitbucket, or email

#### 2. Deploy via Drag and Drop

**Method A: Drag and Drop (Easiest)**
1. After logging in, you'll see "Want to deploy a new site without connecting to Git? Drag and drop your site folder here"
2. Open Windows Explorer
3. Navigate to `C:\Claude\AI Training\BMAD-METHOD\investment-calculator`
4. Drag the ENTIRE `investment-calculator` folder onto the Netlify page
5. Wait 10-30 seconds for deployment
6. Done! Your site is live

**Method B: Manual Upload**
1. Click "Add new site" → "Deploy manually"
2. Drag and drop the `investment-calculator` folder
3. Wait for deployment
4. Your site is live!

#### 3. Customize Your URL (Optional)
1. Click "Site settings"
2. Click "Change site name"
3. Enter your preferred name: `my-investment-calc`
4. Your new URL: `https://my-investment-calc.netlify.app`

#### 4. Set Up Custom Domain (Optional)
1. Buy a domain from any registrar (Namecheap, GoDaddy, etc.)
2. In Netlify: "Domain settings" → "Add custom domain"
3. Follow the instructions to update your domain's DNS settings
4. Your site will be accessible at your custom domain

### Updating Your Site
1. Make changes to your local files
2. Drag and drop the updated folder to Netlify
3. New version deployed instantly!

---

## Option 3: Vercel

**Best for**: Fast deployment, great performance, modern tooling

**What you'll get**: `https://investment-calculator.vercel.app` (customizable)

### Step-by-Step Instructions:

#### 1. Create a Vercel Account
- Go to [vercel.com](https://vercel.com)
- Click "Sign up"
- Sign up with GitHub, GitLab, or Bitbucket (recommended)

#### 2. Deploy Your Project

**Method A: Via GitHub (Recommended)**
1. First, push your code to GitHub (see GitHub Pages section)
2. In Vercel, click "Add New" → "Project"
3. Click "Import" next to your repository
4. Click "Deploy"
5. Wait 1-2 minutes
6. Your site is live!

**Method B: Via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to your project
cd "C:\Claude\AI Training\BMAD-METHOD\investment-calculator"

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

#### 3. Customize Your URL
1. In your project dashboard
2. Click "Settings" → "Domains"
3. Add a custom domain or modify the Vercel subdomain

### Updating Your Site
If deployed via GitHub:
- Push changes to GitHub
- Vercel automatically rebuilds and deploys

If deployed via CLI:
- Run `vercel --prod` again

---

## Option 4: Surge

**Best for**: Command-line users, simple static sites

**What you'll get**: `https://investment-calculator.surge.sh` (customizable)

### Step-by-Step Instructions:

#### 1. Install Surge
```bash
# Install Surge globally
npm install -g surge
```

#### 2. Deploy Your Site
```bash
# Navigate to your project
cd "C:\Claude\AI Training\BMAD-METHOD\investment-calculator"

# Deploy (follow prompts)
surge

# When prompted:
# - Project path: press Enter (current directory)
# - Domain: enter your preferred subdomain or press Enter for random
```

#### 3. Your Site is Live!
- Surge will provide your URL: `https://your-subdomain.surge.sh`
- Write down or bookmark this URL

### Updating Your Site
```bash
# Navigate to project directory
cd "C:\Claude\AI Training\BMAD-METHOD\investment-calculator"

# Deploy again (uses same domain)
surge
```

---

## Backup Your Code

### Option 1: ZIP Archive
```bash
# Navigate to parent directory
cd "C:\Claude\AI Training\BMAD-METHOD"

# On Windows, right-click investment-calculator folder
# Select "Send to" → "Compressed (zipped) folder"

# Or use command line with 7-Zip or PowerShell:
Compress-Archive -Path investment-calculator -DestinationPath investment-calculator-backup.zip
```

### Option 2: GitHub (Best Option)
- Your code is automatically backed up on GitHub
- Version history preserved
- Can rollback to any previous version

### Option 3: Cloud Storage
- Copy the `investment-calculator` folder to:
  - Google Drive
  - Dropbox
  - OneDrive
  - iCloud

---

## Comparison Table

| Feature | GitHub Pages | Netlify | Vercel | Surge |
|---------|-------------|---------|--------|-------|
| **Ease of Setup** | Medium | Easiest | Easy | Easy |
| **Deployment Method** | Git | Drag-drop / Git | Git / CLI | CLI |
| **Build Time** | 1-2 min | 10-30 sec | 1-2 min | Instant |
| **Custom Domain** | Yes (free) | Yes (free) | Yes (free) | Yes (paid) |
| **SSL Certificate** | Yes | Yes | Yes | Yes |
| **Bandwidth** | Unlimited | 100GB/mo | Unlimited | Unlimited |
| **Version Control** | Yes | Optional | Yes | No |
| **Best For** | Developers | Beginners | React/Next.js | Quick deploys |

---

## Recommended Workflow

### For Beginners:
1. **Test locally** first (open index.html in browser)
2. **Deploy to Netlify** (drag and drop)
3. **Set up GitHub** later for version control

### For Developers:
1. **Push to GitHub** first (version control)
2. **Deploy via GitHub Pages or Vercel**
3. **Enable auto-deployment** for easy updates

---

## Troubleshooting

### Issue: Files not loading properly
**Solution**: Check that your file structure is correct:
```
investment-calculator/
├── index.html          (in root)
├── css/
│   └── styles.css
└── js/
    ├── strategies.js
    ├── calculator.js
    └── main.js
```

### Issue: Charts not showing
**Solution**:
- Check browser console for errors (F12)
- Ensure Chart.js CDN is loading
- Check internet connection

### Issue: GitHub Pages not updating
**Solution**:
- Wait 2-3 minutes after push
- Clear browser cache (Ctrl+Shift+R)
- Check GitHub Actions tab for build status

### Issue: Custom domain not working
**Solution**:
- DNS changes can take 24-48 hours
- Verify DNS records are correct
- Check SSL certificate status

---

## Next Steps After Deployment

1. **Test thoroughly**
   - Test on different browsers
   - Test on mobile devices
   - Test all calculator functions

2. **Share your link**
   - Add to your resume/portfolio
   - Share on social media
   - Send to friends and colleagues

3. **Monitor usage** (optional)
   - Add Google Analytics
   - Set up error tracking
   - Monitor performance

4. **Keep improving**
   - Add new features
   - Fix bugs
   - Update investment data

---

## Need Help?

- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Surge**: [surge.sh/help](https://surge.sh/help)

---

## Security Notes

- All calculations are done client-side (in the browser)
- No user data is stored or transmitted
- No backend server required
- SSL is automatically provided by all hosting platforms

---

**Congratulations!** Once deployed, your investment calculator will be accessible to anyone with the link. Share it proudly!
