# ZISTA API DESIGN PATTERNS
**Version:** 1.0  
**Date:** October 2025  
**Purpose:** Standard API patterns and best practices for Zista  
**For:** Backend development with Next.js API Routes

---

## 🎯 API Architecture Principles

**Core Principles:**
1. **Consistency** - All endpoints follow same patterns
2. **Predictability** - Developers know what to expect
3. **Security** - Auth and validation on every endpoint
4. **Documentation** - Self-documenting with TypeScript
5. **Error Handling** - Graceful, informative errors

---

## 📁 API STRUCTURE

```
app/api/
├── auth/
│   └── [...nextauth]/route.ts     # NextAuth handler
│
├── honey/
│   ├── balance/route.ts           # GET balance
│   ├── earn/route.ts              # POST earn Honey
│   ├── spend/route.ts             # POST spend Honey
│   ├── unlock/route.ts            # POST unlock forever
│   └── transactions/route.ts      # GET transaction history
│
├── tools/
│   ├── qr-generator/route.ts
│   ├── currency-converter/route.ts
│   └── [toolId]/route.ts          # Dynamic tool route
│
├── user/
│   ├── profile/route.ts           # GET/PUT profile
│   ├── settings/route.ts          # PUT settings
│   └── stats/route.ts             # GET user stats
│
└── admin/ (Phase 2+)
    ├── users/route.ts
    └── analytics/route.ts
```

---

## 🔐 AUTHENTICATION PATTERN

### **Every Protected Endpoint Must:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  // 1. Get session
  const session = await getServerSession(authOptions);
  
  // 2. Check if authenticated
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // 3. Use session.user.id in queries
  const userId = session.user.id;
  
  // ... rest of endpoint logic
}
```

**Why this pattern?**
- ✅ Consistent across all endpoints
- ✅ Fails early if not authenticated
- ✅ Provides user ID for queries
- ✅ TypeScript-safe

---

## ✅ INPUT VALIDATION PATTERN

### **Always Use Zod for Validation:**

```typescript
import { z } from 'zod';

// 1. Define schema
const RequestSchema = z.object({
  amount: z.number().positive().max(1000000),
  currency: z.string().length(3),
  description: z.string().min(1).max(500).optional(),
});

// 2. Validate in endpoint
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Parse body
  const body = await req.json();
  
  // Validate
  const validation = RequestSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { 
        error: 'Invalid input',
        details: validation.error.errors 
      },
      { status: 400 }
    );
  }

  // Use validated data
  const { amount, currency, description } = validation.data;
  
  // ... rest of logic
}
```

**Common Zod Patterns:**

```typescript
// String validations
z.string()
z.string().email()
z.string().url()
z.string().min(3).max(100)
z.string().regex(/^[a-zA-Z0-9]+$/)
z.string().optional()

// Number validations
z.number()
z.number().int()
z.number().positive()
z.number().min(0).max(100)
z.number().optional()

// Boolean
z.boolean()

// Enums
z.enum(['pending', 'completed', 'cancelled'])

// Arrays
z.array(z.string())
z.array(z.number()).min(1).max(10)

// Objects
z.object({
  name: z.string(),
  age: z.number().optional(),
})

// Dates
z.string().datetime()
z.date()

// File size (for uploads)
z.instanceof(File).refine(
  (file) => file.size <= 5 * 1024 * 1024,
  'File must be less than 5MB'
)
```

---

## 📤 RESPONSE PATTERNS

### **Success Response:**

```typescript
// Simple success
return NextResponse.json({ success: true });

// With data
return NextResponse.json({
  balance: 1250,
  total_earned: 5000,
});

// With metadata
return NextResponse.json({
  data: results,
  meta: {
    total: 100,
    page: 1,
    per_page: 20,
  },
});
```

---

### **Error Response:**

```typescript
// Standard error format
return NextResponse.json(
  { error: 'User-friendly message' },
  { status: 4xx or 5xx }
);

// With details
return NextResponse.json(
  { 
    error: 'Validation failed',
    details: [
      { field: 'email', message: 'Invalid email' },
      { field: 'amount', message: 'Must be positive' },
    ]
  },
  { status: 400 }
);

// With code (for programmatic handling)
return NextResponse.json(
  {
    error: 'Insufficient Honey',
    code: 'INSUFFICIENT_HONEY',
    required: 100,
    current: 50,
  },
  { status: 400 }
);
```

---

### **HTTP Status Codes:**

```typescript
// Success
200 - OK (GET, PUT, DELETE successful)
201 - Created (POST successful)
204 - No Content (DELETE successful, no body)

