# Sentry Error Tracking Setup

## What was done
- Installed `@sentry/nextjs` in the web app workspace
- Created Sentry config files for client, server, and edge environments
- Wrapped `next.config.js` with `withSentryConfig`
- Added client-side Sentry import to `layout.tsx`
- Added `instrumentation.ts` for server-side Sentry registration
- Updated `.env.example` with required Sentry variables

## Environment variables
Add these to your `.env` (replace with your actual Sentry credentials):
```env
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
SENTRY_AUTH_TOKEN=your_sentry_token
```

## How it works
- **Client**: `sentry.client.config.ts` initializes Sentry in the browser with session replays
- **Server**: `sentry.server.config.ts` and `instrumentation.ts` initialize Sentry for server-side rendering and API routes
- **Edge**: `sentry.edge.config.ts` for middleware/edge runtime
- **Build**: Sentry sourcemaps and releases are uploaded automatically during `next build`

## Verification
- Run `npm run build` to ensure Sentry integration works
- Errors will now be captured in your Sentry dashboard
- Session replays are enabled (masking sensitive data)
