'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Star, Trophy, Flame, TrendingUp, Settings, Bell, LogOut, Camera, Edit2, Save, X } from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState({
    name: 'Loading...',
    email: '',
    honeyBalance: 0,
    totalEarned: 0,
    totalSpent: 0,
    beeRank: 'Worker Bee',
    streak: 0,
    avatar: null,
    bio: '',
    location: '',
  })

  useEffect(() => {
    setMounted(true)
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 hidden sm:block">Zista</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-primary-50 px-3 py-2 rounded-xl border border-primary-200">
            <div className="text-2xl">🍯</div>
            <div>
              <div className="text-sm font-bold text-gray-900">{user.honeyBalance}</div>
              <div className="text-xs text-gray-600 hidden sm:block">Honey</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-6xl mx-auto p-4 lg:p-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 mb-6 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-white/80 mb-4">{user.email}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                    <Trophy className="w-5 h-5 inline mr-2" />
                    {user.beeRank}
                  </div>
                  <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                    <Flame className="w-5 h-5 inline mr-2" />
                    {user.streak} Day Streak
                  </div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="bg-white/20 hover:bg-white/30 backdrop-blur px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow border border-gray-200 mb-6">
            <div className="flex overflow-x-auto border-b border-gray-200">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'honey', label: 'Honey History', icon: Star },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white p-6 rounded-xl">
                      <div className="text-sm opacity-90 mb-1">Current Balance</div>
                      <div className="text-3xl font-bold">{user.honeyBalance} 🍯</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                      <div className="text-sm text-green-700 mb-1">Total Earned</div>
                      <div className="text-3xl font-bold text-green-600">{user.totalEarned}</div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl">
                      <div className="text-sm text-orange-700 mb-1">Total Spent</div>
                      <div className="text-3xl font-bold text-orange-600">{user.totalSpent}</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Bio</label>
                        <p className="text-gray-900">{user.bio || 'No bio yet'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Location</label>
                        <p className="text-gray-900">{user.location || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Honey History Tab */}
              {activeTab === 'honey' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'earn', amount: 100, source: 'Welcome Bonus', date: 'Today' },
                      { type: 'earn', amount: 25, source: 'Daily Login', date: '2 hours ago' },
                    ].map((transaction, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <div className="font-semibold text-gray-900">{transaction.source}</div>
                          <div className="text-sm text-gray-500">{transaction.date}</div>
                        </div>
                        <div className={`font-bold ${transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'earn' ? '+' : '-'}{transaction.amount} 🍯
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          defaultValue={user.bio}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          defaultValue={user.location}
                          placeholder="Nairobi, Kenya"
                          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                        <Save className="w-5 h-5" />
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                        <span className="text-gray-900">Email Notifications</span>
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
                        <span className="text-gray-900">Push Notifications</span>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary-600 py-2 px-4 rounded-xl transition-colors">
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/tools" className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary-600 py-2 px-4 rounded-xl transition-colors">
            <Wrench className="w-6 h-6" />
            <span className="text-xs font-medium">Tools</span>
          </Link>
          <Link href="/learn" className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary-600 py-2 px-4 rounded-xl transition-colors">
            <GraduationCap className="w-6 h-6" />
            <span className="text-xs font-medium">Learn</span>
          </Link>
          <Link href="/games" className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary-600 py-2 px-4 rounded-xl transition-colors">
            <Gamepad2 className="w-6 h-6" />
            <span className="text-xs font-medium">Play</span>
          </Link>
          <Link href="/marketplace" className="flex flex-col items-center gap-1 text-gray-600 hover:text-primary-600 py-2 px-4 rounded-xl transition-colors">
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs font-medium">Shop</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
