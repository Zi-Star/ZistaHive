# 🚀 ZISTA SETUP INSTRUCTIONS

## ✅ Phase 1 Complete!

The project structure is ready with:
- ✅ Turborepo monorepo configured
- ✅ Next.js 14 apps (web + admin)
- ✅ Shared packages (ui, database)
- ✅ TailwindCSS configured with Z-Star design system
- ✅ TypeScript setup
- ✅ Prisma schema with Honey Economy models

---

## 📦 NEXT STEP: Install Dependencies

### Option 1: Enable PowerShell Scripts (Recommended)
Run this command in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then install dependencies:
```powershell
npm install
```

### Option 2: Use Command Prompt
Open Command Prompt (cmd) and run:
```cmd
cd c:\Users\Tzifas\Desktop\Astra\Z-Star
npm install
```

### Option 3: Manual Package Manager
Use your IDE's integrated terminal or Git Bash:
```bash
npm install
```

---

## 🔧 After Installing Dependencies

### 1. Setup Environment Variables
Create `.env.local` in `apps/web/`:
```bash
cp apps/web/.env.example apps/web/.env.local
```

Then edit `apps/web/.env.local` with your actual credentials from `Docs/Zista_Credentials.md`

### 2. Generate Prisma Client
```bash
cd packages/database
npx prisma generate
```

### 3. Run Database Migration
```bash
npx prisma db push
```

### 4. Start Development Server
```bash
npm run dev
```

This will start:
- **Main app:** http://localhost:3000
- **Admin dashboard:** http://localhost:3001

---

## 📂 Project Structure

```
Z-Star/
├── apps/
│   ├── web/              # Main Zista PWA (Port 3000)
│   │   ├── src/app/     # Next.js 14 App Router
│   │   ├── public/      # Static assets
│   │   └── package.json
│   └── admin/           # Admin Dashboard (Port 3001)
│       ├── src/app/
│       └── package.json
├── packages/
│   ├── ui/              # Shared UI components (Button, HoneyPot)
│   │   └── src/components/
│   └── database/        # Prisma schema & client
│       └── prisma/schema.prisma
├── Docs/                # Project documentation
├── package.json         # Root package with workspaces
├── turbo.json          # Turborepo config
└── TASKS.md            # Development task tracker
```

---

## 🎨 Design System

The Z-Star design system is configured with:

**Colors:**
- **Primary (Honey):** #FFC300 (Yellow)
- **Secondary:** #8B5CF6 (Purple)
- **Dark:** #1A1A1A

**Fonts:**
- **Sans:** Inter
- **Display:** Poppins

**Components Ready:**
- Button (3 variants, 3 sizes)
- HoneyPot (balance display)

---

## 🗄️ Database Schema

**Models:**
- `User` - Authentication & core user data
- `Profile` - Extended user info & Bee Rank
- `HoneyBalance` - Honey economy balance & streaks
- `HoneyTransaction` - Transaction history
- `Session` - Auth sessions

---

## ❓ Troubleshooting

### PowerShell Script Execution Error
If you see "running scripts is disabled":
1. Run PowerShell as Administrator
2. Execute: `Set-ExecutionPolicy RemoteSigned`
3. Try `npm install` again

### Module Not Found Errors
These are expected until dependencies are installed. Run `npm install` first.

### Port Already in Use
If port 3000 or 3001 is occupied:
```bash
# Change port in package.json scripts:
"dev": "next dev --port 3002"
```

---

## 📞 Need Help?

Check `TASKS.md` for current progress and next steps!
