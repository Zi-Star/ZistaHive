// Dummy route to prevent compilation errors
// This route should not be used - we use custom auth instead

export async function GET() {
  return new Response('NextAuth disabled', { status: 404 })
}

export async function POST() {
  return new Response('NextAuth disabled', { status: 404 })
}