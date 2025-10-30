# ZISTA CODE STRUCTURE - Complete Organization Guide
**Version:** 1.0  
**Date:** October 2025  
**Purpose:** Define folder structure, naming conventions, and code organization  
**For:** Solo developer using AI assistants (Cursor/Windsurf)

---

## 🎯 Philosophy

**Three Core Principles:**

1. **Modular by Feature** - Each tool, module is self-contained
2. **AI-Friendly** - Clear structure helps Cursor/Windsurf generate better code
3. **Scalable** - Easy to add new features without breaking existing code

---

## 📁 COMPLETE FOLDER STRUCTURE ( Refrence )

```
zista/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD
│
├── public/
│   ├── icons/                        # PWA icons, favicons
│   ├── images/                       # Static images (logos, bee graphics)
│   ├── manifest.json                 # PWA manifest
│   └── robots.txt                    # SEO
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Database migrations
│   └── seed.ts                       # Seed data (optional)
│
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── (auth)/                   # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── logout/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/              # Authenticated routes group
│   │   │   ├── layout.tsx            # Dashboard layout (sidebar, header)
│   │   │   ├── page.tsx              # Home dashboard
│   │   │   │
│   │   │   ├── tools/                # Tools module
│   │   │   │   ├── page.tsx          # Tools listing
│   │   │   │   ├── qr-generator/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── ig-downloader/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── currency-converter/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [toolId]/         # Dynamic tool route
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── learn/                # Learning module
│   │   │   │   ├── page.tsx          # Courses listing
│   │   │   │   ├── courses/
│   │   │   │   │   ├── [courseId]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── books/
│   │   │   │   │   ├── [bookId]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   └── certificates/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── play/                 # Games module
│   │   │   │   ├── page.tsx          # Games listing
│   │   │   │   ├── chess/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── quiz/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── tournaments/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── shop/                 # Marketplace module
│   │   │   │   ├── page.tsx          # Products listing
│   │   │   │   ├── product/
│   │   │   │   │   └── [productId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── cart/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── orders/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── profile/              # User profile
│   │   │       ├── page.tsx
│   │   │       ├── settings/
│   │   │       │   └── page.tsx
│   │   │       └── honey/
│   │   │           └── page.tsx
│   │   │
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts      # NextAuth handler
│   │   │   │
│   │   │   ├── honey/
│   │   │   │   ├── balance/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── earn/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── spend/
│   │   │   │   │   └── route.ts
│   │   │   │   └── transactions/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── tools/
│   │   │   │   ├── qr-generator/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── ig-downloader/
│   │   │   │   │   └── route.ts
│   │   │   │   └── [toolId]/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── learn/
│   │   │   │   ├── courses/
│   │   │   │   │   └── route.ts
│   │   │   │   └── progress/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── play/
│   │   │   │   ├── games/
│   │   │   │   │   └── route.ts
│   │   │   │   └── tournaments/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   └── shop/
│   │   │       ├── products/
│   │   │       │   └── route.ts
│   │   │       └── orders/
│   │   │           └── route.ts
│   │   │
│   │   ├── layout.tsx                # Root layout (fonts, providers)
│   │   ├── page.tsx                  # Landing page (public)
│   │   ├── globals.css               # Global styles
│   │   └── not-found.tsx             # 404 page
│   │
│   ├── components/                   # Shared UI components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── BottomNav.tsx         # Mobile navigation
│   │   │   └── Container.tsx
│   │   │
│   │   ├── honey/                    # Honey system components
│   │   │   ├── HoneyBalance.tsx
│   │   │   ├── HoneyEarnModal.tsx
│   │   │   ├── HoneySpendModal.tsx
│   │   │   └── HoneyTransaction.tsx
│   │   │
│   │   ├── tools/                    # Tool-specific components
│   │   │   ├── ToolCard.tsx
│   │   │   ├── ToolLayout.tsx
│   │   │   └── ToolUnlockGate.tsx
│   │   │
│   │   ├── learn/                    # Learning components
│   │   │   ├── CourseCard.tsx
│   │   │   ├── LessonPlayer.tsx
│   │   │   └── ProgressBar.tsx
│   │   │
│   │   ├── play/                     # Game components
│   │   │   ├── GameCard.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   └── TournamentBracket.tsx
│   │   │
│   │   ├── shop/                     # Marketplace components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── Cart.tsx
│   │   │   └── OrderSummary.tsx
│   │   │
│   │   └── shared/                   # Generic shared components
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── EmptyState.tsx
│   │       ├── BeeAnimation.tsx      # Bee-themed animations
│   │       └── AdPlayer.tsx          # Rewarded ad component
│   │
│   ├── lib/                          # Business logic & utilities
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   ├── auth.ts                   # Auth helpers
│   │   │
│   │   ├── honey/                    # Honey economy logic
│   │   │   ├── earn.ts               # Earning functions
│   │   │   ├── spend.ts              # Spending functions
│   │   │   ├── validate.ts           # Validation logic
│   │   │   └── limits.ts             # Daily caps, rate limits
│   │   │
│   │   ├── tools/                    # Tool processing logic
│   │   │   ├── qr-generator.ts
│   │   │   ├── ig-downloader.ts
│   │   │   ├── image-processor.ts
│   │   │   └── pdf-processor.ts
│   │   │
│   │   ├── learn/                    # Learning logic
│   │   │   ├── progress.ts
│   │   │   ├── certificates.ts
│   │   │   └── recommendations.ts
│   │   │
│   │   ├── play/                     # Game logic
│   │   │   ├── matchmaking.ts
│   │   │   ├── tournaments.ts
│   │   │   └── leaderboard.ts
│   │   │
│   │   ├── shop/                     # Marketplace logic
│   │   │   ├── cart.ts
│   │   │   ├── orders.ts
│   │   │   └── payments.ts
│   │   │
│   │   ├── ai/                       # AI integration
│   │   │   ├── groq.ts
│   │   │   ├── openai.ts
│   │   │   └── prompts.ts
│   │   │
│   │   ├── analytics/                # Analytics helpers
│   │   │   ├── posthog.ts
│   │   │   ├── events.ts
│   │   │   └── tracking.ts
│   │   │
│   │   └── utils/                    # Generic utilities
│   │       ├── format.ts             # formatHoney, formatDate, etc.
│   │       ├── validation.ts         # Zod schemas
│   │       ├── constants.ts          # App constants
│   │       └── helpers.ts            # Generic helpers
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useHoney.ts               # Honey state management
│   │   ├── useAuth.ts                # Auth state
│   │   ├── useTools.ts               # Tools data
│   │   ├── useAnalytics.ts           # Event tracking
│   │   └── useMediaQuery.ts          # Responsive hooks
│   │
│   ├── types/                        # TypeScript types
│   │   ├── index.ts                  # Exports all types
│   │   ├── honey.ts                  # Honey-related types
│   │   ├── tools.ts                  # Tool types
│   │   ├── learn.ts                  # Learning types
│   │   ├── play.ts                   # Game types
│   │   └── shop.ts                   # Marketplace types
│   │
│   └── middleware.ts                 # Next.js middleware (auth, redirects)
│
├── .cursorrules                      # Cursor AI instructions
├── .env.local                        # Environment variables (DO NOT COMMIT)
├── .env.example                      # Example env file (commit this)
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

---

## 📝 NAMING CONVENTIONS

### **Files & Folders**

**React Components:** PascalCase
```
Button.tsx
HoneyBalance.tsx
ToolCard.tsx
```

**Utilities & Logic:** camelCase
```
formatHoney.ts
earnHoney.ts
processImage.ts
```

**API Routes:** Next.js convention (route.ts)
```
app/api/honey/balance/route.ts
app/api/tools/qr-generator/route.ts
```

**Pages:** Next.js convention (page.tsx)
```
app/(dashboard)/tools/page.tsx
app/(dashboard)/tools/qr-generator/page.tsx
```

**Folders:** kebab-case (lowercase with hyphens)
```
qr-generator/
ig-downloader/
currency-converter/
```

---

### **Variables & Functions**

**Variables:** camelCase
```typescript
const honeyBalance = 1250;
const userName = "Sarah";
const isAuthenticated = true;
```

**Functions:** camelCase, verb-first
```typescript
function getHoneyBalance() {}
function earnHoney() {}
function validateInput() {}
```

**Constants:** UPPER_SNAKE_CASE
```typescript
const MAX_HONEY_PER_DAY = 100;
const AD_REWARD_AMOUNT = 10;
const DEFAULT_HONEY_START = 0;
```

**Types/Interfaces:** PascalCase
```typescript
interface User {}
type HoneyTransaction = {};
enum TransactionType {}
```

---

## 🔧 CODE ORGANIZATION PATTERNS

### **1. Tool Structure Pattern**

Every tool follows the same structure:

```
tools/qr-generator/
├── page.tsx                    # UI (client component)
├── api/
│   └── route.ts                # API endpoint
└── lib/
    └── generator.ts            # Business logic