// Client Errors
400 - Bad Request (invalid input)
401 - Unauthorized (not logged in)
403 - Forbidden (logged in but no permission)
404 - Not Found (resource doesn't exist)
409 - Conflict (duplicate resource)
422 - Unprocessable Entity (semantic error)
429 - Too Many Requests (rate limit)

// Server Errors
500 - Internal Server Error (unexpected error)
503 - Service Unavailable (maintenance, overload)
```

---

## 🔄 CRUD PATTERNS

### **GET (Read)**

```typescript
// Get single resource
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const resource = await prisma.resource.findUnique({
    where: { id: params.id },
  });

  if (!resource) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Check ownership (if applicable)
  if (resource.user_id !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(resource);
}

// Get list with pagination
export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Parse query params
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;

  // Query database
  const [items, total] = await Promise.all([
    prisma.resource.findMany({
      where: { user_id: session.user.id },
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    prisma.resource.count({
      where: { user_id: session.user.id },
    }),
  ]);

  return NextResponse.json({
    data: items,
    meta: {
      total,
      page,
      per_page: limit,
      total_pages: Math.ceil(total / limit),
    },
  });
}
```

---

### **POST (Create)**

```typescript
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Validate input
  const body = await req.json();
  const validation = CreateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validation.error.errors },
      { status: 400 }
    );
  }

  // Create resource
  try {
    const resource = await prisma.resource.create({
      data: {
        ...validation.data,
        user_id: session.user.id,
      },
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Resource already exists' },
        { status: 409 }
      );
    }

    console.error('Create error:', error);
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}
```

---

### **PUT (Update)**

```typescript
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Check resource exists and ownership
  const existing = await prisma.resource.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (existing.user_id !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Validate input
  const body = await req.json();
  const validation = UpdateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validation.error.errors },
      { status: 400 }
    );
  }

  // Update resource
  const updated = await prisma.resource.update({
    where: { id: params.id },
    data: validation.data,
  });

  return NextResponse.json(updated);
}
```

---

### **DELETE (Remove)**

```typescript
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Check resource exists and ownership
  const existing = await prisma.resource.findUnique({
    where: { id: params.id },
  });

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (existing.user_id !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Delete resource
  await prisma.resource.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
  // OR return no content:
  // return new NextResponse(null, { status: 204 });
}
```

---

## 🍯 HONEY API PATTERNS

### **Earn Honey Endpoint**

```typescript
// POST /api/honey/earn
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { checkDailyLimit } from '@/lib/honey/limits';

const EarnSchema = z.object({
  amount: z.number().int().positive().max(100),
  source: z.enum(['login', 'ad', 'task', 'referral', 'game']),
  metadata: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Validate
  const body = await req.json();
  const validation = EarnSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { amount, source, metadata } = validation.data;

  // Check daily limits
  const canEarn = await checkDailyLimit(session.user.id, source, amount);
  if (!canEarn) {
    return NextResponse.json(
      { error: 'Daily limit exceeded', code: 'DAILY_LIMIT' },
      { status: 429 }
    );
  }

  // Award Honey (atomic transaction)
  const result = await prisma.$transaction(async (tx) => {
    // Update user balance
    const user = await tx.user.update({
      where: { id: session.user.id },
      data: {
        honey_balance: { increment: amount },
        total_honey_earned: { increment: amount },
      },
    });

    // Log transaction
    const transaction = await tx.honeyTransaction.create({
      data: {
        user_id: session.user.id,
        amount,
        type: `earn_${source}`,
        description: `Earned ${amount} Honey from ${source}`,
        metadata,
      },
    });

    return { user, transaction };
  });

  return NextResponse.json({
    new_balance: result.user.honey_balance,
    earned: amount,
    transaction_id: result.transaction.id,
  });
}
```

---

### **Spend Honey Endpoint**

```typescript
// POST /api/honey/spend
const SpendSchema = z.object({
  amount: z.number().int().positive(),
  item_type: z.enum(['tool', 'course', 'game', 'marketplace']),
  item_id: z.string(),
  description: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Validate
  const body = await req.json();
  const validation = SpendSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { amount, item_type, item_id, description } = validation.data;

  // Check balance
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { honey_balance: true },
  });

  if (user.honey_balance < amount) {
    return NextResponse.json(
      {
        error: 'Insufficient Honey',
        code: 'INSUFFICIENT_HONEY',
        required: amount,
        current: user.honey_balance,
      },
      { status: 400 }
    );
  }

  // Deduct Honey (atomic transaction)
  const result = await prisma.$transaction(async (tx) => {
    // Update user balance
    const updatedUser = await tx.user.update({
      where: { id: session.user.id },
      data: {
        honey_balance: { decrement: amount },
        total_honey_spent: { increment: amount },
      },
    });

    // Log transaction
    const transaction = await tx.honeyTransaction.create({
      data: {
        user_id: session.user.id,
        amount: -amount,
        type: `spend_${item_type}`,
        description: description || `Spent ${amount} Honey on ${item_type}`,
        metadata: { item_type, item_id },
      },
    });

    return { user: updatedUser, transaction };
  });

  return NextResponse.json({
    new_balance: result.user.honey_balance,
    spent: amount,
    transaction_id: result.transaction.id,
  });
}
```

---

## 🔒 AUTHORIZATION PATTERNS

### **Resource Ownership Check:**

```typescript
async function checkOwnership(resourceId: string, userId: string) {
  const resource = await prisma.resource.findUnique({
    where: { id: resourceId },
    select: { user_id: true },
  });

  if (!resource) {
    throw new Error('NOT_FOUND');
  }

  if (resource.user_id !== userId) {
    throw new Error('FORBIDDEN');
  }

  return true;
}

