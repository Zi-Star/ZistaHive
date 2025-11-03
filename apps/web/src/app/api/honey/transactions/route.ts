import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'

// Opt out of static generation for this route
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user with honey transactions
    let userWithTransactions = await prisma.user.findUnique({
      where: { email: session.user.email },
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