# ZISTA TOOL IMPLEMENTATION GUIDE
**Version:** 1.0  
**Date:** October 2025  
**Purpose:** Step-by-step guide to build any tool for Zista  
**For:** Solo developer using Cursor/Windsurf AI assistants

---

## 🎯 Tool Architecture Overview

Every Zista tool follows this **3-file pattern:**

```
1. Frontend (UI)     → app/(dashboard)/tools/[tool-name]/page.tsx
2. Backend (API)     → app/api/tools/[tool-name]/route.ts
3. Logic (Business)  → lib/tools/[tool-name].ts
```

**Why this pattern?**
- ✅ Separation of concerns (UI, API, Logic)
- ✅ Easy to test each layer
- ✅ AI assistants understand it well
- ✅ Reusable logic across tools
- ✅ Consistent user experience

---

## 📋 TOOL CHECKLIST

Before building, every tool needs:

**Requirements:**
- [ ] Clear name (QR Generator, Age Calculator, etc.)
- [ ] One-sentence description
- [ ] Input fields defined
- [ ] Output format defined
- [ ] Honey cost decided (0, 10, or 200)
- [ ] Error cases identified

**Technical:**
- [ ] Required libraries identified
- [ ] API limits known (if using external API)
- [ ] File size limits defined (if file upload)
- [ ] Processing time estimated

**User Experience:**
- [ ] Loading state planned
- [ ] Error messages written
- [ ] Success state designed
- [ ] Empty state designed

---

## 🛠️ STEP-BY-STEP: BUILD A TOOL

### **STEP 1: Plan the Tool**

**Example: Currency Converter**

**Requirements:**
- Name: Currency Converter
- Description: Convert between 150+ world currencies
- Inputs:
  - Amount (number)
  - From currency (dropdown)
  - To currency (dropdown)
- Output:
  - Converted amount
  - Exchange rate
  - Last updated time
- Honey cost: FREE (promote engagement)
- External API: exchangerate-api.com (free tier)

**Error cases:**
- Invalid amount (negative, zero, too large)
- API fails (network error)
- Unsupported currency

---

### **STEP 2: Create Frontend (UI)**

