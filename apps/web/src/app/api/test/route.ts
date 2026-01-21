import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count()
    return NextResponse.json({
      status: 'success',
      message: 'API is working!',
      userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed', error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      status: 'success',
      message: 'POST request received',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test POST API error:', error)
    return NextResponse.json(
      { status: 'error', message: 'POST request failed', error: error.message },
      { status: 500 }
    )
  }
}