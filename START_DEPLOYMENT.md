# 🚀 Start Deployment - Follow These Steps

## ✅ What I've Prepared For You

1. ✅ Environment configuration files
2. ✅ Updated services to use environment variables
3. ✅ Deployment configuration files (Dockerfile, Procfile, netlify.toml)
4. ✅ CORS ready for production

## 📋 Step-by-Step Deployment

### PART 1: Deploy Backend (15 minutes)

#### Option A: Railway (Easiest - Recommended)

1. **Go to**: https://railway.app
2. **Sign up** (free account)
3. **Click**: "New Project"
4. **Choose**: "Deploy from GitHub repo" (if you have Git) OR "Empty Project"

**If using GitHub:**
- Connect GitHub account
- Select your repository
- Set **Root Directory**: `backend`
- Railway auto-detects Spring Boot
- Click "Deploy"

**If using Empty Project:**
- Click "Add Service" → "GitHub Repo"
- Or upload the `backend` folder manually
- Set root directory to `backend`

5. **Wait** 2-5 minutes for deployment
6. **Copy the URL** (e.g., `https://emissions-backend.railway.app`)
7. **Save this URL** - you'll need it for frontend!

#### Option B: Render

1. Go to: https://render.com
2. Sign up
3. "New" → "Web Service"
4. Connect GitHub or upload `backend` folder
5. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/emissions-dashboard-1.0.0.jar`
6. Deploy!

---

### PART 2: Update Frontend API URL

Once you have your backend URL:

1. **Open**: `frontend/src/environments/environment.prod.ts`
2. **Replace** `${API_URL}` with your actual backend URL:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-backend.railway.app/api'  // ← Your URL here
   };
   ```
3. **Save the file**

---

### PART 3: Build Frontend

```powershell
cd C:\emissions-project\frontend
npm run build
```

This creates: `frontend\dist\emissions-dashboard` folder

**If build fails**, try:
```powershell
npm install --legacy-peer-deps
npm run build
```

---

### PART 4: Deploy Frontend (10 minutes)

#### Option A: Netlify (Easiest)

1. **Go to**: https://app.netlify.com
2. **Sign up/Login** (free)
3. **Drag and drop** the folder: `C:\emissions-project\frontend\dist\emissions-dashboard`
4. **Wait** 1-2 minutes
5. **Copy the URL** (e.g., `https://emissions-dashboard.netlify.app`)

#### Option B: Vercel

1. Go to: https://vercel.com
2. Sign up
3. "Add New Project"
4. Drag and drop `frontend\dist\emissions-dashboard` folder
5. Deploy!

---

### PART 5: Update CORS in Backend

Once you have both URLs:

1. **Backend URL**: `https://your-backend.railway.app`
2. **Frontend URL**: `https://your-frontend.netlify.app`

**Update CORS:**

1. Open: `backend/src/main/java/com/emissions/controller/EmissionsController.java`
2. Change line 14:
   ```java
   @CrossOrigin(origins = "https://your-frontend.netlify.app")
   ```
3. Open: `backend/src/main/java/com/emissions/controller/ChatController.java`
4. Change line 10:
   ```java
   @CrossOrigin(origins = "https://your-frontend.netlify.app")
   ```
5. **Redeploy backend** (push to GitHub or redeploy on Railway)

---

### PART 6: Test Everything

1. **Test Backend**:
   - Visit: `https://your-backend.railway.app/api/emissions`
   - Should show JSON data

2. **Test Frontend**:
   - Visit: `https://your-frontend.netlify.app`
   - Dashboard should load
   - Charts should display

3. **Test Chat**:
   - Type: "Show emissions by industry"
   - Should get response

4. **Test Internet Search**:
   - Enable "Search Internet" checkbox
   - Ask: "latest emissions news"

---

## 🎯 Quick Checklist

- [ ] Backend deployed (Railway/Render)
- [ ] Backend URL saved
- [ ] Frontend `environment.prod.ts` updated with backend URL
- [ ] Frontend built (`npm run build`)
- [ ] Frontend deployed (Netlify/Vercel)
- [ ] Frontend URL saved
- [ ] CORS updated in backend controllers
- [ ] Backend redeployed with new CORS
- [ ] Everything tested and working

---

## 📧 Ready to Submit!

Once everything works:

**Email Template:**
```
Subject: HackForward 2025 Round 2 Submission - Emissions Dashboard

Dear Stride Labs Team,

I have completed the Round 2 task. Here are the details:

Frontend URL: https://your-frontend.netlify.app
Backend API: https://your-backend.railway.app

Repository: [GitHub URL if available]

Features Implemented:
✅ Dashboard showing emissions from different industries and sectors
✅ Chat panel for user interaction and questions
✅ Internet search functionality
✅ Intuitive and user-centric design
✅ Deployed on server

Thank you for the opportunity!

Best regards,
[Your Name]
```

---

## 🆘 Need Help?

- **Backend won't deploy?** Check Railway/Render logs
- **Frontend can't connect?** Verify API URL in `environment.prod.ts`
- **CORS errors?** Make sure CORS URL matches frontend exactly
- **Build errors?** Check `DEPLOY_NOW.md` for troubleshooting

**You've got this! 🚀**