```

**Example: QR Generator**

**File: `app/(dashboard)/tools/qr-generator/page.tsx`**
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ToolLayout from '@/components/tools/ToolLayout';
import { useHoney } from '@/hooks/useHoney';

export default function QRGeneratorPage() {
  const [text, setText] = useState('');
  const [qrCode, setQRCode] = useState<string | null>(null);
  const { balance, spendHoney } = useHoney();

  const handleGenerate = async () => {
    // Check if tool is unlocked or spend Honey
    const canUse = await spendHoney(10, 'tool_qr_generator');
    if (!canUse) return;

    // Call API
    const res = await fetch('/api/tools/qr-generator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    const { qrCodeUrl } = await res.json();
    setQRCode(qrCodeUrl);
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes instantly"
      honeyCost={10}
    >
      <Input
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <Button onClick={handleGenerate}>
        Generate QR Code
      </Button>

      {qrCode && (
        <img src={qrCode} alt="Generated QR Code" />
      )}
    </ToolLayout>
  );
}
```

**File: `app/api/tools/qr-generator/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { generateQRCode } from '@/lib/tools/qr-generator';
import { validateQRInput } from '@/lib/utils/validation';

export async function POST(req: NextRequest) {
  // Verify auth
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse and validate input
  const body = await req.json();
  const validation = validateQRInput(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Generate QR code
  try {
    const qrCodeUrl = await generateQRCode(validation.data.text);
    return NextResponse.json({ qrCodeUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
```

