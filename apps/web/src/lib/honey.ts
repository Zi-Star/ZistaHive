import { prisma } from '@zistahive/database'

export interface HoneyTransactionData {
  userId: string
  amount: number
  type: 'earn' | 'spend'
  source: string
  description?: string
}

/**
 * Create a honey transaction and update user's balance
 */
export async function createHoneyTransaction(data: HoneyTransactionData) {
  try {
    // Get user's honey balance
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
      include: {
        honeyBalance: true,
      },
    })

    if (!user?.honeyBalance) {
      throw new Error('User honey balance not found')
    }

    // Check if user has enough balance for spending
    if (data.type === 'spend' && user.honeyBalance.balance < data.amount) {
      throw new Error('Insufficient honey balance')
    }

    // Update honey balance
    const updatedBalance = await prisma.honeyBalance.update({
      where: { id: user.honeyBalance.id },
      data: {
        balance: {
          increment: data.type === 'earn' ? data.amount : -data.amount,
        },
        [data.type === 'earn' ? 'totalEarned' : 'totalSpent']: {
          increment: data.amount,
        },
      },
    })

    // Create transaction record
    const transaction = await prisma.honeyTransaction.create({
      data: {
        balanceId: user.honeyBalance.id,
        amount: data.amount,
        type: data.type,
        source: data.source,
        description: data.description,
      },
    })

    return {
      success: true,
      transaction,
      newBalance: updatedBalance.balance,
    }
  } catch (error) {
    console.error('Honey transaction error:', error)
    throw error
  }
}

/**
 * Get user's honey balance
 */
export async function getUserHoneyBalance(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        honeyBalance: true,
      },
    })

    return user?.honeyBalance || null
  } catch (error) {
    console.error('Get honey balance error:', error)
    throw error
  }
}

/**
 * Get user's honey transaction history
 */
export async function getUserHoneyTransactions(userId: string, limit = 10) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        honeyBalance: {
          include: {
            transactions: {
              orderBy: {
                createdAt: 'desc',
              },
              take: limit,
            },
          },
        },
      },
    })

    return user?.honeyBalance?.transactions || []
  } catch (error) {
    console.error('Get honey transactions error:', error)
    throw error
  }
}

/**
 * Claim daily reward
 */
export async function claimDailyReward(userId: string) {
  try {
    // Get user's honey balance
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        honeyBalance: true,
      },
    })

    if (!user?.honeyBalance) {
      throw new Error('User honey balance not found')
    }

    const honeyBalance = user.honeyBalance
    const now = new Date()
    const lastReward = honeyBalance.lastDailyReward

    // Check if user already claimed today
    if (lastReward) {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const lastRewardDate = new Date(lastReward.getFullYear(), lastReward.getMonth(), lastReward.getDate())
      
      if (lastRewardDate.getTime() === today.getTime()) {
        throw new Error('Daily reward already claimed today')
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
    const transaction = await prisma.honeyTransaction.create({
      data: {
        balanceId: honeyBalance.id,
        amount: rewardAmount,
        type: 'earn',
        source: 'daily_login',
        description: `Daily login reward (${rewardAmount} Honey)`,
      },
    })

    return {
      success: true,
      rewardAmount,
      newBalance: updatedBalance.balance,
      streak: updatedBalance.streakDays,
      transaction,
    }
  } catch (error) {
    console.error('Claim daily reward error:', error)
    throw error
  }
}