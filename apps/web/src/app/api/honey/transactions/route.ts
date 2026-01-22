import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'

// Opt out of static generation for this route
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
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

    // Get user with honey transactions
    let userWithTransactions = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        honeyBalance: {
          include: {
            transactions: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 20, // Limit to 20 most recent transactions
            },
          },
        },
      },
    })

    if (!userWithTransactions) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Ensure user has a honey balance, create one if missing
    let honeyBalance = userWithTransactions.honeyBalance;
    if (!honeyBalance) {
      honeyBalance = await prisma.honeyBalance.create({
        data: {
          userId: userWithTransactions.id,
          balance: 0,
          totalEarned: 0,
          totalSpent: 0,
          streakDays: 0,
        },
        include: {
          transactions: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 20,
          },
        },
      });
    }

    return NextResponse.json({
      transactions: honeyBalance.transactions || [],
    })
  } catch (error) {
    console.error('Get transactions error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}