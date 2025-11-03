import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // This is a simple API endpoint that returns success
    // The actual logout is handled client-side with next-auth
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Something went wrong during logout' },
      { status: 500 }
    )
  }
}