**File: `lib/tools/qr-generator.ts`**
```typescript
import QRCode from 'qrcode';
import { uploadToR2 } from '@/lib/storage';

export async function generateQRCode(text: string): Promise<string> {
  // Generate QR code as buffer
  const qrBuffer = await QRCode.toBuffer(text, {
    width: 500,
    margin: 2,
  });

  // Upload to R2
  const filename = `qr-${Date.now()}.png`;
  const url = await uploadToR2(qrBuffer, filename);

  return url;
}
```

---

### **2. API Route Pattern**

**Standard Structure:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

// 1. Define validation schema
const RequestSchema = z.object({
  field1: z.string(),
  field2: z.number().optional(),
});

// 2. Export HTTP methods
export async function GET(req: NextRequest) {
  // Auth check
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Logic
  try {
    const data = await fetchData(session.user.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Auth check
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse and validate
  const body = await req.json();
  const validated = RequestSchema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.errors },
      { status: 400 }
    );
  }

  // Logic
  try {
    const result = await processData(validated.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

---

### **3. Component Pattern**

**Shared Component Template:**
```typescript
// components/shared/ComponentName.tsx
import { cn } from '@/lib/utils';  // Tailwind merge utility

interface ComponentNameProps {
  // Props with documentation
  /** Main text to display */
  text: string;
  /** Optional variant style */
  variant?: 'default' | 'primary' | 'secondary';
  /** Optional callback */
  onClick?: () => void;
  /** Additional Tailwind classes */
  className?: string;
}

export default function ComponentName({
  text,
  variant = 'default',
  onClick,
  className,
}: ComponentNameProps) {
  return (
    <div
      className={cn(
        'base-classes',
        variant === 'primary' && 'primary-classes',
        variant === 'secondary' && 'secondary-classes',
        className
      )}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
```

---

### **4. Custom Hook Pattern**

**Example: useHoney Hook**
```typescript
// hooks/useHoney.ts
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useHoney() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Fetch balance on mount
  useEffect(() => {
    if (session) {
      fetchBalance();
    }
  }, [session]);

  async function fetchBalance() {
    try {
      const res = await fetch('/api/honey/balance');
      const data = await res.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Failed to fetch Honey balance:', error);
    } finally {
      setLoading(false);
    }
  }

  async function earnHoney(amount: number, source: string) {
    try {
      const res = await fetch('/api/honey/earn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, source }),
      });

      const data = await res.json();
      setBalance(data.new_balance);
      return true;
    } catch (error) {
      console.error('Failed to earn Honey:', error);
      return false;
    }
  }

  async function spendHoney(amount: number, item: string) {
    if (balance < amount) {
      // Show "insufficient Honey" modal
      return false;
    }

    try {
      const res = await fetch('/api/honey/spend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, item }),
      });

      const data = await res.json();
      setBalance(data.new_balance);
      return true;
    } catch (error) {
      console.error('Failed to spend Honey:', error);
      return false;
    }
  }

  return {
    balance,
    loading,
    earnHoney,
    spendHoney,
    refreshBalance: fetchBalance,
  };
}
```

---

## 🎨 COMPONENT LIBRARY STRUCTURE

### **shadcn/ui Components (`components/ui/`)**

These are copy-pasted from shadcn/ui. **DO NOT** modify directly.

```
components/ui/
├── button.tsx
├── card.tsx
├── input.tsx
├── dialog.tsx
├── toast.tsx
├── avatar.tsx
├── badge.tsx
├── dropdown-menu.tsx
├── tabs.tsx
└── ... (install as needed)
```

**Usage:**
```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

---

### **Custom Zista Components (`components/`)**

Build on top of shadcn/ui:

**Example: HoneyBalance Component**
```typescript
// components/honey/HoneyBalance.tsx
import { Badge } from '@/components/ui/badge';
import { useHoney } from '@/hooks/useHoney';

export default function HoneyBalance() {
  const { balance, loading } = useHoney();

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <Badge variant="secondary" className="bg-golden-honey text-deep-indigo">
      🍯 {balance.toLocaleString()} Honey
    </Badge>
  );
}
```

---

## 🗄️ DATABASE SCHEMA PATTERN

### **Prisma Schema Organization**

```prisma
// prisma/schema.prisma

// ============================================
// CONFIGURATION
// ============================================
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// USER & AUTH
// ============================================
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  
  // Honey economy
  honey_balance      Int      @default(0)
  total_honey_earned Int      @default(0)
  total_honey_spent  Int      @default(0)
  
  // Engagement
  streak_days Int      @default(0)
  last_login  DateTime @default(now())
  
  // Timestamps
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  
  // Relations
  accounts      Account[]
  sessions      Session[]
  transactions  HoneyTransaction[]
  unlocks       UserUnlock[]
  courses       CourseProgress[]
  orders        Order[]
  
  @@index([email])
  @@index([created_at])
}

