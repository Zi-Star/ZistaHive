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
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  // Handle server-side rendering case by checking if we're on the client
  const isClient = typeof window !== 'undefined'
  
  useEffect(() => {
    // Only run on client side
    if (!isClient) return
    
    const fetchUser = async () => {
      if (isAuthenticated) {
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
  }, [isAuthenticated, isClient])

  const logout = async () => {
    // Only run on client side
    if (!isClient) return
    
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  // Return appropriate values based on whether we're on the client or server
  return {
    user: isClient ? user : null,
    session: isClient ? session : null,
    isAuthenticated: isClient ? isAuthenticated : false,
    isLoading: isClient ? (isLoading || loading) : true,
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

  return { isAuthenticated: isClient ? isAuthenticated : false, isLoading: isClient ? isLoading : true }
}

// Honey management hook
export function useHoney() {
  const [honeyBalance, setHoneyBalance] = useState<number>(0)
  const [streak, setStreak] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const isClient = typeof window !== 'undefined'

  // Fetch current honey balance
  const fetchHoneyBalance = async () => {
    // Only run on client side
    if (!isClient) return
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/user/me')
      if (response.ok) {
        const userData = await response.json()
        setHoneyBalance(userData.honeyBalance || 0)
        setStreak(userData.streak || 0)
      }
    } catch (err) {
      setError('Failed to fetch honey balance')
      console.error('Fetch honey balance error:', err)
    } finally {
      setLoading(false)
    }
  }

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

  return {
    honeyBalance,
    streak,
    loading,
    error,
    fetchHoneyBalance,
    claimDailyReward,
    spendHoney,
  }
}