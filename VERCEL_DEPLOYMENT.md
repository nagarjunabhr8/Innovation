## Vercel Deployment Guide

This document explains how to properly deploy the ugadi-form project to Vercel.

### Prerequisites
- ✅ Code pushed to GitHub: `nagarjunabhr8/Innovation`
- ✅ Vercel project created: `nagarjunabeharas-projects/innovation`
- ✅ GitHub connected to Vercel

### Configuration Status

#### ✅ Already Configured in Code
- **SPREADSHEET_ID**: Properly set in `vercel.json`
- **node_modules**: Properly excluded in `.gitignore`
- **Build Configuration**: Configured in `vercel.json`

#### ❌ Requires Manual Setup in Vercel Dashboard

### Step-by-Step Deployment Instructions

#### 1. Add GOOGLE_CREDENTIALS to Vercel

Run the helper script to view your credentials:
```bash
node setup-vercel-env.js
```

Then follow these steps:

1. Navigate to: https://vercel.com/nagarjunabeharas-projects/innovation
2. Go to **Settings** → **Environment Variables**
3. Click **"Add New Environment Variable"**
4. Fill in:
   - **Name**: `GOOGLE_CREDENTIALS`
   - **Value**: Copy the entire JSON object from `setup-vercel-env.js` output
   - **Environment**: Select "All Environments"
5. Click **Save**

#### 2. Verify SPREADSHEET_ID is Set

In the same Environment Variables section, verify:
- **Name**: `SPREADSHEET_ID`
- **Value**: `1tfdx9_c7U9y-tLQRdLt_AD-9cho-8O0wdUmlZszR0VI`

If not present, add it following the same steps as above.

#### 3. Trigger Deployment

**Option A: Automatic (Recommended)**
```bash
git push origin main
```
Vercel will automatically detect the push and deploy.

**Option B: Manual Redeploy**
1. Go to **Deployments** tab in your Vercel project
2. Find the latest commit
3. Click **Redeploy**

#### 4. Monitor Deployment

1. Watch the build logs for any errors
2. Once successful, you'll get a deployment URL
3. Test the form at: `https://innovation-nagarjunabeharas-projects.vercel.app`

### Troubleshooting

#### Build Fails with SPREADSHEET_ID Error
```
Error: Environment Variable "SPREADSHEET_ID" references Secret "spreadsheet_id", which does not exist.
```
**Solution**: Add SPREADSHEET_ID in Vercel Environment Variables (see Step 2 above)

#### Build Fails with Google Credentials Error
```
Error: Failed to initialize Google Sheets API
```
**Solution**: Verify GOOGLE_CREDENTIALS is properly set as full JSON (see Step 1 above)

#### node_modules in Repository
**Solution**: Already configured - node_modules is in `.gitignore`, so it won't be committed

### File Locations

- **Environment Config**: [vercel.json](vercel.json)
- **Setup Helper**: [setup-vercel-env.js](setup-vercel-env.js)
- **Git Ignore**: [.gitignore](.gitignore)

### Testing Locally Before Deployment

```bash
# Install dependencies
npm install

# Create .env file (optional for local testing)
cp .env.example .env

# Run locally
npm start
```

The server will start at `http://localhost:3000`

### Support

For issues with Google Sheets integration, check:
- Credentials validity in `credentials.json`
- Service account has access to the spreadsheet
- Spreadsheet ID matches the one in `vercel.json`