// ============================================
// NEXTAUTH TABLES
// ============================================
model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ============================================
// HONEY ECONOMY
// ============================================
model HoneyTransaction {
  id          String   @id @default(uuid())
  user_id     String
  user        User     @relation(fields: [user_id], references: [id])
  
  amount      Int      // Positive for earn, negative for spend
  type        String   // 'earn_login', 'earn_ad', 'spend_tool', etc.
  description String?
  metadata    Json?    // Extra context (tool_id, course_id, etc.)
  
  created_at  DateTime @default(now())
  
  @@index([user_id])
  @@index([created_at])
  @@index([type])
}

model UserUnlock {
  id          String   @id @default(uuid())
  user_id     String
  user        User     @relation(fields: [user_id], references: [id])
  
  unlock_type String   // 'tool', 'course', 'badge', 'subscription'
  unlock_id   String   // 'tool_bg_remover', 'course_marketing_101'
  honey_spent Int
  
  unlocked_at DateTime @default(now())
  
  @@unique([user_id, unlock_id])
  @@index([user_id])
}

// ============================================
// LEARNING
// ============================================
model CourseProgress {
  id          String   @id @default(uuid())
  user_id     String
  user        User     @relation(fields: [user_id], references: [id])
  
  course_id   String
  progress    Int      @default(0)  // Percentage (0-100)
  completed   Boolean  @default(false)
  
  started_at  DateTime @default(now())
  completed_at DateTime?
  
  @@unique([user_id, course_id])
  @@index([user_id])
}

