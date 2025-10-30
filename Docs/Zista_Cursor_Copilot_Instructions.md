# ZISTA - CURSOR/WINDSURF AI INSTRUCTIONS
**Version:** 1.0  
**Date:** October 2025  
**Purpose:** Comprehensive instructions for AI coding assistants  
**For:** Cursor, Windsurf, and other AI-powered IDEs

---

## 🎯 PROJECT OVERVIEW

**Project Name:** Zista  
**Description:** All-in-one productivity web app for Kenyan youth  
**Core Features:** Tools, Learning, Games, Marketplace, Honey rewards  
**Target Users:** 18-30 year old Kenyans  
**Tech Stack:** Next.js 14, TypeScript, PostgreSQL, Prisma, NextAuth  

---

## 📁 PROJECT STRUCTURE

```
zista/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Auth routes (login, register)
│   │   ├── (dashboard)/          # Protected routes (tools, profile)
│   │   ├── api/                  # API endpoints
│   │   └── page.tsx              # Landing page
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── tools/                # Tool-specific components
│   │   ├── honey/                # Honey system components
│   │   └── shared/               # Generic shared components
│   │
│   ├── lib/                      # Business logic
│   │   ├── prisma.ts             # Prisma client
│   │   ├── honey/                # Honey economy logic
│   │   ├── tools/                # Tool processing logic
│   │   └── utils/                # Generic utilities
│   │
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript types
│   └── middleware.ts             # Next.js middleware
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── public/                       # Static assets
├── .cursorrules                  # THIS FILE (Cursor instructions)
├── .env.local                    # Environment variables (NOT committed)
└── package.json
```

---

## 🛠️ TECH STACK DETAILS

### **Frontend**
- **Framework:** Next.js 14 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS + shadcn/ui components
- **Animations:** Framer Motion (subtle, purposeful)
- **Icons:** Lucide React
- **State Management:** React hooks (useState, useContext)

### **Backend**
- **API:** Next.js API Routes (in `/app/api/`)
- **Database:** PostgreSQL (Neon or Supabase)
- **ORM:** Prisma (type-safe queries)
- **Auth:** NextAuth.js (Google OAuth + Email)
- **Validation:** Zod schemas

### **Infrastructure**
- **Hosting:** Vercel (frontend + API routes)
- **Storage:** Cloudflare R2 (S3-compatible)
- **Analytics:** PostHog (event tracking)
- **Errors:** Sentry (error monitoring)
- **AI:** Groq (free tier) or OpenAI

---

## 📋 CODE STYLE GUIDELINES

### **Naming Conventions**

```typescript
// Files
ComponentName.tsx          // React components (PascalCase)
utilityFunction.ts         // Utilities (camelCase)
route.ts                   // API routes (Next.js convention)
page.tsx                   // Pages (Next.js convention)

// Variables & Functions
const userName = "John";   // camelCase
function getUserData() {}  // camelCase, verb-first

// Constants
const MAX_HONEY = 100;     // UPPER_SNAKE_CASE
const API_URL = "...";

// Types & Interfaces
interface User {}          // PascalCase
type HoneyTransaction = {}

// Folders
tools/qr-generator/        // kebab-case
```

---

### **Import Order**

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import { useSession } from 'next-auth/react';
import { z } from 'zod';

// 3. @/components imports
import { Button } from '@/components/ui/button';
import HoneyBalance from '@/components/honey/HoneyBalance';

// 4. @/lib imports
import { formatHoney } from '@/lib/utils/format';
import { earnHoney } from '@/lib/honey/earn';

// 5. @/types imports
import type { User, HoneyTransaction } from '@/types';

// 6. Relative imports
import { localHelper } from './helpers';

// 7. CSS/styles (if any)
import './styles.css';
```

---

### **TypeScript Rules**

```typescript
// ✅ DO: Always define types
interface Props {
  name: string;
  age?: number;
}

// ✅ DO: Use type inference when obvious
const count = 0; // TypeScript infers number

// ❌ DON'T: Use 'any' type
const data: any = fetchData(); // ❌ Bad

// ✅ DO: Use proper types or 'unknown'
const data: User = fetchData();
// OR
const data: unknown = fetchData();
if (isUser(data)) {
  // Type guard
}

