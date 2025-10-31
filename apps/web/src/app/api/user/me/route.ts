import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@zistahive/database'

export async function GET() {
  try {
    const session = await getSession()

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

    return NextResponse.json({
      name: user.name || 'Bee User',
      email: user.email,
      avatar: user.image,
      beeRank: user.profile?.beeRank || 'Worker Bee',
      honeyBalance: user.honeyBalance?.balance || 0,
      streak: user.honeyBalance?.streakDays || 0,
    })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
