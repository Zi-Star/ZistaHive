import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'

// Opt out of static generation for this route
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { amount, purpose } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    if (!purpose) {
      return NextResponse.json(
        { error: 'Purpose is required' },
        { status: 400 }
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

    // Check if user has enough balance
    if (honeyBalance.balance < amount) {
      return NextResponse.json(
        { error: 'Insufficient honey balance' },
        { status: 400 }
      )
    }

    // Update honey balance
    const updatedBalance = await prisma.honeyBalance.update({
      where: { id: honeyBalance.id },
      data: {
        balance: {
          decrement: amount,
        },
        totalSpent: {
          increment: amount,
        },
      },
    })

    // Create transaction record
    const transaction = await prisma.honeyTransaction.create({
      data: {
        balanceId: honeyBalance.id,
        amount,
        type: 'spend',
        source: 'purchase',
        description: `Spent on ${purpose} (${amount} Honey)`,
      },
    })

    return NextResponse.json({
      message: `Successfully spent ${amount} Honey!`,
      amount,
      newBalance: updatedBalance.balance,
      transaction,
    })
  } catch (error) {
    console.error('Spend honey error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}