// ✅ DO: Define function return types for complex functions
async function fetchUser(id: string): Promise<User | null> {
  // ...
}

// ✅ DO: Use enums or union types for fixed values
type HoneySource = 'login' | 'ad' | 'task' | 'referral';
```

---

## 🏗️ COMPONENT PATTERNS

### **Server Components (Default)**

```typescript
// app/(dashboard)/tools/page.tsx
import { prisma } from '@/lib/prisma';
import ToolCard from '@/components/tools/ToolCard';

export default async function ToolsPage() {
  // Fetch data on server
  const tools = await prisma.tool.findMany({
    orderBy: { usage_count: 'desc' },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} {...tool} />
      ))}
    </div>
  );
}
```

**When to use Server Components:**
- Fetching data from database
- No user interactions (clicks, forms)
- SEO-important content

---

### **Client Components (When Needed)**

```typescript
'use client'; // ⚠️ Add this directive at top

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function InteractiveTool() {
  const [count, setCount] = useState(0);

  return (
    <Button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
  );
}
```

**When to use Client Components:**
- User interactions (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (localStorage, window)
- Third-party libraries that need browser

---

### **Component Structure**

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import type { ToolProps } from '@/types/tools';

// 1. Props interface (always define)
interface QRGeneratorProps {
  initialText?: string;
  onGenerate?: (qrUrl: string) => void;
}

// 2. Main component function
export default function QRGenerator({
  initialText = '',
  onGenerate,
}: QRGeneratorProps) {
  // 3. Hooks (at top, in order)
  const [text, setText] = useState(initialText);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 4. Event handlers
  const handleGenerate = async () => {
    if (!text) {
      toast({
        title: 'Error',
        description: 'Please enter text',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/tools/qr-generator', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      onGenerate?.(data.qrUrl);
      
      toast({
        title: 'Success!',
        description: 'QR code generated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate QR code',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // 5. Render
  return (
    <div className="space-y-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        className="w-full"
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate QR Code'}
      </Button>
    </div>
  );
}
```

---

## 🔌 API ROUTE PATTERNS

### **Standard API Route Template**

```typescript
// app/api/endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// 1. Define validation schema
const RequestSchema = z.object({
  field1: z.string().min(1),
  field2: z.number().optional(),
});

// 2. Export HTTP method handlers
export async function POST(req: NextRequest) {
  try {
    // 3. Check authentication
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 4. Parse and validate input
    const body = await req.json();
    const validation = RequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    // 5. Business logic
    const result = await prisma.model.create({
      data: {
        ...validation.data,
        user_id: session.user.id,
      },
    });

    // 6. Return success response
    return NextResponse.json(result);

  } catch (error) {
    // 7. Error handling
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Similar pattern for GET requests
}
```

**CRITICAL API Rules:**
1. ✅ **ALWAYS** check authentication first
2. ✅ **ALWAYS** validate input with Zod
3. ✅ **ALWAYS** use try-catch for error handling
4. ✅ **ALWAYS** return consistent response format
5. ✅ **NEVER** expose internal error details to client

---

## 🍯 HONEY SYSTEM RULES

### **Critical Honey Rules (NEVER VIOLATE)**

1. **ALWAYS validate user session before Honey operations**
   ```typescript
   const session = await getServerSession();
   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   ```

2. **ALWAYS log Honey transactions to database**
   ```typescript
   await prisma.honeyTransaction.create({
     data: {
       user_id: userId,
       amount: 10,
       type: 'earn_ad',
       description: 'Watched rewarded ad',
     },
   });
   ```

3. **ALWAYS check daily earning limits**
   ```typescript
   const todayEarned = await getTodayEarnings(userId, 'ad');
   if (todayEarned >= 100) {
     return NextResponse.json({ error: 'Daily limit exceeded' }, { status: 429 });
   }
   ```

4. **NEVER allow negative Honey balances**
   ```typescript
   if (user.honey_balance < amount) {
     return NextResponse.json({
       error: 'Insufficient Honey',
       code: 'INSUFFICIENT_HONEY',
     }, { status: 400 });
   }
   ```

