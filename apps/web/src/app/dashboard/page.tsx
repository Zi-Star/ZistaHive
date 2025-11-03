'use client'

import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Bell, Trophy, Flame, Star, TrendingUp, Download, QrCode, Calculator, Lock, RefreshCw, Plus, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PageTransition } from '../../components/PageTransition'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth, useHoney } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'

interface UserData {
  name: string
  email: string
  honeyBalance: number
  beeRank: string
  streak: number
  avatar: string | null
}

export default function Dashboard() {
  const pathname = usePathname()
  const router = useRouter()
  const { user: authUser, logout } = useAuth()
  const { honeyBalance, streak, claimDailyReward, loading: honeyLoading } = useHoney()
  const [user, setUser] = useState<UserData>({
    name: 'Loading...',
    email: '',
    honeyBalance: 0,
    beeRank: 'Worker Bee',
    streak: 0,
    avatar: null
  })
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [claimMessage, setClaimMessage] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUserData = async () => {
    if (!authUser) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        console.error('API Error:', response.status, response.statusText)
        // If unauthorized, redirect to login
        if (response.status === 401) {
          router.push('/login')
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClaimDailyReward = async () => {
    setClaiming(true)
    setClaimMessage('')
    
    try {
      const result = await claimDailyReward()
      
      if (result.success) {
        setClaimMessage(result.message || `Successfully claimed ${result.rewardAmount} Honey!`)
        // Refresh user data to get updated balance
        fetchUserData()
      } else {
        setClaimMessage(result.error || 'Failed to claim daily reward')
      }
    } catch (error) {
      setClaimMessage('Failed to claim daily reward')
      console.error('Claim daily reward error:', error)
    } finally {
      setClaiming(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Sign out error:', error)
      window.location.href = '/login'
    }
  }

  const quickTools = [
    { icon: Download, name: 'Downloader', color: 'from-red-500 to-pink-500', honey: 10 },
    { icon: QrCode, name: 'QR Code', color: 'from-blue-500 to-cyan-500', honey: 5 },
    { icon: Calculator, name: 'Calculator', color: 'from-green-500 to-emerald-500', honey: 0 },
    { icon: Lock, name: 'Password', color: 'from-purple-500 to-violet-500', honey: 5 },
    { icon: RefreshCw, name: 'Converter', color: 'from-orange-500 to-amber-500', honey: 0 },
  ]

  // Don't render anything during server-side rendering
  if (!mounted) {
    return (
      <div className="min-h-screen bg-deep-indigo-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-golden-honey border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-deep-indigo-dark">
        {/* Top Bar */}
        <header className="bg-deep-indigo border-b border-deep-indigo-light/20 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-deep-indigo/95">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/Logo.png" 
              alt="Zista Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">Zista</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Honey Balance */}
            <div className="flex items-center gap-2 bg-golden-honey/10 px-3 py-2 rounded-xl border border-golden-honey/30">
              <div className="text-2xl">🍯</div>
              <div>
                <div className="text-sm font-bold text-golden-honey">{honeyBalance || user.honeyBalance}</div>
                <div className="text-xs text-golden-honey/70 hidden sm:block">Honey</div>
              </div>
            </div>

            <button className="relative p-2 hover:bg-deep-indigo-light/30 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Link href="/profile" className="flex items-center gap-2 hover:bg-deep-indigo-light/30 rounded-xl p-2 transition-colors">
              <div className="w-9 h-9 bg-gradient-to-br from-golden-honey to-golden-honey-dark rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-deep-indigo" />
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-white leading-tight">{user.name}</div>
                <div className="text-xs text-golden-honey">{user.beeRank}</div>
              </div>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <PageTransition>
          <main className="flex-1 overflow-y-auto pb-20">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-white/70">Here&apos;s what&apos;s happening in your hive today</p>
            </div>

            {/* Daily Reward Section */}
            <div className="bg-gradient-to-r from-golden-honey to-yellow-500 rounded-xl p-4 mb-6 text-deep-indigo-dark">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">Daily Honey Reward</h2>
                  <p className="text-sm opacity-90">Claim your daily {5 + Math.min(streak * 5, 45)} 🍯 bonus</p>
                </div>
                <button
                  onClick={handleClaimDailyReward}
                  disabled={claiming || honeyLoading}
                  className="bg-deep-indigo-dark hover:bg-deep-indigo text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {claiming ? 'Claiming...' : 'Claim Reward'}
                </button>
              </div>
              {claimMessage && (
                <div className={`mt-2 text-sm font-medium ${claimMessage.includes('Success') ? 'text-green-800' : 'text-red-800'}`}>
                  {claimMessage}
                </div>
              )}
            </div>

            {/* Stats - Simplified & Balanced */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
              <div className="bg-gradient-to-br from-golden-honey to-golden-honey-dark text-deep-indigo p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs opacity-80 font-medium mb-1">Streak</div>
                    <div className="text-2xl font-bold">{streak || user.streak}</div>
                  </div>
                  <Flame className="w-8 h-8 opacity-80" />
                </div>
              </div>
              <div className="bg-deep-indigo/50 backdrop-blur-sm border border-deep-indigo-light/20 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/60 font-medium mb-1">Rank</div>
                    <div className="text-sm font-bold text-white">{user.beeRank}</div>
                  </div>
                  <Trophy className="w-7 h-7 text-golden-honey" />
                </div>
              </div>
              <div className="bg-deep-indigo/50 backdrop-blur-sm border border-deep-indigo-light/20 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/60 font-medium mb-1">Tools</div>
                    <div className="text-2xl font-bold text-accent-cyan">12</div>
                  </div>
                  <TrendingUp className="w-7 h-7 text-accent-cyan" />
                </div>
              </div>
              <div className="bg-deep-indigo/50 backdrop-blur-sm border border-deep-indigo-light/20 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/60 font-medium mb-1">Today</div>
                    <div className="text-2xl font-bold text-green-400">+85</div>
                  </div>
                  <Star className="w-7 h-7 text-green-400" />
                </div>
              </div>
            </div>

            {/* Quick Tools - Cleaner Grid */}
            <div className="bg-deep-indigo/30 backdrop-blur-sm border border-deep-indigo-light/10 rounded-xl p-4 lg:p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg lg:text-xl font-bold text-white">Quick Access</h2>
                <Link href="/tools" className="text-sm text-golden-honey hover:text-golden-honey-light font-medium transition-colors">
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 lg:gap-3">
                {quickTools.map((tool, i) => (
                  <button key={i} className="group flex flex-col items-center p-3 bg-deep-indigo/40 border border-deep-indigo-light/20 rounded-lg hover:border-golden-honey/50 hover:bg-deep-indigo-light/30 transition-all">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 mb-2 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <tool.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="text-[10px] lg:text-xs font-semibold text-white text-center leading-tight">{tool.name}</div>
                    {tool.honey > 0 && (
                      <div className="text-[9px] lg:text-[10px] text-golden-honey font-medium mt-1">{tool.honey} 🍯</div>
                    )}
                  </button>
                ))}
                <Link href="/tools">
                  <button className="group flex flex-col items-center p-3 border border-dashed border-deep-indigo-light/30 rounded-lg hover:border-golden-honey/50 hover:bg-deep-indigo/40 transition-all w-full h-full">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 mb-2 flex items-center justify-center">
                      <Plus className="w-5 h-5 lg:w-6 lg:h-6 text-white/50 group-hover:text-golden-honey transition-colors" />
                    </div>
                    <div className="text-[10px] lg:text-xs font-semibold text-white/50 group-hover:text-golden-honey text-center leading-tight">More</div>
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2 bg-deep-indigo/30 backdrop-blur-sm border border-deep-indigo-light/10 rounded-xl p-4 lg:p-5">
                <h2 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">Recent Activity</h2>
                <div className="space-y-2 lg:space-y-3">
                  {[
                    { action: 'Daily Login Reward', time: '2 hours ago', honey: 25 },
                    { action: 'Used YouTube Downloader', time: '5 hours ago', honey: 10 },
                    { action: 'Completed Course Module', time: 'Yesterday', honey: 50 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-deep-indigo/40 rounded-lg border border-deep-indigo-light/10 hover:border-golden-honey/30 transition-colors">
                      <div className="w-9 h-9 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-green-400 fill-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-white truncate">{item.action}</div>
                        <div className="text-xs text-white/50">{item.time}</div>
                      </div>
                      <div className="text-golden-honey font-bold text-sm">+{item.honey}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-deep-indigo/30 backdrop-blur-sm border border-deep-indigo-light/10 rounded-xl p-4 lg:p-5">
                <h2 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">Daily Missions</h2>
                <div className="space-y-3 lg:space-y-4">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-white">Daily Login</span>
                      <span className="text-sm text-green-400 font-bold">✓</span>
                    </div>
                    <div className="w-full bg-deep-indigo-light/20 rounded-full h-1.5">
                      <div className="bg-green-400 h-1.5 rounded-full transition-all" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-white">Use 3 Tools</span>
                      <span className="text-sm text-golden-honey font-bold">2/3</span>
                    </div>
                    <div className="w-full bg-deep-indigo-light/20 rounded-full h-1.5">
                      <div className="bg-golden-honey h-1.5 rounded-full transition-all" style={{width: '66%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-deep-indigo border-t border-deep-indigo-light/20 px-2 py-2 z-50 shadow-lg backdrop-blur-sm bg-deep-indigo/95">
          <div className="max-w-7xl mx-auto flex items-center justify-around">
            <Link 
              href="/dashboard" 
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
                pathname === '/dashboard' 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <Home className="w-6 h-6" strokeWidth={pathname === '/dashboard' ? 2.5 : 2} />
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link 
              href="/tools" 
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
                pathname === '/tools' 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <Wrench className="w-6 h-6" strokeWidth={pathname === '/tools' ? 2.5 : 2} />
              <span className="text-xs font-medium">Tools</span>
            </Link>
            <Link 
              href="/learn" 
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
                pathname === '/learn' 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <GraduationCap className="w-6 h-6" strokeWidth={pathname === '/learn' ? 2.5 : 2} />
              <span className="text-xs font-medium">Learn</span>
            </Link>
            <Link 
              href="/games" 
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
                pathname === '/games' 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <Gamepad2 className="w-6 h-6" strokeWidth={pathname === '/games' ? 2.5 : 2} />
              <span className="text-xs font-medium">Play</span>
            </Link>
            <Link 
              href="/marketplace" 
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
                pathname === '/marketplace' 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={pathname === '/marketplace' ? 2.5 : 2} />
              <span className="text-xs font-medium">Shop</span>
            </Link>
          </div>
        </nav>
      </div>
    </ProtectedRoute>
  )
}