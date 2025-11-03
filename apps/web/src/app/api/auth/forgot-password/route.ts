import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // For security, we don't reveal if the email exists
      return NextResponse.json(
        { message: 'If your email is registered, you will receive a password reset link' },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save token to database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // In a real app, you would send an email here
    // For now, we'll just log it to the console
    console.log(`Password reset token for ${email}: ${resetToken}`)
    console.log(`Reset link: http://localhost:3000/reset-password?token=${resetToken}`)

    return NextResponse.json(
      { message: 'If your email is registered, you will receive a password reset link' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}