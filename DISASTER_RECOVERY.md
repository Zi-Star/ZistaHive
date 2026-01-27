# Disaster Recovery Plan

## Last Updated: 2026-01-28

### Current Status
- ✅ All API files restored from git
- ✅ Sentry integration active
- ✅ ESLint/TypeScript checks passing
- ✅ Development server running
- ⚠️ Build fails due to Prisma client generation issue

### What Was Done Today
1. **Sentry Integration**: Successfully added error tracking
2. **API Recovery**: Restored all deleted API files using `git restore`
3. **Build Issue**: Prisma client generation failing (dependency resolution)

### Files Modified
- `apps/web/package.json` - Added Sentry dependencies and prebuild script
- `apps/web/next.config.js` - Wrapped with Sentry config
- `apps/web/.env` - Added Sentry credentials
- Added Sentry config files: `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- Added `instrumentation.ts` and `global-error.tsx`

### Recovery Commands
```bash
# If API files get deleted again:
git restore apps/web/src/app/api/
git restore apps/web/src/hooks/useAuth.ts

# If Sentry files cause issues:
rm apps/web/sentry.*.config.ts
rm apps/web/instrumentation.ts
rm apps/web/src/app/global-error.tsx
# Then restore next.config.js from git:
git restore apps/web/next.config.js

# If build fails due to Prisma:
# Temporary workaround - remove prebuild script:
npm pkg delete scripts.prebuild
# Then build:
npm run build
```

### Deployment Considerations
1. **Prisma Issue**: The build failure is due to Prisma client generation. For deployment:
   - Either fix the Prisma dependency resolution
   - Or generate Prisma client in CI/CD before build
   - Or use a different build strategy

2. **Sentry**: Will automatically upload sourcemaps during build

### Rollback Plan
If anything goes wrong:
```bash
# Complete rollback to before Sentry integration:
git checkout HEAD~1 -- apps/web/
npm install
npm run dev
```

### Environment Variables Required
```
# Sentry (already in .env)
NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
SENTRY_ORG=your_org
SENTRY_PROJECT=your_project
SENTRY_AUTH_TOKEN=your_token

# Database (for Prisma)
DATABASE_URL=your_database_url
```

### Notes
- The Prisma issue is a monorepo dependency resolution problem
- All user functionality is intact and working in development
- Sentry will capture runtime errors even if build fails
- API endpoints are fully restored and functional