5. **ALWAYS use database transactions for Honey operations**
   ```typescript
   await prisma.$transaction([
     prisma.user.update({
       where: { id: userId },
       data: { honey_balance: { increment: 10 } },
     }),
     prisma.honeyTransaction.create({
       data: { /* ... */ },
     }),
   ]);
   ```

---

### **Honey Hook Pattern**

```typescript
// hooks/useHoney.ts
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useHoney() {
  const { data: session } = useSession();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) fetchBalance();
  }, [session]);

  async function fetchBalance() {
    try {
      const res = await fetch('/api/honey/balance');
      const data = await res.json();
      setBalance(data.balance);
    } finally {
      setLoading(false);
    }
  }

  async function spendHoney(amount: number, item: string) {
    if (balance < amount) return false;

    try {
      const res = await fetch('/api/honey/spend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, item }),
      });

      const data = await res.json();
      setBalance(data.new_balance);
      return true;
    } catch {
      return false;
    }
  }

  return { balance, loading, spendHoney, fetchBalance };
}
```

---

## 🎨 STYLING GUIDELINES

### **Tailwind Best Practices**

```typescript
// ✅ DO: Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ✅ DO: Use responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ✅ DO: Use Zista color palette
<div className="bg-golden-honey text-deep-indigo">

// ✅ DO: Group related utilities
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">

// ❌ DON'T: Use arbitrary values excessively
<div className="w-[347px]"> // ❌ Bad

// ✅ DO: Use standard spacing scale
<div className="w-80"> // ✅ Good (320px)

// ✅ DO: Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes'
)}>
```

---

### **Responsive Design Pattern**

```typescript
// Mobile-first approach (default = mobile)
<div className="
  p-4              // Mobile: 16px padding
  md:p-6           // Tablet: 24px padding
  lg:p-8           // Desktop: 32px padding
  
  text-sm          // Mobile: small text
  md:text-base     // Tablet: normal text
  lg:text-lg       // Desktop: large text
  
  grid-cols-1      // Mobile: 1 column
  md:grid-cols-2   // Tablet: 2 columns
  lg:grid-cols-3   // Desktop: 3 columns
">
```

---

## 🗄️ DATABASE PATTERNS

### **Prisma Best Practices**

```typescript
// ✅ DO: Select only needed fields
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    name: true,
    honey_balance: true,
  },
});

// ❌ DON'T: Fetch all fields when not needed
const user = await prisma.user.findUnique({
  where: { id: userId },
}); // Fetches ALL fields

// ✅ DO: Use transactions for multi-step operations
await prisma.$transaction([
  prisma.user.update({
    where: { id: userId },
    data: { honey_balance: { increment: 10 } },
  }),
  prisma.honeyTransaction.create({
    data: { /* ... */ },
  }),
]);

// ✅ DO: Use proper relations
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    transactions: {
      take: 10,
      orderBy: { created_at: 'desc' },
    },
  },
});

// ✅ DO: Handle null/undefined properly
const user = await prisma.user.findUnique({
  where: { id: userId },
});

if (!user) {
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}

// Now TypeScript knows user is not null
```

---

## 🎯 WHEN TO USE WHAT

### **Client vs Server Components**

| Feature | Use Client Component | Use Server Component |
|---------|---------------------|---------------------|
| Fetch data | ❌ | ✅ |
| User interactions | ✅ | ❌ |
| Forms | ✅ | ❌ |
| useState/useEffect | ✅ | ❌ |
| SEO content | ❌ | ✅ |
| Browser APIs | ✅ | ❌ |

---

### **When to Create New Component**

Create a new component when:
- ✅ Code is used in 3+ places (rule of three)
- ✅ Component is complex (>100 lines)
- ✅ Logic is self-contained
- ✅ Testing would be easier in isolation

Keep inline when:
- ❌ Used only once
- ❌ Tightly coupled to parent
- ❌ Very simple (< 20 lines)

---

## 🐛 ERROR HANDLING

### **Frontend Error Handling**

```typescript
'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function Component() {
  const { toast } = useToast();

  const handleAction = async () => {
    try {
      const res = await fetch('/api/endpoint', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      // Check HTTP status
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Request failed');
      }

      const result = await res.json();
      
      // Success notification
      toast({
        title: 'Success!',
        description: 'Operation completed',
      });
      
    } catch (error) {
      // Error notification
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return <button onClick={handleAction}>Do Something</button>;
}
```

