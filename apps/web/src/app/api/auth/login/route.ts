import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        profile: true,
        honeyBalance: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    if (!user.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session using Prisma Session model
    const { randomBytes } = await import('crypto')
    const sessionToken = randomBytes(32).toString('hex')
    const expires = new Date()
    expires.setDate(expires.getDate() + 30) // 30 days

    // Delete any existing sessions for this user (optional - for single session per user)
    // Or keep multiple sessions for multi-device support
    await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken,
        expires,
      },
    })

    // Return user data with session token
    return NextResponse.json({
      message: 'Login successful',
      sessionToken,
      expires,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.image,
        beeRank: user.profile?.beeRank || 'Worker Bee',
        honeyBalance: user.honeyBalance?.balance || 0,
        streak: user.honeyBalance?.streakDays || 0,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}