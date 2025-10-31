import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Get database stats
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully! 🐝',
      stats: {
        users: userCount,
        database: 'Neon PostgreSQL',
        status: 'Connected'
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