---

### **Backend Error Handling**

```typescript
import { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

export async function POST(req: NextRequest) {
  try {
    // Main logic
    const result = await operation();
    return NextResponse.json(result);

  } catch (error) {
    // Log to Sentry
    Sentry.captureException(error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Resource already exists' },
          { status: 409 }
        );
      }
    }

    // Generic error
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 🚀 COMMON TASKS & PROMPTS

### **Task: Create a New Tool**

**Prompt for AI:**
```
Create a new tool for Zista called "[TOOL_NAME]" that [DESCRIPTION].

Requirements:
1. Frontend page at app/(dashboard)/tools/[tool-id]/page.tsx
   - Use ToolLayout component
   - Inputs: [list inputs]
   - Output: [describe output]
   - Honey cost: [0, 10, or 200]
   
2. Backend API at app/api/tools/[tool-id]/route.ts
   - Validate input with Zod
   - Check authentication
   - Return result or error
   
3. Business logic at lib/tools/[tool-id].ts
   - Main processing function
   - Error handling
   - TypeScript types

Follow the patterns in Zista_Tool_Implementation_Guide.md.
Use shadcn/ui components and Tailwind styling.
Add proper error handling and loading states.
```

---

### **Task: Add Honey Integration**

**Prompt for AI:**
```
Add Honey integration to [COMPONENT_NAME]:

1. Import useHoney hook from @/hooks/useHoney
2. Check user's Honey balance
3. Call spendHoney(amount, item) before performing action
4. If insufficient Honey:
   - Show modal with options:
     * Watch ad to earn Honey
     * Unlock forever (if applicable)
     * View Honey balance
5. Handle errors gracefully

Follow the Honey patterns in Zista_Honey_Economy_Complete.md.
```

---

### **Task: Fix a Bug**

**Prompt for AI:**
```
Fix the following bug in [FILE_NAME]:

Error: [ERROR_MESSAGE]
Current code: [PASTE CODE]

Please:
1. Identify the root cause
2. Fix the issue
3. Add better error handling
4. Add user-friendly error messages
5. Ensure TypeScript types are correct

Follow Zista error handling patterns.
```

---

### **Task: Optimize Performance**

**Prompt for AI:**
```
Optimize [COMPONENT/API] for better performance:

Current issues:
- [Describe performance problem]

Please:
1. Add loading states (skeleton, spinner)
2. Implement caching if applicable
3. Optimize database queries (select only needed fields)
4. Add debouncing to inputs (if real-time)
5. Lazy load heavy components

