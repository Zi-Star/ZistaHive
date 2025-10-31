'use client'

import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Bell, Trophy, Flame, Star, TrendingUp, Download, QrCode, Calculator, Lock, RefreshCw, Plus, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PageTransition } from '../../components/PageTransition'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
  const [user, setUser] = useState<UserData>({
    name: 'Loading...',
    email: '',
    honeyBalance: 0,
    beeRank: 'Worker Bee',
    streak: 0,
    avatar: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUserData = async () => {
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

  const handleSignOut = async () => {
    try {
      const { signOut } = await import('next-auth/react')
      await signOut({ redirect: false })
      router.push('/login')
      router.refresh()
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 hidden sm:block">Zista</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Honey Balance */}
          <div className="flex items-center gap-2 bg-primary-50 px-3 py-2 rounded-xl border border-primary-200">
            <div className="text-2xl">🍯</div>
            <div>
              <div className="text-sm font-bold text-gray-900">{user.honeyBalance}</div>
              <div className="text-xs text-gray-600 hidden sm:block">Honey</div>
            </div>
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <Link href="/profile" className="flex items-center gap-2 hover:bg-gray-100 rounded-xl p-2 transition-colors">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-semibold text-gray-900 leading-tight">{user.name}</div>
              <div className="text-xs text-gray-500">{user.beeRank}</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <PageTransition>
        <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-600">Here&apos;s what&apos;s happening in your hive today</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-5 rounded-2xl shadow-lg">
              <div className="text-sm opacity-90 mb-1 font-medium">Daily Streak</div>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{user.streak}</div>
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow border border-gray-200">
              <div className="text-sm text-gray-600 mb-1 font-medium">Bee Rank</div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                <div className="text-lg font-bold text-gray-900">{user.beeRank}</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow border border-gray-200">
              <div className="text-sm text-gray-600 mb-1 font-medium">Tools Used</div>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold text-cyan-500">12</div>
                <TrendingUp className="w-5 h-5 text-cyan-500" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow border border-gray-200">
              <div className="text-sm text-gray-600 mb-1 font-medium">Earned Today</div>
              <div className="text-2xl font-bold text-green-600">+85</div>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Quick Access</h2>
              <Link href="/tools" className="text-sm text-cyan-600 hover:underline font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {quickTools.map((tool, i) => (
                <button key={i} className="group flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all">
                  <div className={`w-12 h-12 mb-2 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-semibold text-gray-900 text-center leading-tight mb-1">{tool.name}</div>
                  {tool.honey > 0 && (
                    <div className="text-[10px] text-primary-600 font-bold">{tool.honey} 🍯</div>
                  )}
                </button>
              ))}
              <Link href="/tools">
                <button className="group flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all w-full">
                  <div className="w-12 h-12 mb-2 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-primary-600" />
                  </div>
                  <div className="text-xs font-semibold text-gray-500 group-hover:text-primary-600 text-center leading-tight">All Tools</div>
                </button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow border border-gray-200 p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { action: 'Daily Login Reward', time: '2 hours ago', honey: 25 },
                  { action: 'Used YouTube Downloader', time: '5 hours ago', honey: 10 },
                  { action: 'Completed Course Module', time: 'Yesterday', honey: 50 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-green-600 fill-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">{item.action}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </div>
                    <div className="text-primary-600 font-bold">+{item.honey}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow border border-gray-200 p-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Missions</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Daily Login</span>
                    <span className="text-sm text-green-600 font-bold">✓</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Use 3 Tools</span>
                    <span className="text-sm text-primary-600 font-bold">2/3</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{width: '66%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          <Link 
            href="/dashboard" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/dashboard' 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Home className="w-6 h-6" strokeWidth={pathname === '/dashboard' ? 2.5 : 2} />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link 
            href="/tools" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/tools' 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Wrench className="w-6 h-6" strokeWidth={pathname === '/tools' ? 2.5 : 2} />
            <span className="text-xs font-medium">Tools</span>
          </Link>
          <Link 
            href="/learn" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/learn' 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <GraduationCap className="w-6 h-6" strokeWidth={pathname === '/learn' ? 2.5 : 2} />
            <span className="text-xs font-medium">Learn</span>
          </Link>
          <Link 
            href="/games" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/games' 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <Gamepad2 className="w-6 h-6" strokeWidth={pathname === '/games' ? 2.5 : 2} />
            <span className="text-xs font-medium">Play</span>
          </Link>
          <Link 
            href="/marketplace" 
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              pathname === '/marketplace' 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-6 h-6" strokeWidth={pathname === '/marketplace' ? 2.5 : 2} />
            <span className="text-xs font-medium">Shop</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
