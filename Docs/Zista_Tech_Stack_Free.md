# ZISTA TECH STACK - $0 Budget Edition
**Version:** 1.0  
**Date:** October 2025  
**Budget:** $0 - $500 (Bootstrap Mode)  
**Deployment:** Free tiers + Self-hosting when ready  
**Philosophy:** Start free, scale when revenue comes

---

## 🎯 Stack Overview

```
Frontend: Next.js 14 + React + TypeScript
Styling: TailwindCSS + shadcn/ui
Backend: Next.js API Routes (later: separate Node.js service)
Database: PostgreSQL (Neon or Supabase free tier)
Auth: NextAuth.js
Storage: Cloudflare R2 (10GB free)
Hosting: Vercel (frontend) + Self-host backend later
AI: Groq API (fast, free) or OpenAI (pay-as-you-go)
Analytics: PostHog (free tier) or Plausible (self-hosted)
Monitoring: Sentry (free tier)
```

**Total Monthly Cost (Phase 1):** $0  
**When You'll Need to Pay:** After 1,000+ active users or 10GB storage

---

## 🛠️ DETAILED STACK BREAKDOWN

### **1. FRONTEND**

#### **Next.js 14 (App Router)**
**Why:** 
- Full-stack framework (frontend + backend API routes)
- Built-in SEO (server-side rendering)
- File-based routing (easy to organize)
- Perfect for PWA (mobile-like experience)
- TypeScript support out of the box

**Setup:**
```bash
npx create-next-app@latest zista --typescript --tailwind --app --use-npm
cd zista
```

**Configuration:**
```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['your-cloudflare-r2-bucket.r2.dev'],
  },
  experimental: {
    serverActions: true, // For form submissions
  },
}
```

**Free Tier:** Unlimited development

---

#### **React 18**
**Why:**
- Industry standard for UI
- Huge ecosystem (libraries, tutorials)
- Works seamlessly with Next.js
- AI coding assistants (Cursor/Windsurf) know it well

**Key Features Used:**
- React Hooks (useState, useEffect, useContext)
- Server Components (for performance)
- Client Components (for interactivity)

**Free Tier:** Open source, free forever

---

#### **TypeScript**
**Why:**
- Catch errors before runtime
- Better autocomplete in Cursor/Windsurf
- Easier refactoring as codebase grows
- Required for production-quality apps