// ============================================
// MARKETPLACE
// ============================================
model Order {
  id            String   @id @default(uuid())
  user_id       String
  user          User     @relation(fields: [user_id], references: [id])
  
  total_amount  Decimal  @db.Decimal(10, 2)
  honey_used    Int      @default(0)
  status        String   // 'pending', 'completed', 'cancelled'
  
  created_at    DateTime @default(now())
  
  @@index([user_id])
  @@index([status])
}
```

---

## 🔐 ENVIRONMENT VARIABLES

### **File Structure**

```
.env.local         # Local development (NOT committed)
.env.example       # Template (committed to repo)
```

### **.env.example Content**

```bash
# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# ============================================
# NEXTAUTH
# ============================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# ============================================
# OAUTH PROVIDERS
# ============================================
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# Optional: Facebook OAuth
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

# ============================================
# STORAGE (Cloudflare R2)
# ============================================
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret"
R2_BUCKET_NAME="zista-uploads"

# ============================================
# AI
# ============================================
GROQ_API_KEY="your-groq-key"
# OR
OPENAI_API_KEY="your-openai-key"

# ============================================
# ANALYTICS
# ============================================
NEXT_PUBLIC_POSTHOG_KEY="your-posthog-key"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# ============================================
# ERROR TRACKING
# ============================================
SENTRY_DSN="your-sentry-dsn"
SENTRY_ORG="your-org"
SENTRY_PROJECT="Z-Star"

# ============================================
# EMAIL
# ============================================
EMAIL_SERVER="smtp://user:pass@smtp.sendgrid.net:587"
EMAIL_FROM="noreply@zista.app"

# Optional: Resend
RESEND_API_KEY="your-resend-key"

# ============================================
# PAYMENTS (Phase 2+)
# ============================================
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
PAYSTACK_SECRET_KEY=""
MPESA_CONSUMER_KEY=""
MPESA_CONSUMER_SECRET=""

# ============================================
# APP CONFIG
# ============================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

---

## 📦 PACKAGE.JSON SCRIPTS

### **Essential Scripts**

```json
{
  "name": "zista",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset",
    
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    
    "prepare": "husky install"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "@aws-sdk/client-s3": "^3.470.0",
    "next": "14.0.4",
    "next-auth": "^4.24.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^10.16.16",
    "lucide-react": "^0.300.0",
    "zod": "^3.22.4",
    "sharp": "^0.33.1",
    "groq-sdk": "^0.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "typescript": "^5.3.3",
    "prisma": "^5.7.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.0.4",
    "prettier": "^3.1.1",
    "tsx": "^4.7.0"
  }
}
```

---

## 🎯 CURSOR/WINDSURF INSTRUCTIONS FILE

### **.cursorrules File**

Create this file in your project root:

