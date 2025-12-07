# Deploy Without GitHub - Step by Step

## Option 1: Create GitHub Repo First (Recommended)

### Step 1: Create GitHub Repository

1. Go to: https://github.com
2. Sign up/Login
3. Click the "+" icon (top right) → "New repository"
4. Repository name: `emissions-dashboard`
5. Choose: **Public** or **Private**
6. **DO NOT** check "Initialize with README"
7. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open PowerShell in your project folder and run:

```powershell
cd C:\emissions-project

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Emissions Dashboard"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/emissions-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect to Railway

1. In Railway, after clicking "Deploy a new project"
2. Choose "Deploy from GitHub repo"
3. Authorize Railway to access GitHub
4. Select your `emissions-dashboard` repository
5. Set **Root Directory**: `backend`
6. Click "Deploy"

---

## Option 2: Use Railway CLI (Alternative)

If you prefer not to use GitHub:

1. Install Railway CLI:
   ```powershell
   npm install -g @railway/cli
   ```

2. Login:
   ```powershell
   railway login
   ```

3. Initialize project:
   ```powershell
   cd C:\emissions-project\backend
   railway init
   ```

4. Deploy:
   ```powershell
   railway up
   ```

---

## Quick GitHub Setup (If Git is installed)

If Git is installed on your system, I can help you push the code to GitHub right now!