**tsconfig.json (Recommended):**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/tools/*": ["./src/tools/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Free Tier:** Open source, free forever

---

### **2. STYLING & UI**

#### **TailwindCSS**
**Why:**
- Utility-first CSS (fast development)
- No CSS files to manage
- Responsive by default
- Perfect for AI coding assistants (they know Tailwind well)

**Setup:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**tailwind.config.js (Zista Colors):**
```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'golden-honey': '#F9C74F',
        'deep-indigo': '#312E81',
        'soft-white': '#F5F5F7',
        'accent-cyan': '#3ABFF8',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

**Free Tier:** Open source, free forever

---

#### **shadcn/ui**
**Why:**
- Beautiful, accessible components
- Copy-paste (not NPM dependency)
- Fully customizable
- Built on Radix UI (best accessibility)

**Setup:**
```bash
npx shadcn-ui@latest init
```

**Components to Install First:**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
```

**Free Tier:** Open source, free forever

---

#### **Framer Motion**
**Why:**
- Smooth animations
- Easy to use with React
- Performant (GPU-accelerated)
- Makes UI feel premium

**Setup:**
```bash
npm install framer-motion
```

**Example Usage:**
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <Card>...</Card>
</motion.div>
```

**Free Tier:** Open source, free forever

---

### **3. BACKEND & DATABASE**

#### **Next.js API Routes**
**Why:**
- No separate backend needed (Phase 1)
- Deploy with frontend (simpler)
- TypeScript end-to-end
- Easy to migrate to separate backend later

**Structure:**
```
/app/api/
├── auth/
│   ├── [...nextauth]/route.ts
│   └── register/route.ts
├── honey/
│   ├── balance/route.ts
│   ├── earn/route.ts
│   └── spend/route.ts
├── tools/
│   ├── qr-generator/route.ts
│   └── ig-downloader/route.ts
└── user/
    └── profile/route.ts
```

**Example Route:**
```typescript
// app/api/honey/balance/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { honey_balance: true },
  });
  
  return NextResponse.json({ balance: user.honey_balance });
}
```

**Free Tier:** Runs on Vercel for free

---

#### **PostgreSQL Database**

**Option A: Neon (Recommended)**
**Why:**
- Serverless PostgreSQL
- 3GB storage free
- Branching (dev/prod databases)
- Auto-scaling

**Free Tier:**
```
Storage: 3GB
Compute: Shared CPU
Branches: 10 (dev/staging/prod)
Monthly Cost: $0
Upgrade When: >3GB data or need dedicated CPU
```

**Setup:**
1. Sign up at neon.tech
2. Create project
3. Copy connection string
4. Add to `.env.local`:
```
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/zista?sslmode=require"
```

---

**Option B: Supabase**
**Why:**
- PostgreSQL + Auth + Storage (all-in-one)
- 500MB database free
- Built-in auth (can replace NextAuth)
- 2GB bandwidth/month

**Free Tier:**
```
Database: 500MB
Storage: 1GB
Bandwidth: 2GB/month
Monthly Cost: $0
Upgrade When: >500MB data or >2GB bandwidth
```

**Setup:**
1. Sign up at supabase.com
2. Create project
3. Get connection string from Settings → Database
4. Add to `.env.local`

---

**Recommendation:** Start with **Neon** (more storage), migrate to paid Supabase later if you need auth + storage together.

---

#### **Prisma ORM**
**Why:**
- Type-safe database queries
- Auto-generates TypeScript types
- Easy migrations
- Great with PostgreSQL

**Setup:**
```bash
npm install prisma @prisma/client
npx prisma init
```

**Schema Example (prisma/schema.prisma):**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                String   @id @default(uuid())
  email             String   @unique
  name              String?
  image             String?
  honey_balance     Int      @default(0)
  total_honey_earned Int     @default(0)
  total_honey_spent Int      @default(0)
  streak_days       Int      @default(0)
  last_login        DateTime @default(now())
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  
  transactions      HoneyTransaction[]
  unlocks           UserUnlock[]
}

model HoneyTransaction {
  id          String   @id @default(uuid())
  user_id     String
  user        User     @relation(fields: [user_id], references: [id])
  amount      Int
  type        String   // 'earn_login', 'earn_ad', 'spend_tool', etc.
  description String?
  metadata    Json?
  created_at  DateTime @default(now())
}

model UserUnlock {
  id          String   @id @default(uuid())
  user_id     String
  user        User     @relation(fields: [user_id], references: [id])
  unlock_type String   // 'tool', 'course', 'badge'
  unlock_id   String   // 'tool_bg_remover', 'course_marketing_101'
  honey_spent Int
  unlocked_at DateTime @default(now())
  
  @@unique([user_id, unlock_id])
}
```

**Commands:**
```bash
npx prisma migrate dev --name init  # Create database tables
npx prisma generate                 # Generate TypeScript types
npx prisma studio                   # Visual database browser
```

**Free Tier:** Open source, free forever

---

### **4. AUTHENTICATION**

#### **NextAuth.js**
**Why:**
- Built for Next.js
- Supports Google/Facebook OAuth
- Email magic links
- JWT tokens
- Handles sessions automatically

**Setup:**
```bash
npm install next-auth @next-auth/prisma-adapter
```

**Configuration (app/api/auth/[...nextauth]/route.ts):**
```typescript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };
```

**Environment Variables (.env.local):**
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here  # Generate: openssl rand -base64 32

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-secret

EMAIL_SERVER=smtp://user:pass@smtp.sendgrid.net:587
EMAIL_FROM=noreply@zista.app
```

**Free Email Service:** SendGrid (100 emails/day free) or Resend (3,000 emails/month free)

**Free Tier:** NextAuth is open source, OAuth providers free (Gmail users unlimited)

---

### **5. FILE STORAGE**

#### **Cloudflare R2**
**Why:**
- S3-compatible (easy to use)
- 10GB storage free
- No egress fees (bandwidth is free!)
- Fast global CDN

**Free Tier:**
```
Storage: 10GB
Class A Operations: 1M/month (uploads)
Class B Operations: 10M/month (downloads)
Monthly Cost: $0
```

**Setup:**
1. Sign up at cloudflare.com
2. Create R2 bucket
3. Get access keys
4. Install SDK:
```bash
npm install @aws-sdk/client-s3
```

**Upload Example:**
```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(file: File, key: string) {
  const buffer = await file.arrayBuffer();
  
  await s3.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,
  }));
  
  return `https://your-bucket.r2.dev/${key}`;
}
```

**Alternative (Free):** Vercel Blob (1GB free, easy integration with Next.js)

---

### **6. HOSTING & DEPLOYMENT**

#### **Vercel (Frontend + API Routes)**
**Why:**
- Made by Next.js creators (perfect fit)
- One-click deployment
- Auto-HTTPS
- Global CDN
- Preview deployments for every git push

**Free Tier:**
```
Bandwidth: 100GB/month
Builds: 6,000 minutes/month
Serverless Functions: 100GB-Hrs
Team Size: 1 (hobby)
Custom Domain: Yes (free)
Monthly Cost: $0
```

**Setup:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**GitHub Integration:**
- Push to `main` branch → Auto-deploy to production
- Push to `dev` branch → Auto-deploy to preview URL
- Pull requests get unique preview URLs
- GitHub 'Repo https://github.com/Zi-Star/ZistaHive.git'

**When to Upgrade:** >100GB bandwidth/month (around 5,000-10,000 daily users)

---

#### **Self-Hosting (Phase 2+)**
When you outgrow Vercel's free tier or need more control:

**Option A: DigitalOcean Droplet**
```
Server: $6/month (1GB RAM, 25GB SSD)
Docker deployment
Your own Nginx/Caddy
Manual scaling
```

**Option B: Fly.io**
```
Free: 3 VMs (256MB RAM each)
Auto-scaling
Global edge network
Upgrade: $5-20/month
```

**Option C: Railway**
```
Free: $5 credit/month
Auto-deploys from GitHub
PostgreSQL included
Upgrade: Pay as you go
```

---

### **7. AI & TOOLS**

#### **AI API (For Content Generation, Summaries, etc.)**

**Option A: Groq (Recommended for Free)**
**Why:**
- Fastest inference (up to 300 tokens/sec!)
- Free tier is generous
- Llama 3 models (high quality)

**Free Tier:**
```
Requests: 14,400/day
Tokens: ~400,000/day
Monthly Cost: $0
```

**Setup:**
```bash
npm install groq-sdk
```

```typescript
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateSummary(text: string) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "user", content: `Summarize this: ${text}` }
    ],
    model: "llama-3.1-70b-versatile",
    temperature: 0.5,
    max_tokens: 500,
  });
  
  return completion.choices[0]?.message?.content || "";
}
```

---

**Option B: OpenAI (Pay-as-you-go)**
**Why:**
- GPT-4 (best quality)
- More expensive but worth it for critical features

**Pricing:**
```
GPT-4o: $2.50/1M input tokens, $10/1M output tokens
GPT-3.5 Turbo: $0.50/1M input, $1.50/1M output
Start with $5 credit
```

**When to Use:**
- Content generation for courses
- AI chatbot assistant
- Image analysis (GPT-4 Vision)

---

#### **Social Media Downloaders**
For IG/TikTok video downloaders:

**Libraries:**
```bash
npm install ytdl-core        # YouTube
npm install @xaviabot/tiktok-scraper  # TikTok
# Instagram: Use custom scraping or third-party APIs
```

**Caution:** These tools work in gray area (not officially supported by platforms). Have backup plans.

---

#### **Image Processing**

**Sharp (Image resize, compress, convert)**
```bash
npm install sharp
```

**Example:**
```typescript
import sharp from 'sharp';

export async function compressImage(buffer: Buffer) {
  return sharp(buffer)
    .resize(1200, 1200, { fit: 'inside' })
    .jpeg({ quality: 80 })
    .toBuffer();
}
```

**Free Tier:** Library is free, runs on your server

---

**Remove.bg API (Background Removal)**
**Free Tier:** 50 images/month  
**Paid:** $0.20/image after that

**Alternative:** Use AI models (Rembg library, self-hosted)

---

### **8. ANALYTICS & MONITORING**

#### **PostHog (Analytics)**
**Why:**
- Open source
- Self-hosted or cloud
- Event tracking, funnels, cohorts
- GDPR-friendly

**Free Tier (Cloud):**
```
Events: 1M/month
Users: Unlimited
Dashboards: Unlimited
Monthly Cost: $0
```

**Setup:**
```bash
npm install posthog-js
```

```typescript
// lib/analytics.ts
import posthog from 'posthog-js';

export function initAnalytics() {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: 'https://app.posthog.com'
  });
}

export function trackEvent(event: string, properties?: object) {
  posthog.capture(event, properties);
}
```

**Events to Track:**
```typescript
trackEvent('tool_used', { tool: 'qr_generator' });
trackEvent('honey_earned', { amount: 10, source: 'ad' });
trackEvent('course_started', { course_id: 'marketing_101' });
```

---

#### **Sentry (Error Tracking)**
**Why:**
- Catch bugs before users complain
- See full error context
- Performance monitoring

**Free Tier:**
```
Errors: 5,000/month
Performance: 10,000 transactions/month
Monthly Cost: $0
```

**Setup:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Auto-configured by wizard.** Catches errors automatically.

---

#### **Plausible (Alternative - Privacy-focused Analytics)**
**Why:**
- Lightweight (< 1KB script)
- No cookies (GDPR compliant)
- Simple, beautiful UI

**Free Tier:** Self-hosted (unlimited)  
**Cloud Tier:** $9/month (10k pageviews)

**Recommendation:** Self-host when you have revenue, use PostHog free tier initially.

---

### **9. DEVELOPMENT TOOLS**

#### **AI Coding Assistants**

**Cursor (Recommended)**
- VS Code fork with AI built-in
- Free: 2,000 completions/month
- Pro: $20/month (unlimited)

**Windsurf**
- Similar to Cursor
- Different AI model (Cascade)

**Qoder**
- Newer, experimental

**Setup:**
1. Download Cursor from cursor.sh
2. Open Zista project
3. Add `.cursorrules` file:

```
# Zista Project Rules

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict mode)
- TailwindCSS + shadcn/ui
- Prisma ORM with PostgreSQL
- NextAuth.js for auth

## Code Style
- Use functional components
- Prefer server components (unless interactivity needed)
- Use Zod for validation
- Keep components under 200 lines
- Extract complex logic to /lib/

## File Naming
- Components: PascalCase (Button.tsx)
- Utilities: camelCase (formatHoney.ts)
- API routes: route.ts (Next.js convention)

## Honey Economy Rules
- Always validate user session before Honey operations
- Log all Honey transactions
- Check daily limits before awarding
- Never allow negative balances

## Tool Structure
Each tool should have:
- /tools/[tool-name]/page.tsx (UI)
- /app/api/tools/[tool-name]/route.ts (API)
- /lib/tools/[tool-name].ts (logic)
```

---

#### **Storybook (Component Library)**
**Why:**
- Preview components in isolation
- Test different states
- Generate documentation

**Setup:**
```bash
npx storybook@latest init
```

**Use When:** You have 10+ reusable components (Month 2+)

---

#### **Git & GitHub**
**Setup:**
```bash
git init
git add .
git commit -m "Initial commit"
gh repo https://github.com/Zi-Star/ZistaHive.git --private --source=. --push
```

**Branches:**
```
main: Production (deploys to zista.app)
dev: Development (deploys to dev.zista.app)
feature/*: Feature branches (PR to dev)
```

---

### **10. OPTIONAL TOOLS**

#### **Email Service**

**Resend (Recommended)**
**Free Tier:** 3,000 emails/month  
**Use For:** Auth emails, notifications, newsletters

**Setup:**
```bash
npm install resend
```

---

#### **SMS (Kenya-focused)**

**Africa's Talking**
**Free Trial:** $0.50 credit  
**Cost:** ~$0.01 per SMS  
**Use For:** OTP, notifications

---

#### **Payment Gateway (Phase 2)**

**M-PESA (via Safaricom Daraja API)**
**Free:** API access  
**Cost:** ~3% transaction fee

**Stripe + Paystack**
**Free:** API access  
**Cost:** ~3.5% transaction fee

---

## 💻 DEVELOPMENT ENVIRONMENT SETUP

### **Initial Setup Checklist**

```bash
# 1. Install Node.js (v18+)
node --version  # Should be 18.x or higher

# 2. Clone or create project
npx create-next-app@latest zista --typescript --tailwind --app

# 3. Install dependencies
cd zista
npm install

# 4. Install additional packages
npm install @prisma/client prisma next-auth @next-auth/prisma-adapter
npm install @aws-sdk/client-s3 sharp groq-sdk
npm install framer-motion lucide-react
npm install zod react-hook-form @hookform/resolvers

# 5. Install dev dependencies
npm install -D @types/node @types/react eslint prettier

# 6. Install shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input dialog toast

# 7. Initialize Prisma
npx prisma init

# 8. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# 9. Run database migrations
npx prisma migrate dev --name init

# 10. Start dev server
npm run dev
```

---

### **Environment Variables Template**

Create `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Storage (Cloudflare R2)
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="zista-uploads"

# AI
GROQ_API_KEY="..."  # Or OPENAI_API_KEY

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="..."
SENTRY_DSN="..."

# Email
EMAIL_SERVER="smtp://..."
EMAIL_FROM="noreply@zista.app"
```

---

## 📊 COST PROJECTION

### **Phase 1: MVP (0-500 users)**
```
Vercel: $0 (free tier)
Neon Database: $0 (free tier)
Cloudflare R2: $0 (< 10GB)
Groq AI: $0 (free tier)
PostHog: $0 (< 1M events)
Sentry: $0 (< 5k errors)
Domain: $12/year (one-time)

TOTAL: $0/month + $12 domain
```

---

### **Phase 2: Growth (500-2,000 users)**
```
Vercel: $20/month (Pro) OR self-host ($6/month)
Neon Database: $19/month (Pro) OR stick with free
Cloudflare R2: ~$1/month (> 10GB)
Groq AI: $0 (still under limits) OR OpenAI $10/month
PostHog: $0 (still under 1M events)
Sentry: $0 (still under limits)
Resend Email: $0 (< 3k emails) OR $20/month

TOTAL: $40-60/month
```

---

### **Phase 3: Scale (2,000-10,000 users)**
```
Self-hosted VPS: $20-50/month
Database: $50/month (managed Postgres)
Storage: $5-15/month
AI API: $50-200/month (depends on usage)
Email: $50/month
Monitoring: $50/month (better tools)

TOTAL: $225-415/month
```

**Revenue at this point:** $1,500-3,000/month → Profitable!

---

## 🚀 DEPLOYMENT GUIDE

### **Quick Deploy to Vercel**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Set environment variables in Vercel dashboard
# Go to: Settings → Environment Variables
# Add all .env.local variables

# 5. Deploy to production
vercel --prod
```

---

### **Self-Hosting (When Ready)**

```bash
# 1. Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# 2. Build image
docker build -t zista .

# 3. Run container
docker run -p 3000:3000 --env-file .env.local zista

# 4. Use Docker Compose for full stack
# See Zista_Deployment_Guide.md (future doc)
```

---

## ✅ TECH STACK CHECKLIST

**Before Starting Development:**
- [ ] Node.js 18+ installed
- [ ] Next.js project created
- [ ] GitHub repo created (private)
- [ ] Neon database created
- [ ] Cloudflare R2 bucket created
- [ ] Google OAuth credentials created
- [ ] Groq API key obtained
- [ ] PostHog account created
- [ ] Sentry account created
- [ ] Vercel account created
- [ ] All environment variables set
- [ ] Cursor/Windsurf installed
- [ ] `.cursorrules` file created

**After First Week:**
- [ ] Auth working (login/logout)
- [ ] Database connected
- [ ] First tool deployed (QR Generator)
- [ ] Honey system basic functions
- [ ] Deployed to Vercel
- [ ] Custom domain pointed (optional)

---

## 🎯 RECOMMENDATIONS FOR ZIRAMZIS

**Week 1 Focus:**
1. Get Next.js + Prisma + NextAuth working locally
2. Create basic UI with shadcn/ui (homepage, login)
3. Deploy to Vercel (even if incomplete)

**Week 2 Focus:**
1. Build first tool (QR Generator - simplest)
2. Implement Honey system (earn 10 on tool use)
3. Test end-to-end flow

**Use Cursor/Windsurf heavily:**
- Ask it to generate components
- Ask it to write API routes
- Ask it to debug errors

**Prompt Example:**
```
"Create a Next.js API route at /api/tools/qr-generator 
that accepts a 'text' parameter, generates a QR code using 
the 'qr-code' library, and returns it as a PNG image. 
Include error handling and TypeScript types."
```

---

## 📚 LEARNING RESOURCES

**Next.js:**
- Official Docs: nextjs.org/docs
- Tutorial: nextjs.org/learn

**Prisma:**
- Docs: prisma.io/docs
- Quickstart: prisma.io/docs/getting-started

**TailwindCSS:**
- Docs: tailwindcss.com/docs
- Cheat Sheet: nerdcave.com/tailwind-cheat-sheet

**shadcn/ui:**
- Docs: ui.shadcn.com
- Components: ui.shadcn.com/docs/components

**TypeScript:**
- Handbook: typescriptlang.org/docs/handbook

**YouTube Channels:**
- Web Dev Simplified (Next.js tutorials)
- Fireship (Quick tech overviews)
- Traversy Media (Full-stack tutorials)

---

## 🔧 TROUBLESHOOTING COMMON ISSUES

### **"Module not found" errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Database connection errors**
```bash
# Verify connection string
npx prisma studio  # Should open database browser

# If fails, check .env.local DATABASE_URL format
# Should be: postgresql://user:pass@host:5432/dbname?sslmode=require
```

### **Build errors on Vercel**
```bash
# Check build logs for specific error
# Common fix: Add all env vars to Vercel dashboard
# Make sure to use NEXT_PUBLIC_ prefix for client-side vars
```

### **Auth not working**
```bash
# Verify NEXTAUTH_URL matches your domain
# Local: http://localhost:3000
# Production: https://zista.app

# Regenerate NEXTAUTH_SECRET if needed:
openssl rand -base64 32
```

### **Prisma errors**
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Generate client after schema changes
npx prisma generate
```

---

## 🎯 WHEN TO UPGRADE (Triggers)

**Upgrade Vercel ($20/month) When:**
- [ ] Bandwidth > 100GB/month
- [ ] Build minutes > 6,000/month
- [ ] Need team collaboration
- [ ] Need faster builds

**Upgrade Database ($19/month) When:**
- [ ] Data > 3GB (Neon free limit)
- [ ] Need auto-scaling
- [ ] Need read replicas
- [ ] Queries become slow

**Add CDN ($5-20/month) When:**
- [ ] Users outside Kenya experiencing slow loads
- [ ] Image loading takes > 2 seconds
- [ ] Need DDoS protection

**Upgrade AI ($20+/month) When:**
- [ ] Groq free tier exhausted (14k requests/day)
- [ ] Need GPT-4 quality for courses
- [ ] Need image generation (DALL-E)

---

## 🔐 SECURITY BEST PRACTICES

**Environment Variables:**
```bash
# NEVER commit .env.local to git
# Add to .gitignore (should be there by default)
echo ".env.local" >> .gitignore

# Use different secrets for dev/prod
# Rotate secrets every 90 days
```

**API Routes:**
```typescript
// Always verify auth before sensitive operations
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  const session = await getServerSession();
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Proceed with authenticated request
}
```

**Input Validation:**
```typescript
// Use Zod for all user inputs
import { z } from 'zod';

const QRSchema = z.object({
  text: z.string().min(1).max(500),
  size: z.number().min(100).max(1000).optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  
  try {
    const validated = QRSchema.parse(body);
    // Use validated.text, validated.size
  } catch (error) {
    return new Response('Invalid input', { status: 400 });
  }
}
```

**Rate Limiting:**
```typescript
// Install rate limiter
// npm install @upstash/ratelimit @upstash/redis

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // Proceed
}
```

**CORS (for API):**
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://zista.app' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ];
  },
};
```

---

## 📦 RECOMMENDED NPM PACKAGES

### **Utilities**
```bash
npm install clsx              # Conditional classes
npm install date-fns          # Date formatting
npm install slugify           # URL-friendly strings
npm install nanoid            # Generate unique IDs
npm install zod               # Schema validation
```

### **UI Enhancements**
```bash
npm install react-hot-toast   # Notifications (alternative to shadcn toast)
npm install react-icons       # Icon library
npm install react-dropzone    # File uploads
npm install recharts          # Charts (for analytics dashboard)
```

### **Developer Experience**
```bash
npm install -D eslint-config-prettier   # ESLint + Prettier compatibility
npm install -D @typescript-eslint/parser
npm install -D husky                    # Git hooks
npm install -D lint-staged              # Lint only changed files
```

### **Testing (Phase 2+)**
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D playwright  # E2E tests
```

---

## 🎨 DESIGN SYSTEM SETUP

### **Colors (Use in Tailwind)**
```javascript
// tailwind.config.js - Already shown above, but here's usage:

// In components:
<div className="bg-golden-honey text-deep-indigo">
  <Button className="bg-accent-cyan hover:bg-accent-cyan/90">
    Click me
  </Button>
</div>
```

### **Typography**
```bash
# Install fonts
npm install @fontsource/inter @fontsource/poppins

# app/layout.tsx
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-sans">
      <body>{children}</body>
    </html>
  );
}
```

### **Spacing System**
```javascript
// Use Tailwind's default spacing (4px base)
p-2  // 8px padding
p-4  // 16px padding
p-6  // 24px padding
p-8  // 32px padding

gap-4  // 16px gap in flex/grid
space-y-4  // 16px vertical spacing between children
```

### **Responsive Breakpoints**
```javascript
// Tailwind defaults (mobile-first)
sm:  // 640px
md:  // 768px
lg:  // 1024px
xl:  // 1280px
2xl: // 1536px

// Usage:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  // 1 column on mobile, 2 on tablet, 3 on desktop
</div>
```

---

## 🌐 PWA SETUP (Progressive Web App)

### **Make Zista Installable**

```bash
# Install PWA plugin
npm install next-pwa
```

**next.config.js:**
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // ... other config
});
```

**public/manifest.json:**
```json
{
  "name": "Zista - Stay Busy. Stay Smart.",
  "short_name": "Zista",
  "description": "All-in-one productivity app for Kenyan youth",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F5F5F7",
  "theme_color": "#F9C74F",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**app/layout.tsx (add to head):**
```typescript
<head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#F9C74F" />
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
</head>
```

**Result:** Users can "Add to Home Screen" on mobile, use Zista like a native app!

---

## 🔄 CI/CD PIPELINE

### **GitHub Actions (Free for Public Repos)**

**.github/workflows/ci.yml:**
```yaml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linter
        run: npm run lint
        
      - name: Type check
        run: npx tsc --noEmit
        
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

**Auto-deploy to Vercel:** Vercel automatically deploys on push to main (no CI needed)

---

## 📊 PERFORMANCE OPTIMIZATION

### **Image Optimization**
```typescript
// Use Next.js Image component (auto-optimizes)
import Image from 'next/image';

<Image
  src="/honey-icon.png"
  alt="Honey"
  width={32}
  height={32}
  loading="lazy"  // Lazy load below fold
/>
```

### **Code Splitting**
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,  // Don't render on server
});
```

### **Database Optimization**
```prisma
// Add indexes to frequently queried fields
model User {
  id    String @id @default(uuid())
  email String @unique  // Automatic index
  
  @@index([created_at])  // Manual index for sorting
  @@index([honey_balance])  // For leaderboards
}
```

### **Caching**
```typescript
// Cache API responses (Next.js 14 fetch)
export async function getLeaderboard() {
  const res = await fetch('https://api.zista.app/leaderboard', {
    next: { revalidate: 300 }  // Cache for 5 minutes
  });
  
  return res.json();
}
```

---

## 🐛 DEBUGGING TOOLS

**Next.js Dev Tools:**
```bash
# Run with debug mode
NODE_OPTIONS='--inspect' npm run dev

# Chrome DevTools → node icon → inspect
```

**React DevTools:**
- Install browser extension
- Inspect component tree
- View props/state

**Prisma Studio:**
```bash
# Visual database browser
npx prisma studio

# Opens at localhost:5555
```

**Network Inspector:**
- Chrome DevTools → Network tab
- See all API calls
- Check request/response payloads

---

## 📈 SCALING CONSIDERATIONS

### **When You Reach 10,000 Users**

**Backend:**
- Move to microservices (separate tool processing, auth, etc.)
- Add Redis for caching (session data, leaderboards)
- Use message queue (Bull.js) for async jobs

**Database:**
- Add read replicas (for analytics queries)
- Implement connection pooling (PgBouncer)
- Archive old data (transactions > 1 year)

**Frontend:**
- Add CDN (Cloudflare or CloudFront)
- Implement aggressive caching
- Consider server-side caching (Redis)

**Monitoring:**
- Upgrade to paid monitoring (Datadog, New Relic)
- Set up alerts (CPU > 80%, errors > 100/hour)
- Weekly performance audits

---

## 🎓 FINAL RECOMMENDATIONS

### **For Solo Development (VibeCoding)**

**1. Let AI Do Heavy Lifting:**
```
Good prompt: "Create a React component for a QR code generator 
that takes text input, validates it with Zod, and generates a 
downloadable QR code using the qrcode library. Use shadcn/ui 
components and Tailwind styling."

Bad prompt: "Make a QR generator"
```

**2. Start With Boilerplate:**
```bash
# Use templates to save time
npx create-next-app@latest --example with-prisma
npx create-next-app@latest --example with-nextauth
```

**3. Copy-Paste-Modify:**
- Find similar projects on GitHub
- Copy structure, modify for your needs
- AI will help you adapt code

**4. Test Early, Test Often:**
```bash
# Deploy incomplete features to preview URLs
vercel --prod=false

# Share with friends for feedback
```

**5. Document As You Go:**
```typescript
// Add comments for future you (or AI)
/**
 * Awards Honey to user after watching ad
 * @param userId - User's unique ID
 * @param adId - Ad network's ad ID
 * @returns Updated Honey balance
 */
