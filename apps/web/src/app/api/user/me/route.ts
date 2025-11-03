import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { prisma } from '@zistahive/database'

// Opt out of static generation for this route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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