import { NextResponse } from 'next/server'
import { signOut } from 'next-auth/react'

export async function POST() {
  try {
    // In a real implementation, you might want to do additional cleanup here
    // For now, we'll just return a success response
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