**File:** `app/(dashboard)/tools/currency-converter/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import ToolLayout from '@/components/tools/ToolLayout';
import { Loader2, ArrowRight } from 'lucide-react';

const currencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  // Add more currencies...
];

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('KES');
  const [result, setResult] = useState<{
    converted: number;
    rate: number;
    timestamp: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleConvert = async () => {
    // Validation
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid positive number',
        variant: 'destructive',
      });
      return;
    }

    if (fromCurrency === toCurrency) {
      toast({
        title: 'Same currency',
        description: 'Please select different currencies',
        variant: 'destructive',
      });
      return;
    }

    // Call API
    setLoading(true);
    try {
      const res = await fetch('/api/tools/currency-converter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numAmount,
          from: fromCurrency,
          to: toCurrency,
        }),
      });

      if (!res.ok) {
        throw new Error('Conversion failed');
      }

      const data = await res.json();
      setResult(data);
      
      toast({
        title: 'Conversion successful!',
        description: `${numAmount} ${fromCurrency} = ${data.converted.toFixed(2)} ${toCurrency}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to convert currency. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Currency Converter"
      description="Convert between 150+ world currencies with real-time exchange rates"
      honeyCost={0} // Free tool
      category="Calculators"
    >
      <Card>
        <CardHeader>
          <CardTitle>Convert Currency</CardTitle>
          <CardDescription>Enter amount and select currencies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* From Currency */}
          <div>
            <label className="text-sm font-medium">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.flag} {curr.code} - {curr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button (Optional) */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To Currency */}
          <div>
            <label className="text-sm font-medium">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.flag} {curr.code} - {curr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Convert Button */}
          <Button
            onClick={handleConvert}
            disabled={loading || !amount}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Converting...
              </>
            ) : (
              'Convert'
            )}
          </Button>

          {/* Result Display */}
          {result && (
            <Card className="bg-golden-honey/10 border-golden-honey">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {amount} {fromCurrency} =
                  </p>
                  <p className="text-3xl font-bold text-golden-honey my-2">
                    {result.converted.toFixed(2)} {toCurrency}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Rate: 1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated: {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
```

**Key Frontend Patterns:**

1. **State Management:**
   - Use `useState` for form inputs
   - Use `useState` for loading/result states
   - Keep state minimal

2. **Validation:**
   - Validate client-side before API call
   - Show friendly error messages
   - Disable button during loading

3. **User Feedback:**
   - Loading spinner while processing
   - Toast notifications for success/error
   - Clear result display

4. **Responsive Design:**
   - Use Tailwind responsive classes
   - Test on mobile view
   - Stack elements vertically on small screens

---

### **STEP 3: Create Backend (API)**

**File:** `app/api/tools/currency-converter/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { convertCurrency } from '@/lib/tools/currency-converter';
import { trackToolUsage } from '@/lib/analytics/tracking';

// Input validation schema
const CurrencySchema = z.object({
  amount: z.number().positive().max(1000000000),
  from: z.string().length(3),
  to: z.string().length(3),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Parse and validate input
    const body = await req.json();
    const validation = CurrencySchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { amount, from, to } = validation.data;

    // 3. Check if same currency
    if (from === to) {
      return NextResponse.json(
        { error: 'Cannot convert same currency' },
        { status: 400 }
      );
    }

    // 4. Perform conversion
    const result = await convertCurrency(amount, from, to);

    // 5. Track usage (analytics)
    await trackToolUsage({
      userId: session.user.id,
      toolId: 'currency_converter',
      metadata: { from, to, amount },
    });

    // 6. Return result
    return NextResponse.json(result);

  } catch (error) {
    console.error('Currency conversion error:', error);
    
    return NextResponse.json(
      { error: 'Conversion failed. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint (optional - for supported currencies list)
export async function GET() {
  try {
    const currencies = await getSupportedCurrencies();
    return NextResponse.json({ currencies });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch currencies' },
      { status: 500 }
    );
  }
}
```

**Key Backend Patterns:**

1. **Always Check Auth:**
   - Every API route must verify session
   - Return 401 if not authenticated
   - Include user ID in logs

2. **Validate Input:**
   - Use Zod for schema validation
   - Return 400 with details on invalid input
   - Sanitize user input

3. **Error Handling:**
   - Wrap everything in try-catch
   - Log errors with context
   - Return user-friendly messages (don't expose internals)

4. **Consistent Response Format:**
   ```typescript
   // Success
   { converted: 135000, rate: 135, timestamp: "2025..." }
   
   // Error
   { error: "Message here", details?: {...} }
   ```

---

### **STEP 4: Create Business Logic**

**File:** `lib/tools/currency-converter.ts`

```typescript
// External API client
interface ExchangeRateResponse {
  result: string;
  conversion_rate: number;
  conversion_result: number;
  time_last_update_utc: string;
}

/**
 * Converts amount from one currency to another
 * Uses exchangerate-api.com free tier
 * 
 * @param amount - Amount to convert
 * @param from - Source currency code (3 letters)
 * @param to - Target currency code (3 letters)
 * @returns Conversion result with rate and timestamp
 */
export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<{
  converted: number;
  rate: number;
  timestamp: string;
}> {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY || 'free-tier';
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data: ExchangeRateResponse = await response.json();

    if (data.result !== 'success') {
      throw new Error('API request failed');
    }

    return {
      converted: data.conversion_result,
      rate: data.conversion_rate,
      timestamp: data.time_last_update_utc,
    };
  } catch (error) {
    console.error('Exchange rate API error:', error);
    throw new Error('Failed to fetch exchange rates');
  }
}

/**
 * Gets list of supported currencies
 * Cached for 24 hours
 */
export async function getSupportedCurrencies(): Promise<string[]> {
  // In production, fetch from API
  // For MVP, return hardcoded list
  return [
    'USD', 'EUR', 'GBP', 'JPY', 'CNY',
    'KES', 'UGX', 'TZS', 'ZAR', 'NGN',
    // ... more currencies
  ];
}
```

**Key Logic Patterns:**

1. **Single Responsibility:**
   - Each function does ONE thing
   - Keep functions under 50 lines
   - Extract complex logic to helpers

2. **Error Handling:**
   - Try-catch around external calls
   - Throw meaningful errors
   - Let API route handle errors

3. **Caching:**
   - Use Next.js `fetch` caching
   - Cache stable data (exchange rates: 1 hour)
   - Don't cache user-specific data

4. **Documentation:**
   - JSDoc comments for public functions
   - Describe parameters and return values
   - Include examples

---

## 🎨 COMMON TOOL PATTERNS

### **Pattern 1: File Upload Tool**

**Example:** Image Compressor, PDF Merger

**Frontend:**
```typescript
'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleCompress = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/tools/image-compressor', {
      method: 'POST',
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setCompressed(url);
  };

  return (
    <div>
      {/* Dropzone */}
      <div {...getRootProps()} className="border-2 border-dashed p-8">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop image here...</p>
        ) : (
          <p>Drag & drop image, or click to select</p>
        )}
      </div>

      {/* Preview & Compress */}
      {file && (
        <>
          <img src={URL.createObjectURL(file)} alt="Original" />
          <Button onClick={handleCompress}>Compress</Button>
        </>
      )}

      {/* Result */}
      {compressed && (
        <>
          <img src={compressed} alt="Compressed" />
          <Button asChild>
            <a href={compressed} download="compressed.jpg">
              Download
            </a>
          </Button>
        </>
      )}
    </div>
  );
}
```

**Backend:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Convert File to Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Compress with Sharp
  const compressed = await sharp(buffer)
    .jpeg({ quality: 80 })
    .toBuffer();

  // Return as blob
  return new NextResponse(compressed, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'attachment; filename="compressed.jpg"',
    },
  });
}
```

---

### **Pattern 2: External API Tool**

**Example:** QR Generator, Weather, News

**Frontend:**
```typescript
const handleGenerate = async () => {
  const res = await fetch('/api/tools/qr-generator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: inputText }),
  });

  const { qrCodeUrl } = await res.json();
  setQRCode(qrCodeUrl);
};
```

**Backend:**
```typescript
import QRCode from 'qrcode';
import { uploadToR2 } from '@/lib/storage';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  // Generate QR as buffer
  const qrBuffer = await QRCode.toBuffer(text, { width: 500 });

  // Upload to R2
  const filename = `qr-${Date.now()}.png`;
  const url = await uploadToR2(qrBuffer, filename, 'image/png');

  return NextResponse.json({ qrCodeUrl: url });
}
```

---

### **Pattern 3: Pure Calculation Tool**

**Example:** Age Calculator, BMI Calculator

**Frontend:**
```typescript
const calculateAge = () => {
  const today = new Date();
  const birthDate = new Date(selectedDate);
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  setAge({ years, months, days });
};
```

**Backend:** Not needed for pure calculations (do it client-side)

---

### **Pattern 4: Scraping/Downloading Tool**

**Example:** Instagram Downloader, TikTok Downloader

⚠️ **Legal Warning:** Scraping may violate ToS. Add disclaimers. Consider alternatives.

**Frontend:**
```typescript
const handleDownload = async () => {
  // Check Honey balance or ad watch
  const canUse = await spendHoney(10, 'ig_downloader');
  if (!canUse) return;

  const res = await fetch('/api/tools/ig-downloader', {
    method: 'POST',
    body: JSON.stringify({ url: igUrl }),
  });

  const { videoUrl, thumbnail } = await res.json();
  setResult({ videoUrl, thumbnail });
};
```

**Backend:**
```typescript
import { getInstagramMedia } from '@/lib/tools/ig-scraper';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  // Validate URL
  if (!url.includes('instagram.com')) {
    return NextResponse.json({ error: 'Invalid Instagram URL' }, { status: 400 });
  }

  try {
    const media = await getInstagramMedia(url);
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch media. It may be private or deleted.' },
      { status: 500 }
    );
  }
}
```

---

## 🍯 HONEY INTEGRATION

### **Free Tools (No Honey Cost)**

Tools that don't require Honey:
- Age Calculator
- Unit Converter
- Color Picker
- Simple calculators

**Implementation:** Just don't call `spendHoney()`. That's it!

---

### **Pay-Per-Use Tools (10 Honey)**

Tools that cost Honey each use:
- QR Generator
- Instagram Downloader
- Currency Converter (premium version)

**Frontend:**
```typescript
import { useHoney } from '@/hooks/useHoney';

export default function ToolPage() {
  const { balance, spendHoney } = useHoney();

  const handleUse = async () => {
    // Try to spend Honey
    const success = await spendHoney(10, 'tool_qr_generator');
    
    if (!success) {
      // Show "Insufficient Honey" modal with options:
      // 1. Watch ad to earn 10 Honey
      // 2. Unlock tool forever (200 Honey)
      return;
    }

    // Proceed with tool logic
    callToolAPI();
  };

  return (
    <Button onClick={handleUse} disabled={balance < 10}>
      Use Tool (10 🍯)
    </Button>
  );
}
```

---

### **Unlock Forever (200 Honey)**

Tools users can unlock permanently:
- Image Background Remover
- PDF Merger
- Bulk operations

**Frontend:**
```typescript
import { useUnlocks } from '@/hooks/useUnlocks';

export default function ToolPage() {
  const { isUnlocked, unlockTool } = useUnlocks('tool_bg_remover');

  if (isUnlocked) {
    // User has unlocked, no Honey cost
    return <Button onClick={handleUse}>Use Tool (Free)</Button>;
  }

  return (
    <div>
      <Button onClick={() => spendHoney(10, 'tool_bg_remover')}>
        Use Once (10 🍯)
      </Button>
      <Button onClick={() => unlockTool(200)}>
        Unlock Forever (200 🍯)
      </Button>
    </div>
  );
}
```

**Backend (Unlock):**
```typescript
// POST /api/honey/unlock
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const { toolId, honeyCost } = await req.json();

  // Check balance
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (user.honey_balance < honeyCost) {
    return NextResponse.json({ error: 'Insufficient Honey' }, { status: 400 });
  }

  // Deduct Honey & create unlock
  await prisma.$transaction([
    prisma.user.update({
      where: { id: session.user.id },
      data: {
        honey_balance: { decrement: honeyCost },
        total_honey_spent: { increment: honeyCost },
      },
    }),
    prisma.userUnlock.create({
      data: {
        user_id: session.user.id,
        unlock_type: 'tool',
        unlock_id: toolId,
        honey_spent: honeyCost,
      },
    }),
    prisma.honeyTransaction.create({
      data: {
        user_id: session.user.id,
        amount: -honeyCost,
        type: 'spend_unlock',
        description: `Unlocked ${toolId} forever`,
      },
    }),
  ]);

  return NextResponse.json({ success: true });
}
```

---

## 🧪 TESTING TOOLS

### **Manual Testing Checklist**

For each tool, test:

**Happy Path:**
- [ ] Tool works with valid input
- [ ] Result displays correctly
- [ ] Honey is deducted (if applicable)
- [ ] Analytics event tracked

**Edge Cases:**
- [ ] Empty input
- [ ] Invalid input (negative numbers, special chars)
- [ ] Very large input (max limits)
- [ ] Very small input (min limits)
- [ ] Same value conversion (e.g., USD to USD)

**Error Handling:**
- [ ] Network failure (disconnect WiFi, try tool)
- [ ] API rate limit exceeded
- [ ] Insufficient Honey balance
- [ ] Session expired (logout, try tool)

**Mobile:**
- [ ] Works on phone screen
- [ ] Inputs are tappable (min 44px)
- [ ] Keyboard doesn't cover inputs
- [ ] Scrolling works smoothly

---

### **Automated Tests (Phase 2+)**

**Unit Test Example:**
```typescript
// __tests__/lib/tools/currency-converter.test.ts
import { convertCurrency } from '@/lib/tools/currency-converter';

describe('convertCurrency', () => {
  it('converts USD to KES correctly', async () => {
    const result = await convertCurrency(100, 'USD', 'KES');
    
    expect(result.converted).toBeGreaterThan(0);
    expect(result.rate).toBeGreaterThan(0);
    expect(result.timestamp).toBeDefined();
  });

  it('throws error for same currency', async () => {
    await expect(
      convertCurrency(100, 'USD', 'USD')
    ).rejects.toThrow();
  });
});
```

---

## 🎨 UI COMPONENTS FOR TOOLS

### **ToolLayout Component**

Reusable wrapper for all tools:

```typescript
// components/tools/ToolLayout.tsx
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HoneyBadge from '@/components/honey/HoneyBadge';

interface ToolLayoutProps {
  title: string;
  description: string;
  honeyCost: number; // 0 = free
  category?: string;
  children: ReactNode;
}

export default function ToolLayout({
  title,
  description,
  honeyCost,
  category,
  children,
}: ToolLayoutProps) {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{title}</h1>
          {honeyCost > 0 ? (
            <HoneyBadge amount={honeyCost} />
          ) : (
            <Badge variant="secondary">FREE</Badge>
          )}
        </div>
        <p className="text-muted-foreground mt-2">{description}</p>
        {category && (
          <Badge variant="outline" className="mt-2">{category}</Badge>
        )}
      </div>

      {/* Tool Content */}
      <Card className="p-6">
        {children}
      </Card>

      {/* Usage Tips (Optional) */}
      <div className="mt-6 p-4 bg-accent rounded-lg">
        <h3 className="font-medium mb-2">💡 Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• This tool is {honeyCost === 0 ? 'free to use' : `${honeyCost} Honey per use`}</li>
          <li>• Your data is not stored on our servers</li>
          <li>• Processing happens instantly</li>
        </ul>
      </div>
    </div>
  );
}
```

---

### **ToolCard Component**

For tools listing page:

```typescript
// components/tools/ToolCard.tsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  honeyCost: number;
  usageCount?: number;
  category: string;
}

export default function ToolCard({
  id,
  name,
  description,
  icon: Icon,
  honeyCost,
  usageCount,
  category,
}: ToolCardProps) {
  return (
    <Link href={`/tools/${id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="p-2 bg-golden-honey/10 rounded-lg">
              <Icon className="h-6 w-6 text-golden-honey" />
            </div>
            {honeyCost > 0 ? (
              <Badge variant="secondary">{honeyCost} 🍯</Badge>
            ) : (
              <Badge>FREE</Badge>
            )}
          </div>
          
          <CardTitle className="mt-4">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            {usageCount && (
              <span className="text-xs text-muted-foreground">
                Used {usageCount.toLocaleString()}× times
              </span>
            )}
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
```

---

## 📊 ANALYTICS TRACKING

Track tool usage for insights:

```typescript
// lib/analytics/tracking.ts
import { prisma } from '@/lib/prisma';
import posthog from 'posthog-js';

interface ToolUsageEvent {
  userId: string;
  toolId: string;
  metadata?: Record<string, any>;
}

export async function trackToolUsage({
  userId,
  toolId,
  metadata,
}: ToolUsageEvent) {
  // Track in PostHog (analytics)
  posthog.capture('tool_used', {
    tool_id: toolId,
    user_id: userId,
    ...metadata,
  });

  // Store in database (for leaderboards, stats)
  await prisma.toolUsage.create({
    data: {
      user_id: userId,
      tool_id: toolId,
      metadata: metadata || {},
    },
  });
}
```

**Usage in API routes:**
```typescript
export async function POST(req: NextRequest) {
  // ... tool logic ...

  await trackToolUsage({
    userId: session.user.id,
    toolId: 'qr_generator',
    metadata: { text_length: text.length },
  });

  return NextResponse.json(result);
}
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying a new tool:

**Code Quality:**
- [ ] TypeScript errors resolved
- [ ] ESLint warnings fixed
- [ ] No console.logs left
- [ ] Error handling implemented

**Functionality:**
- [ ] Tool works locally
- [ ] Honey integration works
- [ ] Analytics tracking added
- [ ] Mobile responsive

**Documentation:**
- [ ] Tool added to tools listing page
- [ ] Description is clear
- [ ] Usage tips added
- [ ] README updated (if needed)

**Testing:**
- [ ] Happy path tested
- [ ] Edge cases tested
- [ ] Error cases tested
- [ ] Mobile tested

**Deployment:**
- [ ] Commit code to git
- [ ] Push to GitHub
- [ ] Vercel auto-deploys
- [ ] Test on production URL
- [ ] Monitor Sentry for errors

---

## 🎯 CURSOR/WINDSURF PROMPTS

### **Prompt Template: Create New Tool**

```
Create a new tool for Zista called "[TOOL_NAME]" that [DESCRIPTION].

Structure:
1. Frontend page at /app/(dashboard)/tools/[tool-id]/page.tsx
   - Use ToolLayout component
   - Input fields: [list inputs]
   - Output: [describe output]
   - Honey cost: [0, 10, or 200]

2. Backend API at /app/api/tools/[tool-id]/route.ts
   - Validate input with Zod
   - Check authentication
   - Call logic function
   - Return result or error

3. Business logic at /lib/tools/[tool-id].ts
   - [Describe main function]
   - Handle errors
   - Return typed result

Follow patterns from Zista_Tool_Implementation_Guide.md.
Use shadcn/ui components and Tailwind styling.
Add error handling and loading states.
Track usage with trackToolUsage().
```

---

### **Prompt: Add Honey Integration**

```
Add Honey integration to the [TOOL_NAME] tool:

1. Import useHoney hook from @/hooks/useHoney
2. Check if tool is unlocked (use useUnlocks hook)
3. If not unlocked:
   - Show "Use Once (10 🍯)" button
   - Show "Unlock Forever (200 🍯)" button
   - Call spendHoney() before using tool
4. If unlocked:
   - Allow free usage
   - Show "Unlocked ✓" badge

If user has insufficient Honey:
- Show modal with options:
  * Watch ad to earn Honey
  * View Honey balance
  * Go to profile

Handle all edge cases and errors gracefully.
```

---

### **Prompt: Fix Tool Error**

```
The [TOOL_NAME] tool is showing error: "[ERROR_MESSAGE]"

Current code: [paste code]

Please:
1. Identify the issue
2. Fix the error
3. Add better error handling
4. Add user-friendly error message
5. Test edge cases

Follow Zista error handling patterns:
- Try-catch in API routes
- Zod validation for inputs
- Return { error: string } format
- Show toast notification to user
```

---

### **Prompt: Optimize Tool Performance**

```
Optimize the [TOOL_NAME] tool for better performance:

Current issues:
- [Describe performance issue]

Optimize:
1. Add loading states (skeleton, spinner)
2. Implement caching if applicable (use Next.js fetch cache)
3. Optimize images (use next/image)
4. Lazy load heavy components (dynamic import)
5. Add debouncing to inputs (if real-time)

Target: < 2 seconds processing time
Follow Next.js performance best practices.
```

---

## 🛠️ COMMON ISSUES & SOLUTIONS

### **Issue: "Tool API returns 401 Unauthorized"**

**Cause:** Session not found or expired

**Solution:**
```typescript
// Check if session exists
const session = await getServerSession();
if (!session?.user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Use session.user.id in queries
const user = await prisma.user.findUnique({
  where: { id: session.user.id }
});
```

---

### **Issue: "Honey not deducting after tool use"**

**Cause:** Frontend doesn't refresh balance

**Solution:**
```typescript
// In useHoney hook, refresh after spending
async function spendHoney(amount: number, item: string) {
  const res = await fetch('/api/honey/spend', {
    method: 'POST',
    body: JSON.stringify({ amount, item }),
  });

  const data = await res.json();
  setBalance(data.new_balance); // Update local state
  return true;
}
```

---

### **Issue: "File upload fails with large files"**

**Cause:** Default Next.js body size limit (4MB)

**Solution:**
```javascript
// next.config.js
module.exports = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase limit
    },
  },
};
```

Or use external storage (R2) for large files.

---

### **Issue: "External API rate limit exceeded"**

**Cause:** Too many requests to third-party API

**Solution:**
```typescript
// Add caching
const result = await fetch(apiUrl, {
  next: { revalidate: 3600 }, // Cache for 1 hour
});

// Add rate limiting per user
const userRequestCount = await redis.get(`api_calls:${userId}`);
if (userRequestCount > 100) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

---

## 📚 TOOL IDEAS FOR FUTURE

### **High Priority (MVP Phase 2):**

**Download Tools:**
- YouTube Video Downloader
- Twitter Video Downloader
- Pinterest Image Downloader

**Image Tools:**
- Photo Collage Maker
- Meme Generator
- Image Filters (Instagram-style)
- Passport Photo Maker

**Document Tools:**
- Word to PDF Converter
- Excel to CSV Converter
- Image to PDF

**Calculators:**
- Loan Calculator
- Tip Calculator
- Percentage Calculator
- Time Zone Converter

---

### **Medium Priority (Phase 3):**

**Business Tools:**
- Invoice Generator
- Receipt Maker
- Logo Generator (AI)
- Business Name Generator

**Developer Tools:**
- JSON Formatter
- Base64 Encoder/Decoder
- Hash Generator
- API Tester

**Creative Tools:**
- Color Palette Generator
- Gradient Generator
- Font Pairing Suggester
- Lorem Ipsum Generator

---

### **Low Priority (Phase 4+):**

**Advanced Tools:**
- Video Editor (basic)
- Audio Trimmer
- Screen Recorder
- GIF Maker

**AI-Powered:**
- AI Content Writer
- AI Image Enhancer
- AI Background Changer
- AI Translation

---

## 🎓 LEARNING RESOURCES

### **Tool Development:**

**Next.js API Routes:**
- https://nextjs.org/docs/app/building-your-application/routing/route-handlers

**File Upload:**
- https://www.npmjs.com/package/react-dropzone
- https://nextjs.org/docs/app/building-your-application/optimizing/images

**Image Processing:**
- Sharp: https://sharp.pixelplumbing.com/
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

**External APIs:**
- RapidAPI: https://rapidapi.com/ (1000s of APIs)
- Public APIs: https://github.com/public-apis/public-apis

---

### **Libraries for Common Tools:**

**QR Codes:**
```bash
npm install qrcode
```

**Currency Conversion:**
- exchangerate-api.com (free tier)
- fixer.io

**Social Media Downloaders:**
```bash
npm install ytdl-core           # YouTube
npm install @xaviabot/tiktok-scraper  # TikTok
```

**Image Processing:**
```bash
npm install sharp               # Compress, resize, convert
npm install @imgly/background-removal  # Remove background
```

**PDF Tools:**
```bash
npm install pdf-lib             # Create, modify PDFs
npm install pdfjs-dist          # Parse PDFs
```

---

## ✅ TOOL IMPLEMENTATION CHECKLIST

Use this for every new tool:

**Planning:**
- [ ] Tool name decided
- [ ] Description written (1 sentence)
- [ ] Inputs defined
- [ ] Output format defined
- [ ] Honey cost decided (0, 10, 200)
- [ ] Required libraries identified

**Development:**
- [ ] Frontend page created
- [ ] Backend API created
- [ ] Business logic created
- [ ] Honey integration added
- [ ] Analytics tracking added
- [ ] Error handling implemented
- [ ] Loading states added

**Testing:**
- [ ] Happy path tested
- [ ] Edge cases tested
- [ ] Error cases tested
- [ ] Mobile tested
- [ ] Honey flow tested

**Polish:**
- [ ] UI looks professional
- [ ] Animations smooth
- [ ] Error messages helpful
- [ ] Usage tips added
- [ ] Tool card added to listing

**Deployment:**
- [ ] Code committed
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Tested on production
- [ ] Monitored for errors

---

## 🐝 TOOL QUALITY STANDARDS

Every Zista tool must:

**Functionality:**
✅ Works 95%+ of the time
✅ Handles errors gracefully
✅ Returns results in < 5 seconds
✅ Works on mobile devices

**User Experience:**
✅ Clear, simple interface
✅ Helpful error messages
✅ Loading indicators
✅ Success feedback (toast/modal)

**Code Quality:**
✅ TypeScript types defined
✅ Input validation (Zod)
✅ Error handling (try-catch)
✅ Consistent with other tools

**Business:**
✅ Honey integration (if paid)
✅ Analytics tracking
✅ Usage logged
✅ Performant (doesn't slow app)

---

## 🎯 FINAL TIPS

**1. Start Simple**
- Build the MVP version first
- Add features based on user feedback
- Don't over-engineer

**2. Copy Patterns**
- Look at existing tools as reference
- Reuse components and logic
- Maintain consistency

**3. Test Early**
- Test as you build
- Don't wait until the end
- Fix bugs immediately

**4. Use AI Assistants**
- Cursor/Windsurf understand these patterns
- Give them clear context
- Iterate based on output

**5. Monitor Usage**
- Check analytics weekly
- See which tools are popular
- Build more of what users want

---

## 🚀 READY TO BUILD

**You now have:**
✅ Complete tool architecture pattern
✅ Step-by-step implementation guide
✅ Code examples for all patterns
✅ Honey integration templates
✅ Testing checklists
✅ Cursor/Windsurf prompts
✅ Troubleshooting solutions

**Next steps:**
1. Pick your first tool (QR Generator recommended)
2. Follow the step-by-step guide
3. Use Cursor/Windsurf prompts
4. Test thoroughly
5. Deploy and monitor
6. Repeat for next tool!

**Remember:** Every tool you build makes the next one faster. The patterns are consistent, so after 2-3 tools, you'll be building new ones in under 2 hours.
---
**Document End - Ready to Build Tools!**