Target: < 2 seconds load time
Follow Next.js performance best practices.
```

---

## ⚠️ CRITICAL DON'Ts

### **NEVER DO THESE:**

1. ❌ **NEVER use `any` type in TypeScript**
   ```typescript
   // ❌ Bad
   const data: any = fetchData();
   
   // ✅ Good
   const data: User = fetchData();
   ```

2. ❌ **NEVER commit `.env.local` to git**
   - Environment variables must stay local
   - Use `.env.example` as template

3. ❌ **NEVER fetch data in Client Components**
   ```typescript
   // ❌ Bad
   'use client';
   const data = await fetch('/api/data');
   
   // ✅ Good - Use Server Component
   // (no 'use client' directive)
   const data = await fetch('/api/data');
   ```

4. ❌ **NEVER skip authentication checks in API routes**
   ```typescript
   // ❌ Bad
   export async function POST(req) {
     // Directly process without auth check
   }
   
   // ✅ Good
   export async function POST(req) {
     const session = await getServerSession();
     if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }
   ```

5. ❌ **NEVER allow negative Honey balances**
   ```typescript
   // ❌ Bad
   await prisma.user.update({
     data: { honey_balance: { decrement: amount } },
   });
   
   // ✅ Good
   if (user.honey_balance < amount) {
     return NextResponse.json({ error: 'Insufficient Honey' }, { status: 400 });
   }
   await prisma.user.update({
     data: { honey_balance: { decrement: amount } },
   });
   ```

6. ❌ **NEVER use inline styles (use Tailwind)**
   ```typescript
   // ❌ Bad
   <div style={{ padding: '16px', backgroundColor: '#fff' }}>
   
   // ✅ Good
   <div className="p-4 bg-white">
   ```

7. ❌ **NEVER skip input validation**
   ```typescript
   // ❌ Bad
   const { amount } = await req.json();
   // Use amount directly
   
   // ✅ Good
   const Schema = z.object({ amount: z.number().positive() });
   const validation = Schema.safeParse(await req.json());
   if (!validation.success) return error;
   ```

8. ❌ **NEVER expose sensitive data in API responses**
   ```typescript
   // ❌ Bad
   return NextResponse.json(user); // Includes password hash, etc.
   
   // ✅ Good
   return NextResponse.json({
     id: user.id,
     name: user.name,
     email: user.email,
   });
   ```

---

## ✅ ALWAYS DO THESE

### **MUST DO:**

1. ✅ **ALWAYS define TypeScript types for props**
   ```typescript
   interface Props {
     name: string;
     age?: number;
   }
   ```

2. ✅ **ALWAYS use Zod for input validation**
   ```typescript
   const Schema = z.object({ /* ... */ });
   const validation = Schema.safeParse(input);
   ```

3. ✅ **ALWAYS handle errors gracefully**
   ```typescript
   try {
     // Operation
   } catch (error) {
     // Log and return user-friendly message
   }
   ```

4. ✅ **ALWAYS use database transactions for multi-step operations**
   ```typescript
   await prisma.$transaction([
     operation1,
     operation2,
   ]);
   ```

5. ✅ **ALWAYS add loading states to async operations**
   ```typescript
   const [loading, setLoading] = useState(false);
   // Show spinner while loading
   ```

6. ✅ **ALWAYS use semantic HTML**
   ```typescript
   <button> for buttons
   <a> for links
   <form> for forms (but NOT in React artifacts!)
   ```

7. ✅ **ALWAYS make components responsive**
   ```typescript
   <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   ```

8. ✅ **ALWAYS log important actions**
   ```typescript
   console.log('User earned Honey:', { userId, amount });
   ```

---

## 🎓 LEARNING RESOURCES

When unsure about something, reference these docs:

**Zista-specific:**
- `Zista_Product_Brief.md` - What we're building
- `Zista_Code_Structure.md` - How code is organized
- `Zista_Tool_Implementation_Guide.md` - How to build tools
- `Zista_API_Design_Patterns.md` - How to build APIs
- `Zista_Honey_Economy_Complete.md` - How Honey works

**Technology docs:**
- Next.js: https://nextjs.org/docs
- Prisma: https://prisma.io/docs
- TailwindCSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com
- Zod: https://zod.dev

---

## 🤖 AI ASSISTANT CAPABILITIES

### **What AI Can Do Well:**

✅ Generate boilerplate code  
✅ Create components from descriptions  
✅ Write API endpoints following patterns  
✅ Add TypeScript types  
✅ Refactor code for clarity  
✅ Find and fix bugs  
✅ Write documentation  
✅ Suggest optimizations  

### **What AI Needs Guidance On:**

⚠️ Business logic decisions  
⚠️ Database schema changes  
⚠️ Architecture decisions  
⚠️ Security considerations  
⚠️ Performance trade-offs  
⚠️ UX/UI design choices  

**Always review AI-generated code for:**
- Security vulnerabilities
- Performance issues
- Edge cases
- Error handling
- TypeScript correctness

---

## 🎯 FINAL CHECKLIST

Before committing any AI-generated code:

- [ ] Code follows naming conventions
- [ ] TypeScript has no errors
- [ ] Components are properly structured
- [ ] API routes have auth checks
- [ ] Input validation exists (Zod)
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Responsive design works
- [ ] No `any` types used
- [ ] No sensitive data exposed
- [ ] Honey rules followed (if applicable)
- [ ] Code is readable and maintainable

---

## 🐝 THE ZISTA WAY

**Remember:**
- Quality over speed
- User experience first
- Security is non-negotiable
- Honey economy must be fair
- Mobile users are important
- Errors should be helpful
- Code should be maintainable

**When in doubt:**
- Check existing patterns
- Follow TypeScript
- Ask for clarification
- Test thoroughly
- Document your changes
---
**Document End - AI Instructions Complete!**
- * (Any AI IDE automatically reads this)*
