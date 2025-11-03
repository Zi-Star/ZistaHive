import { getServerSession } from 'next-auth'
import { authOptions } from './auth-config'
import { prisma } from '@zistahive/database'

// Get session on server side
export async function getSession() {
  return await getServerSession(authOptions)
}

// Get current user on server side
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

// Get user with full profile data
export async function getUserWithProfile() {
  const session = await getSession()
  
  if (!session?.user?.email) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        profile: {
          select: {
            bio: true,
            location: true,
            phone: true,
            beeRank: true,
            avatar: true,
          },
        },
        honeyBalance: {
          select: {
            balance: true,
            totalEarned: true,
            totalSpent: true,
            streakDays: true,
          },
        },
      },
    })

    return user
  } catch (error) {
    console.error('Failed to fetch user with profile:', error)
    return null
  }
}

// Require authentication for server components
export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user
}