'use client'

import { useState, useEffect, useCallback } from 'react'
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

  useEffect(() => {
    // Check for stored authentication data
    const userData = localStorage.getItem('user-data')

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        // Clear invalid data
        localStorage.removeItem('user-data')
      }
    }

    setLoading(false)
  }, [])

  const logout = useCallback(async () => {
    try {
      // Clear local storage
      localStorage.removeItem('user-data')
      setUser(null)
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/login')
    }
  }, [router])

  return {
    user,
    setUser,
    session: { user }, // Mock session object
    isAuthenticated: !!user,
    isLoading: loading,
    logout,
  }
}

export function useRequireAuth(redirectUrl = '/login'): {
  isAuthenticated: boolean;
  isLoading: boolean;
} {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectUrl)
    }
  }, [isAuthenticated, isLoading, router, redirectUrl])

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

  // Initialize honey balance from user data
  useEffect(() => {
    if (user && !isLoading) {
      setHoneyBalance(user.honeyBalance || 0)
      setStreak(user.streak || 0)
      setLoading(false)
    } else if (!isAuthenticated && !isLoading) {
      setHoneyBalance(0)
      setStreak(0)
      setLoading(false)
    }
  }, [user, isLoading, isAuthenticated])

  // Claim daily reward
  const claimDailyReward = useCallback(async () => {
    if (!user?.id) {
      return { success: false, error: 'User not authenticated' }
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/honey/daily-reward', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
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
  }, [setUser, user])

  // Spend honey
  const spendHoney = useCallback(async (amount: number, purpose: string) => {
    if (!user?.id) {
      return { success: false, error: 'User not authenticated' }
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/honey/spend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
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
  }, [setUser, user])

  return {
    honeyBalance,
    streak,
    loading,
    error,
    claimDailyReward,
    spendHoney,
  }
}