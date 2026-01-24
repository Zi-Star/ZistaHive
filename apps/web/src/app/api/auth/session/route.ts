import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'
import { randomBytes } from 'crypto'

// Create a new session
export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate session token
    const sessionToken = randomBytes(32).toString('hex')
    
    // Set expiration to 30 days
    const expires = new Date()
    expires.setDate(expires.getDate() + 30)

    // Create session
    const session = await prisma.session.create({
      data: {
        userId,
        sessionToken,
        expires,
      },
      include: {
        user: {
          include: {
            profile: true,
            honeyBalance: true,
          },
        },
      },
    })

    return NextResponse.json({
      sessionToken,
      expires: session.expires,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image,
        beeRank: session.user.profile?.beeRank || 'Worker Bee',
        honeyBalance: session.user.honeyBalance?.balance || 0,
        streak: session.user.honeyBalance?.streakDays || 0,
      },
    })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}

// Verify and get session
export async function GET(request: Request) {
  try {
    const sessionToken = request.headers.get('x-session-token')

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Session token required' },
        { status: 401 }
      )
    }

    // Find session
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: {
          include: {
            profile: true,
            honeyBalance: true,
          },
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    // Check if session is expired
    if (session.expires < new Date()) {
      // Delete expired session
      await prisma.session.delete({
        where: { id: session.id }
      })
      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image,
        beeRank: session.user.profile?.beeRank || 'Worker Bee',
        honeyBalance: session.user.honeyBalance?.balance || 0,
        streak: session.user.honeyBalance?.streakDays || 0,
      },
      expires: session.expires,
    })
  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify session' },
      { status: 500 }
    )
  }
}

// Delete session (logout)
export async function DELETE(request: Request) {
  try {
    const sessionToken = request.headers.get('x-session-token')

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Session token required' },
        { status: 400 }
      )
    }

    // Delete session
    await prisma.session.deleteMany({
      where: { sessionToken }
    })

    return NextResponse.json({ message: 'Session deleted' })
  } catch (error) {
    console.error('Session deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    )
  }
}
