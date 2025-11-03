import { NextResponse } from 'next/server'
import { prisma } from '@zistahive/database'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's honey transactions
    const userWithTransactions = await prisma.user.findUnique({
      where: { email: user.email },
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

    if (!userWithTransactions?.honeyBalance) {
      return NextResponse.json(
        { error: 'User honey balance not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      transactions: userWithTransactions.honeyBalance.transactions,
    })
  } catch (error) {
    console.error('Get transactions error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}