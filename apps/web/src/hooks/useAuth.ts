import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface User {
  name: string
  email: string
  avatar?: string
  beeRank: string
  honeyBalance: number
  streak: number
}

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [clientSession, setClientSession] = useState<any>(null)
  const [clientStatus, setClientStatus] = useState<string>('loading')

  // Determine if we're on the client or server
  const isClient = typeof window !== 'undefined'

  // Always call useSession, but handle the server-side case
  const sessionResult = useSession()
  const { data: session, status } = sessionResult

  useEffect(() => {
    // Update client-side state when session changes
    if (isClient) {
      setClientSession(session)
      setClientStatus(status)
    }
  }, [session, status, isClient])

  useEffect(() => {
    // Only run on client side
    if (!isClient) {
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      if (status === 'authenticated') {
        try {
          const response = await fetch('/api/user/me')
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error)
        }
      }
      setLoading(false)
    }

    fetchUser()
  }, [status, isClient])

  const logout = async () => {
    // Only run on client side
    if (!isClient) return
    
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  // Return appropriate values based on whether we're on the client or server
  if (!isClient) {
    // Server-side rendering - return safe defaults
    return {
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
      logout,
    }
  }

  // Client-side - return actual values
  return {
    user,
    session: clientSession,
    isAuthenticated: clientStatus === 'authenticated',
    isLoading: clientStatus === 'loading' || loading,
    logout,
  }
}

export function useRequireAuth(redirectUrl = '/login') {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const isClient = typeof window !== 'undefined'

  useEffect(() => {
    // Only run on client side
    if (!isClient) return
    
    if (!isLoading && !isAuthenticated) {
      router.push(redirectUrl)
    }
  }, [isAuthenticated, isLoading, router, redirectUrl, isClient])

  if (!isClient) {
    // Server-side rendering - return safe defaults
    return { isAuthenticated: false, isLoading: true }
  }

  // Client-side - return actual values
  return { isAuthenticated, isLoading }
}

// Honey management hook
export function useHoney() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [honeyBalance, setHoneyBalance] = useState<number>(0)
  const [streak, setStreak] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const isClient = typeof window !== 'undefined'

  // Initialize honey balance from user data
  useEffect(() => {
    if (user && !isLoading) {
      setHoneyBalance(user.honeyBalance || 0)
      setStreak(user.streak || 0)
      setLoading(false)
    }
  }, [user, isLoading])

  // Claim daily reward
  const claimDailyReward = async () => {
    // Only run on client side
    if (!isClient) return { success: false, error: 'Not available on server' }
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/honey/daily-reward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to claim daily reward')
      }

      // Update local state
      setHoneyBalance(data.newBalance)
      setStreak(data.streak)
      
      return {
        success: true,
        rewardAmount: data.rewardAmount,
        newBalance: data.newBalance,
        message: data.message,
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to claim daily reward'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setLoading(false)
    }
  }

  // Spend honey
  const spendHoney = async (amount: number, purpose: string) => {
    // Only run on client side
    if (!isClient) return { success: false, error: 'Not available on server' }
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/honey/spend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, purpose }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to spend honey')
      }

      // Update local state
      setHoneyBalance(data.newBalance)
      
      return {
        success: true,
        amount: data.amount,
        newBalance: data.newBalance,
        message: data.message,
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to spend honey'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isClient) {
    // Server-side rendering - return safe defaults
    return {
      honeyBalance: 0,
      streak: 0,
      loading: true,
      error: null,
      claimDailyReward: async () => ({ success: false, error: 'Not available on server' }),
      spendHoney: async () => ({ success: false, error: 'Not available on server' }),
    }
  }

  // Client-side - return actual values
  return {
    honeyBalance,
    streak,
    loading,
    error,
    claimDailyReward,
    spendHoney,
  }
}