// Usage in endpoint
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await checkOwnership(params.id, session.user.id);
    
    // Proceed with query
    const data = await prisma.resource.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    throw error;
  }
}
```

---

### **Role-Based Access (Phase 2+):**

```typescript
// Middleware or helper function
function requireRole(role: 'user' | 'admin' | 'moderator') {
  return async (session: Session) => {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user.role !== role && user.role !== 'admin') {
      throw new Error('FORBIDDEN');
    }

    return true;
  };
}

// Usage
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await requireRole('admin')(session);
    
    // Admin-only logic
    // ...
  } catch (error) {
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    throw error;
  }
}
```

---

## ⚡ PERFORMANCE PATTERNS

### **Database Query Optimization:**

```typescript
// ❌ Bad: N+1 queries
const users = await prisma.user.findMany();
for (const user of users) {
  const honeyBalance = await prisma.honeyTransaction.aggregate({
    where: { user_id: user.id },
    _sum: { amount: true },
  });
}

// ✅ Good: Single query with aggregation
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    honey_balance: true,
    _count: {
      select: { transactions: true },
    },
  },
});
```

---

### **Caching Pattern:**

```typescript
// Cache external API calls
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currency = searchParams.get('currency');

  // Fetch with caching
  const response = await fetch(`https://api.exchange.com/${currency}`, {
    next: { 
      revalidate: 3600, // Cache for 1 hour
      tags: [`exchange-${currency}`] // For revalidation
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}

// Revalidate cache on demand
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  // Update data logic...
  
  // Revalidate cache
  revalidateTag('exchange-USD');
  
  return NextResponse.json({ success: true });
}
```

---

### **Pagination Pattern:**

```typescript
// Standard offset pagination
const page = parseInt(searchParams.get('page') || '1');
const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100); // Max 100
const skip = (page - 1) * limit;

const [items, total] = await Promise.all([
  prisma.resource.findMany({
    skip,
    take: limit,
    orderBy: { created_at: 'desc' },
  }),
  prisma.resource.count(),
]);

return NextResponse.json({
  data: items,
  meta: {
    total,
    page,
    per_page: limit,
    total_pages: Math.ceil(total / limit),
    has_more: skip + items.length < total,
  },
});
```

---

### **Rate Limiting Pattern:**

```typescript
// Using Upstash Redis
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
});

export async function POST(req: NextRequest) {
  // Get identifier (IP or user ID)
  const identifier = req.headers.get('x-forwarded-for') || 'anonymous';
  
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { 
        error: 'Too many requests',
        retry_after: Math.ceil((reset - Date.now()) / 1000),
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  }

  // Proceed with request...
}
```

---

## 🐛 ERROR HANDLING PATTERNS

### **Comprehensive Error Handler:**

```typescript
import { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Main logic
    const result = await someOperation();
    return NextResponse.json(result);

  } catch (error) {
    // Log to Sentry
    Sentry.captureException(error, {
      extra: {
        userId: session.user.id,
        endpoint: '/api/endpoint',
      },
    });

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Resource already exists' },
          { status: 409 }
        );
      }

      // Foreign key constraint violation
      if (error.code === 'P2003') {
        return NextResponse.json(
          { error: 'Related resource not found' },
          { status: 400 }
        );
      }

      // Record not found
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Resource not found' },
          { status: 404 }
        );
      }
    }

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Generic error
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 📝 API DOCUMENTATION PATTERN