```
# ============================================
# ZISTA PROJECT RULES FOR AI ASSISTANTS
# ============================================

## Tech Stack
- Next.js 14 (App Router with Server Components)
- TypeScript (strict mode)
- TailwindCSS + shadcn/ui for styling
- Prisma ORM with PostgreSQL
- NextAuth.js for authentication

## Code Style

### General Rules
- Use functional components (no class components)
- Prefer server components unless client interactivity is needed
- Use async/await over promises
- Extract complex logic to /lib/ functions
- Keep components under 200 lines
- Add TypeScript types for all function parameters and returns

### File Naming
- Components: PascalCase (Button.tsx, HoneyBalance.tsx)
- Utilities: camelCase (formatHoney.ts, earnHoney.ts)
- API routes: route.ts (Next.js convention)
- Pages: page.tsx (Next.js convention)

### Import Order
1. React imports
2. Third-party libraries
3. @/components imports
4. @/lib imports
5. @/types imports
6. Relative imports
7. CSS imports

Example:
```typescript
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { formatHoney } from '@/lib/utils/format';
import type { HoneyTransaction } from '@/types/honey';
import './styles.css';
```

### Component Structure
- Props interface first
- Main component function
- Helper functions after (or extract to /lib/)
- Styles using Tailwind utility classes

### Error Handling
- Always wrap API calls in try-catch
- Use Zod for input validation
- Return meaningful error messages
- Log errors with context

### Honey Economy Rules
- ALWAYS validate user session before Honey operations
- Log all Honey transactions to database
- Check daily limits before awarding Honey
- Never allow negative balances
- Validate Honey amounts (must be positive integers)

### API Route Pattern
Every API route must:
1. Check authentication
2. Validate input with Zod
3. Handle errors gracefully
4. Return consistent JSON responses
5. Log important actions

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

const Schema = z.object({
  field: z.string().min(1)
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const validated = Schema.safeParse(body);
  if (!validated.success) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    // Logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

### Database Queries
- Use Prisma for all database operations
- Always handle potential null returns
- Use transactions for multi-step operations
- Add indexes for frequently queried fields

### UI/UX Guidelines
- Mobile-first responsive design
- Use shadcn/ui components as base
- Extend with Tailwind utilities
- Add loading states for async operations
- Show error messages to users (don't fail silently)
- Use Framer Motion for animations (subtle, not excessive)

### Honey System Implementation
When implementing Honey features:
- Earning: Call `/api/honey/earn` endpoint
- Spending: Call `/api/honey/spend` endpoint
- Always check balance before spending
- Show "Insufficient Honey" modal if balance too low
- Update UI optimistically, rollback on error

### Tool Structure
Each tool must have:
- UI page at `/app/(dashboard)/tools/[tool-name]/page.tsx`
- API endpoint at `/app/api/tools/[tool-name]/route.ts`
- Business logic at `/lib/tools/[tool-name].ts`
- Honey unlock gate (10 Honey per use or watch ad)

### Security Best Practices
- Never expose API keys in client-side code
- Validate all user input
- Use environment variables for secrets
- Implement rate limiting on sensitive endpoints
- Sanitize file uploads
- Use HTTPS in production

### Performance
- Use Next.js Image component for images
- Lazy load heavy components with dynamic imports
- Implement pagination for long lists
- Cache API responses where appropriate
- Optimize database queries (use `select` to limit fields)

### Testing Requirements (Phase 2+)
- Write unit tests for utility functions
- Test API routes with sample requests
- Test Honey economy logic thoroughly
- E2E test critical user flows

## Don't Do These Things
❌ Don't use `any` type in TypeScript
❌ Don't commit .env.local to git
❌ Don't fetch data in client components (use server components)
❌ Don't store sensitive data in localStorage
❌ Don't use inline styles (use Tailwind)
❌ Don't create new UI components (use shadcn/ui first)
❌ Don't skip error handling
❌ Don't allow negative Honey balances
❌ Don't expose user emails publicly

## When Generating Code
1. Ask clarifying questions if requirements are unclear
2. Generate complete, working code (not pseudocode)
3. Include proper error handling
4. Add TypeScript types
5. Follow the patterns shown in this file
6. Add comments for complex logic
7. Suggest improvements if you see issues

## Example Prompts for Common Tasks

### Create a new tool:
"Create a new tool called [tool-name] that [description]. 
Follow the tool structure pattern with page.tsx, route.ts, 
and logic file. Include Honey unlock gate and error handling."

### Create an API endpoint:
"Create a POST endpoint at /api/[path] that [description]. 
Validate input with Zod, check authentication, and handle errors."

### Create a component:
"Create a [component-name] component that [description]. 
Use shadcn/ui components and Tailwind. Make it responsive."

### Debug an error:
"I'm getting [error message]. The code is [paste code]. 
Help me fix it following Zista patterns."

## Project Context
This is Zista, an all-in-one productivity app for Kenyan youth.
Core features:
- Tools (QR, calculators, downloaders, image processors)
- Learning (courses, books, certificates)
- Games (chess, quizzes, tournaments)
- Marketplace (products, services)
- Honey reward system (earn by engagement, spend to unlock)

Target users: 18-30 year old Kenyans
Monetization: Rewarded ads, marketplace commissions
Tech: Next.js 14, PostgreSQL, NextAuth, Vercel hosting
```

