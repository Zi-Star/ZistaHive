import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'

// Opt out of static generation for this route
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    // Get user ID from headers (set by frontend)
    const userId = request.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get user with honey balance
    let userWithBalance = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        honeyBalance: true,
      },
    })

    if (!userWithBalance) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Ensure user has a honey balance, create one if missing
    let honeyBalance = userWithBalance.honeyBalance;
    if (!honeyBalance) {
      honeyBalance = await prisma.honeyBalance.create({
        data: {
          userId: userWithBalance.id,
          balance: 0,
          totalEarned: 0,
          totalSpent: 0,
          streakDays: 0,
        },
      });
    }

    const now = new Date()
    const lastReward = honeyBalance.lastDailyReward

    // Check if user already claimed today
    if (lastReward) {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const lastRewardDate = new Date(lastReward.getFullYear(), lastReward.getMonth(), lastReward.getDate())
      
      if (lastRewardDate.getTime() === today.getTime()) {
        return NextResponse.json(
          { error: 'Daily reward already claimed today' },
          { status: 400 }
        )
      }
    }

    // Calculate reward amount (5-50 Honey)
    const baseReward = 5
    const streakBonus = Math.min(honeyBalance.streakDays * 5, 45) // Max 45 bonus
    const rewardAmount = baseReward + streakBonus

    // Update honey balance
    const updatedBalance = await prisma.honeyBalance.update({
      where: { id: honeyBalance.id },
      data: {
        balance: {
          increment: rewardAmount,
        },
        totalEarned: {
          increment: rewardAmount,
        },
        lastDailyReward: now,
        streakDays: {
          increment: 1,
        },
      },
    })

    // Create transaction record
    await prisma.honeyTransaction.create({
      data: {
        balanceId: honeyBalance.id,
        amount: rewardAmount,
        type: 'earn',
        source: 'daily_login',
        description: `Daily login reward (${rewardAmount} Honey)`,
      },
    })

    return NextResponse.json({
      message: `Successfully claimed ${rewardAmount} Honey!`,
      rewardAmount,
      newBalance: updatedBalance.balance,
      streak: updatedBalance.streakDays,
    })
  } catch (error) {
    console.error('Daily reward error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}