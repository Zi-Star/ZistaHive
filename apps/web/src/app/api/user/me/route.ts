import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'

// Opt out of static generation for this route
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // Get user ID from headers (set by frontend)
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify user exists
    const userCheck = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    })

    if (!userCheck) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profile: {
          select: {
            beeRank: true,
          },
        },
        honeyBalance: {
          select: {
            balance: true,
            streakDays: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Ensure user has a honey balance, create one if missing
    let honeyBalance = user.honeyBalance;
    if (!honeyBalance) {
      // Create a honey balance for the user
      const newHoneyBalance = await prisma.honeyBalance.create({
        data: {
          userId: user.id,
          balance: 0,
          totalEarned: 0,
          totalSpent: 0,
          streakDays: 0,
        },
        select: {
          balance: true,
          streakDays: true,
        },
      });
      honeyBalance = newHoneyBalance;
    }

    return NextResponse.json({
      name: user.name || 'Bee User',
      email: user.email,
      avatar: user.image,
      beeRank: user.profile?.beeRank || 'Worker Bee',
      honeyBalance: honeyBalance.balance || 0,
      streak: honeyBalance.streakDays || 0,
    })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}