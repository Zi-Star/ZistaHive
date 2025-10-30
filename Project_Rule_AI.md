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