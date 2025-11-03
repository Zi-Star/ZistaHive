import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface User {
  id?: string
  name: string
  email: string
  avatar?: string
  beeRank: string
  honeyBalance: number
  streak: number
}

export function useAuth(): {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  session: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
} {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [clientSession, setClientSession] = useState<any>(null)
  const [clientStatus, setClientStatus] = useState<string>('loading')

  // Always call useSession at the top level - this is required by React Hooks rules
  const { data: session, status } = useSession()

  // Determine if we're on the client or server
  const isClient = typeof window !== 'undefined'

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
      // Only fetch user data if we have a session
      if (status === 'authenticated' && session) {
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
  }, [status, session, isClient])

  const logout = useCallback(async () => {
    // Only run on client side
    if (!isClient) return
    
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/login')
    }
  }, [router, isClient])

  // Return appropriate values based on whether we're on the client or server
  if (!isClient) {
    // Server-side rendering - return safe defaults
    return {
      user: null,
      setUser,
      session: null,
      isAuthenticated: false,
      isLoading: true,
      logout,
    }
  }

  // Client-side - return actual values
  return {
    user,
    setUser,
    session: clientSession,
    isAuthenticated: clientStatus === 'authenticated',
    isLoading: clientStatus === 'loading' || loading,
    logout,
  }
}

export function useRequireAuth(redirectUrl = '/login'): {
  isAuthenticated: boolean;
  isLoading: boolean;
} {
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
export function useHoney(): {
  honeyBalance: number;
  streak: number;
  loading: boolean;
  error: string | null;
  claimDailyReward: () => Promise<{ success: boolean; rewardAmount?: number; newBalance?: number; message?: string; error?: string; }>;
  spendHoney: (amount: number, purpose: string) => Promise<{ success: boolean; amount?: number; newBalance?: number; message?: string; error?: string; }>;
} {
  const { user, isAuthenticated, isLoading, setUser } = useAuth()
  const [honeyBalance, setHoneyBalance] = useState<number>(0)
  const [streak, setStreak] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const isClient = typeof window !== 'undefined'

  // Initialize honey balance from user data
  useEffect(() => {
    if (isClient && user && !isLoading) {
      setHoneyBalance(user.honeyBalance || 0)
      setStreak(user.streak || 0)
      setLoading(false)
    }
  }, [user, isLoading, isClient])

  // Claim daily reward
  const claimDailyReward = useCallback(async () => {
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
      setHoneyBalance(data.newBalance || 0)
      setStreak(data.streak || 0)
      
      // Update user data in useAuth hook
      if (setUser) {
        setUser((prevUser: User | null) => {
          if (!prevUser) return prevUser;
          return {
            ...prevUser,
            honeyBalance: data.newBalance || 0,
            streak: data.streak || 0
          };
        });
      }
      
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
  }, [isClient, setUser])

  // Spend honey
  const spendHoney = useCallback(async (amount: number, purpose: string) => {
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
      setHoneyBalance(data.newBalance || 0)
      
      // Update user data in useAuth hook
      if (setUser) {
        setUser((prevUser: User | null) => {
          if (!prevUser) return prevUser;
          return {
            ...prevUser,
            honeyBalance: data.newBalance || 0
          };
        });
      }
      
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
  }, [isClient, setUser])

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