import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user?.email) {
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

    // Get user's honey balance
    const userWithBalance = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        honeyBalance: true,
      },
    })

    if (!userWithBalance?.honeyBalance) {
      return NextResponse.json(
        { error: 'User honey balance not found' },
        { status: 404 }
      )
    }

    const honeyBalance = userWithBalance.honeyBalance

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