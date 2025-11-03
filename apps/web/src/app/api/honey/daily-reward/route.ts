import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'

// Opt out of static generation for this route
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user with honey balance
    let userWithBalance = await prisma.user.findUnique({
      where: { email: session.user.email },
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