---

## 🧪 TESTING STRUCTURE (Phase 2+)

### **Test Organization**

```
zista/
├── __tests__/
│   ├── unit/
│   │   ├── lib/
│   │   │   ├── honey/
│   │   │   │   ├── earn.test.ts
│   │   │   │   └── spend.test.ts
│   │   │   └── utils/
│   │   │       └── format.test.ts
│   │   └── components/
│   │       └── HoneyBalance.test.tsx
│   │
│   ├── integration/
│   │   └── api/
│   │       ├── honey.test.ts
│   │       └── tools.test.ts
│   │
│   └── e2e/
│       ├── auth.spec.ts
│       ├── tools.spec.ts
│       └── honey.spec.ts
│
├── jest.config.js
└── playwright.config.ts
```

### **Example Unit Test**

```typescript
// __tests__/unit/lib/utils/format.test.ts
import { formatHoney } from '@/lib/utils/format';

describe('formatHoney', () => {
  it('formats small numbers correctly', () => {
    expect(formatHoney(10)).toBe('10');
    expect(formatHoney(100)).toBe('100');
  });

  it('adds commas for large numbers', () => {
    expect(formatHoney(1000)).toBe('1,000');
    expect(formatHoney(1000000)).toBe('1,000,000');
  });

  it('handles zero', () => {
    expect(formatHoney(0)).toBe('0');
  });
});
```

### **Example E2E Test**

```typescript
// __tests__/e2e/tools.spec.ts
import { test, expect } from '@playwright/test';

test('user can generate QR code', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name=email]', 'test@example.com');
  await page.click('button[type=submit]');

  // Navigate to QR generator
  await page.goto('/tools/qr-generator');

  // Generate QR
  await page.fill('[name=text]', 'https://zista.app');
  await page.click('button:has-text("Generate")');

  // Verify QR appears
  await expect(page.locator('img[alt="Generated QR Code"]')).toBeVisible();
});
```

---

## 📚 DOCUMENTATION STRUCTURE

### **Code Documentation**

**Function Documentation:**
```typescript
/**
 * Awards Honey to user after watching a rewarded ad
 * 
 * @param userId - User's unique identifier
 * @param adId - Ad network's ad identifier
 * @returns Object containing new balance and transaction ID
 * @throws Error if user not found or daily limit exceeded
 * 
 * @example
 * const result = await awardAdHoney('user-123', 'ad-456');
 * console.log(result.new_balance); // 1260
 */
export async function awardAdHoney(
  userId: string,
  adId: string
): Promise<{ new_balance: number; transaction_id: string }> {
  // Implementation
}
```

**Component Documentation:**
```typescript
/**
 * Displays user's Honey balance with animation
 * 
 * @component
 * @example
 * <HoneyBalance />
 */
export default function HoneyBalance() {
  // Implementation
}
```

---

## 🔄 GIT WORKFLOW

### **Branch Structure**

```
main            # Production (deploys to zista.app)
├── dev         # Development (deploys to dev.zista.app)
│   ├── feature/qr-generator
│   ├── feature/honey-system
│   ├── feature/ig-downloader
│   └── fix/auth-bug
```

### **Commit Message Format**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```bash
feat(tools): add QR code generator

Implemented QR code generation with Honey unlock gate.
Users can generate QR codes for text or URLs.

Closes #12

---

fix(honey): prevent negative balance

Added validation to check balance before spending.
Shows error modal if insufficient Honey.

Fixes #45

---

docs(readme): update setup instructions

Added environment variables section and deployment guide.
```

---

## 🚀 DEPLOYMENT STRUCTURE

### **Vercel Deployment**

**vercel.json (optional):**
```json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret"
  }
}
```

### **Docker Deployment (Self-hosting)**

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/zista
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=zista
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 📊 MONITORING & LOGGING

### **Logging Structure**

**lib/logger.ts:**
```typescript
import { NextRequest } from 'next/server';

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  userId?: string;
  action?: string;
  metadata?: Record<string, any>;
}