export async function awardAdHoney(userId: string, adId: string) {
  // Check daily limit...
}
```

---

## ✅ TECH STACK SUMMARY

**What You're Building With:**

```
Language: TypeScript
Framework: Next.js 14
UI: React + TailwindCSS + shadcn/ui
Database: PostgreSQL (Neon)
ORM: Prisma
Auth: NextAuth.js
Storage: Cloudflare R2
AI: Groq (free) or OpenAI (paid)
Analytics: PostHog
Errors: Sentry
Hosting: Vercel (free tier)
Development: Cursor or Windsurf
Version Control: GitHub
```

**Monthly Cost Breakdown (MVP):**
```
Development: $0
Hosting: $0
Database: $0
Storage: $0
AI: $0
Analytics: $0
Monitoring: $0
Domain: $1/month (amortized)

TOTAL: ~$0/month for first 500-1,000 users
```

**When Revenue Hits $1,000/month:**
- Upgrade to paid hosting ($20-40/month)
- Upgrade database ($20-50/month)
- Add better AI ($50-100/month)
- Still profitable at 70%+ margins

---

## 🎯 YOUR NEXT STEPS

**This Week:**
1. [ ] Set up development environment (Node, , Git)
2. [ ] Create Next.js project
3. [ ] Set up Neon database
4. [ ] Deploy  to Vercel
5. [ ] Add auth (NextAuth with Google)

**Next Week:**
1. [ ] Build first tools (QR Generator)
2. [ ] Implement basic Honey system
3. [ ] Create homepage with tool cards
4. [ ] Test with 3-5 friends

**Month 1 Goal:**
- [ ] 5-7 working tools
- [ ] Auth + profile
- [ ] Honey earning (ads + login)
- [ ] Deployed at zista.app or similar
- [ ] 50 beta users giving feedback

---

## 📞 SUPPORT & RESOURCES

**When Stuck:**
1. Ask Cursor/Windsurf (paste error message)
2. Search Stack Overflow
3. Check Next.js Discord (discord.gg/nextjs)
4. Read official docs (they're actually good)
5. Watch YouTube tutorials

**Communities:**
- r/nextjs (Reddit)
- Next.js Discord
- Prisma Slack
- Indie Hackers (for startup advice)

**No-Code Alternatives (If Coding Overwhelms You):**
- Bubble.io (visual programming)
- FlutterFlow (mobile apps)
- Adalo (simple apps)

**But:** You'll hit limits fast. Coding gives you full control.

---

## 🐝 THE ZISTA TECH PROMISE

**This stack will:**
- ✅ Start completely free
- ✅ Scale to 10,000+ users
- ✅ Work with AI coding assistants
- ✅ Deploy in minutes
- ✅ Be modern and maintainable

**You won't need to:**
- ❌ Learn DevOps (Vercel handles it)
- ❌ Manage servers (serverless)
- ❌ Write complex SQL (Prisma abstracts it)
- ❌ Build UI from scratch (shadcn/ui)

**Focus on:**
- Building great tools
- Creating valuable content
- Engaging  community
- Earning revenue

**The tech stack should be invisible. Zista's value is what matters.**

---
**Document End - Ready to Code!**