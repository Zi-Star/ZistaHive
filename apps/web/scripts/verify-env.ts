#!/usr/bin/env ts-node
/**
 * Environment Variables Verification Script
 * 
 * This script checks if all required environment variables are set
 * Run with: npx ts-node apps/web/scripts/verify-env.ts
 */

const requiredVars = {
  // Critical - App won't work without these
  critical: [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
  ],
  // Important - Core features won't work
  important: [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
  ],
  // Optional - Features will be disabled if missing
  optional: [
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'GROQ_API_KEY',
    'OPENAI_API_KEY',
    'NEXT_PUBLIC_POSTHOG_KEY',
    'NEXT_PUBLIC_POSTHOG_HOST',
    'SENTRY_DSN',
    'EMAIL_SERVER',
    'EMAIL_FROM',
    'RESEND_API_KEY',
  ],
}

interface VerificationResult {
  category: 'critical' | 'important' | 'optional'
  name: string
  isSet: boolean
  value?: string
  message?: string
}

function verifyEnvVar(name: string, category: 'critical' | 'important' | 'optional'): VerificationResult {
  const value = process.env[name]
  const isSet = !!value && value.trim() !== '' && !value.includes('your-') && !value.includes('generate-')
  
  let message: string | undefined
  if (!isSet) {
    if (category === 'critical') {
      message = '❌ REQUIRED - Application will not work without this'
    } else if (category === 'important') {
      message = '⚠️  IMPORTANT - Core features will be disabled'
    } else {
      message = 'ℹ️  Optional - Feature will be disabled'
    }
  } else {
    // Additional validation
    if (name === 'DATABASE_URL' && !value?.startsWith('postgresql://')) {
      message = '⚠️  Warning: DATABASE_URL should start with postgresql://'
    } else if (name === 'NEXTAUTH_URL' && !value?.startsWith('http')) {
      message = '⚠️  Warning: NEXTAUTH_URL should be a valid URL'
    } else if (name === 'NEXTAUTH_SECRET' && value && value.length < 32) {
      message = '⚠️  Warning: NEXTAUTH_SECRET should be at least 32 characters'
    } else {
      message = '✅ Set correctly'
    }
  }
  
  return {
    category,
    name,
    isSet,
    value: isSet ? (name.includes('SECRET') || name.includes('KEY') || name.includes('PASSWORD') ? '***hidden***' : value) : undefined,
    message,
  }
}

function main() {
  console.log('\n🔍 ZISTA Environment Variables Verification\n')
  console.log('=' .repeat(60))
  
  const results: VerificationResult[] = []
  
  // Verify critical variables
  console.log('\n📋 CRITICAL VARIABLES (Required for app to work):')
  console.log('-'.repeat(60))
  for (const varName of requiredVars.critical) {
    const result = verifyEnvVar(varName, 'critical')
    results.push(result)
    console.log(`${result.isSet ? '✅' : '❌'} ${varName.padEnd(25)} ${result.message}`)
  }
  
  // Verify important variables
  console.log('\n📋 IMPORTANT VARIABLES (Core features):')
  console.log('-'.repeat(60))
  for (const varName of requiredVars.important) {
    const result = verifyEnvVar(varName, 'important')
    results.push(result)
    console.log(`${result.isSet ? '✅' : '⚠️ '} ${varName.padEnd(25)} ${result.message}`)
  }
  
  // Verify optional variables
  console.log('\n📋 OPTIONAL VARIABLES (Additional features):')
  console.log('-'.repeat(60))
  for (const varName of requiredVars.optional) {
    const result = verifyEnvVar(varName, 'optional')
    results.push(result)
    if (!result.isSet) {
      console.log(`ℹ️  ${varName.padEnd(25)} ${result.message}`)
    } else {
      console.log(`✅ ${varName.padEnd(25)} ${result.message}`)
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 SUMMARY:')
  console.log('-'.repeat(60))
  
  const criticalMissing = results.filter(r => r.category === 'critical' && !r.isSet)
  const importantMissing = results.filter(r => r.category === 'important' && !r.isSet)
  const optionalSet = results.filter(r => r.category === 'optional' && r.isSet)
  
  console.log(`Critical variables: ${requiredVars.critical.length - criticalMissing.length}/${requiredVars.critical.length} set`)
  console.log(`Important variables: ${requiredVars.important.length - importantMissing.length}/${requiredVars.important.length} set`)
  console.log(`Optional variables: ${optionalSet.length}/${requiredVars.optional.length} set`)
  
  if (criticalMissing.length > 0) {
    console.log('\n❌ CRITICAL ISSUES FOUND:')
    console.log('The following critical variables are missing:')
    criticalMissing.forEach(r => console.log(`  - ${r.name}`))
    console.log('\n💡 ACTION REQUIRED:')
    console.log('1. Copy apps/web/.env.example to apps/web/.env.local')
    console.log('2. Fill in all required values')
    console.log('3. For NEXTAUTH_SECRET, run: openssl rand -base64 32')
    console.log('4. Get DATABASE_URL from your Neon PostgreSQL dashboard')
    process.exit(1)
  } else if (importantMissing.length > 0) {
    console.log('\n⚠️  WARNING: Some important variables are missing')
    console.log('Core features (like Google OAuth) will be disabled')
    console.log('Missing:')
    importantMissing.forEach(r => console.log(`  - ${r.name}`))
    process.exit(0)
  } else {
    console.log('\n✅ All critical and important variables are set!')
    console.log('Your environment is properly configured.')
    process.exit(0)
  }
}

// Run if executed directly
if (require.main === module) {
  main()
}

export { verifyEnvVar, requiredVars }