### **TypeScript as Documentation:**

```typescript
/**
 * Earn Honey
 * 
 * @route POST /api/honey/earn
 * @access Protected
 * 
 * @body {number} amount - Honey amount (1-100)
 * @body {string} source - Earning source (login|ad|task|referral|game)
 * @body {object} [metadata] - Optional metadata
 * 
 * @returns {object} Response
 * @returns {number} Response.new_balance - Updated Honey balance
 * @returns {number} Response.earned - Amount earned
 * @returns {string} Response.transaction_id - Transaction ID
 * 
 * @throws {401} Unauthorized - Not authenticated
 * @throws {400} Invalid input - Validation failed
 * @throws {429} Daily limit exceeded - User hit earning cap
 * @throws {500} Internal server error - Unexpected error
 * 
 * @example
 * POST /api/honey/earn
 * Body: { "amount": 10, "source": "ad" }
 * 
 * Response: {
 *   "new_balance": 1260,
 *   "earned": 10,
 *   "transaction_id": "tx_abc123"
 * }
 */
export async function POST(req: NextRequest) {
  // Implementation
}
```

---

## 🧪 TESTING APIS

### **Manual Testing with Thunder Client (VS Code):**

```json
// Save as thunder-tests/earn-honey.json
{
  "name": "Earn Honey",
  "method": "POST",
  "url": "http://localhost:3000/api/honey/earn",
  "headers": [
    {
      "name": "Content-Type",
      "value": "application/json"
    }
  ],
  "body": {
    "type": "json",
    "raw": {
      "amount": 10,
      "source": "ad",
      "metadata": {
        "ad_id": "ad_123"
      }
    }
  }
}
```

---

### **Automated Tests (Phase 2+):**

```typescript
// __tests__/api/honey.test.ts
import { POST } from '@/app/api/honey/earn/route';
import { NextRequest } from 'next/server';

// Mock NextAuth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => Promise.resolve({
    user: { id: 'user-123', email: 'test@example.com' }
  }))
}));

describe('POST /api/honey/earn', () => {
  it('awards Honey successfully', async () => {
    const req = new NextRequest('http://localhost:3000/api/honey/earn', {
      method: 'POST',
      body: JSON.stringify({ amount: 10, source: 'ad' }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.earned).toBe(10);
    expect(data.new_balance).toBeGreaterThan(0);
  });

  it('rejects invalid amount', async () => {
    const req = new NextRequest('http://localhost:3000/api/honey/earn', {
      method: 'POST',
      body: JSON.stringify({ amount: -10, source: 'ad' }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });
});
```

---

## ✅ API CHECKLIST

Before deploying any API endpoint:

**Security:**
- [ ] Authentication check implemented
- [ ] Input validation with Zod
- [ ] Authorization check (if resource-specific)
- [ ] Rate limiting considered (for heavy endpoints)
- [ ] SQL injection prevented (Prisma handles this)
- [ ] XSS prevented (don't render user input as HTML)

**Functionality:**
- [ ] Happy path works
- [ ] Edge cases handled
- [ ] Errors return appropriate status codes
- [ ] Response format is consistent
- [ ] Database transactions used (if multi-step)

**Performance:**
- [ ] No N+1 queries
- [ ] Indexes exist for queried fields
- [ ] External API calls are cached
- [ ] Large result sets are paginated

**Observability:**
- [ ] Errors logged to Sentry
- [ ] Important actions tracked in PostHog
- [ ] Database queries logged (in dev)
- [ ] Performance monitored

**Documentation:**
- [ ] JSDoc comment added
- [ ] TypeScript types defined
- [ ] Example request/response provided

---

## 🎯 QUICK REFERENCE

### **Standard Endpoint Template:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const Schema = z.object({
  // Define schema
});

export async function POST(req: NextRequest) {
  // 1. Auth check
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Validation
  const body = await req.json();
  const validation = Schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validation.error.errors },
      { status: 400 }
    );
  }

  // 3. Business logic
  try {
    const result = await prisma.model.create({
      data: {
        ...validation.data,
        user_id: session.user.id,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Operation failed' },
      { status: 500 }
    );
  }
}
```

---

**Document End - API Patterns Ready!**

*Save this file as: `Z-Star/Docs/Zista_API_Design_Patterns.md`*