export function log(
  level: LogLevel,
  message: string,
  context?: LogContext
) {
  const timestamp = new Date().toISOString();
  
  const logEntry = {
    timestamp,
    level,
    message,
    ...context,
  };

  // Console log (captured by Vercel/Docker)
  console[level](JSON.stringify(logEntry));

  // Send to external service (Sentry, LogRocket, etc.)
  if (level === 'error' && process.env.NODE_ENV === 'production') {
    // Send to error tracking service
  }
}

// Convenience functions
export const logger = {
  info: (message: string, context?: LogContext) => 
    log('info', message, context),
  
  warn: (message: string, context?: LogContext) => 
    log('warn', message, context),
  
  error: (message: string, context?: LogContext) => 
    log('error', message, context),
};
```

**Usage in API Routes:**
```typescript
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  
  logger.info('User earned Honey', {
    userId: session?.user?.id,
    action: 'earn_ad',
    metadata: { amount: 10 },
  });
  
  try {
    // Logic
  } catch (error) {
    logger.error('Failed to award Honey', {
      userId: session?.user?.id,
      action: 'earn_ad',
      metadata: { error: error.message },
    });
  }
}
```

---

## ✅ CODE QUALITY CHECKLIST

### **Before Committing Code:**

**General:**
- [ ] Code follows naming conventions
- [ ] No console.log() statements (use logger)
- [ ] No commented-out code
- [ ] No unused imports
- [ ] TypeScript errors resolved
- [ ] ESLint warnings addressed

**Components:**
- [ ] Props have TypeScript interfaces
- [ ] Responsive design (mobile-first)
- [ ] Accessibility attributes (aria-labels)
- [ ] Loading states implemented
- [ ] Error states handled

**API Routes:**
- [ ] Authentication check present
- [ ] Input validation with Zod
- [ ] Error handling implemented
- [ ] Consistent response format
- [ ] Action logged

**Database:**
- [ ] Prisma schema updated if needed
- [ ] Migration created
- [ ] Indexes added for queries
- [ ] Foreign keys defined

**Tests (Phase 2+):**
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests updated

---

## 🎓 LEARNING RESOURCES FOR CODE STRUCTURE

**Next.js App Router:**
- https://nextjs.org/docs/app
- https://www.youtube.com/watch?v=gSSsZReIFRk (App Router Deep Dive)

**Prisma:**
- https://www.prisma.io/docs/concepts/components/prisma-schema
- https://www.youtube.com/watch?v=RebA5J-rlwg (Prisma Tutorial)

**TypeScript Patterns:**
- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- https://www.patterns.dev/ (Design Patterns)

**Code Organization:**
- https://blog.logrocket.com/best-practices-for-folder-structure-in-react/
- https://www.robinwieruch.de/react-folder-structure/

---

## 🎯 QUICK REFERENCE

### **Adding a New Tool**

1. Create page: `app/(dashboard)/tools/[tool-name]/page.tsx`
2. Create API: `app/api/tools/[tool-name]/route.ts`
3. Create logic: `lib/tools/[tool-name].ts`
4. Add to tools listing page
5. Test locally
6. Commit and deploy

### **Adding a New API Endpoint**

1. Create route file: `app/api/[path]/route.ts`
2. Add auth check
3. Add input validation (Zod)
4. Add error handling
5. Test with Postman/Thunder Client
6. Deploy

### **Adding a New Component**

1. Create file: `components/[category]/[ComponentName].tsx`
2. Define props interface
3. Implement component
4. Export default
5. Use in pages

### **Database Schema Change**

1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description`
3. Run `npx prisma generate`
4. Update TypeScript types if needed
5. Test locally
6. Deploy migration

---

## 🐝 FINAL NOTES

**This structure is designed for:**
- Solo developer productivity
- AI assistant compatibility (Cursor/Windsurf)
- Scalability (easy to add features)
- Maintainability (easy to find code)
- Best practices (industry standards)

**As Zista grows:**
- Split large files (> 300 lines)
- Extract repeated logic to utilities
- Add more tests
- Consider microservices (Phase 3+)
- Add more documentation

**Remember:**
- Code is read more than written (make it clear)
- Consistency beats perfection (stick to patterns)
- Document the "why", not the "what"
- Refactor when adding third feature (rule of three)

---
**Document End - Ready to Structure!**