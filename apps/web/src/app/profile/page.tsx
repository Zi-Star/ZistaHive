'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Star, Trophy, Flame, TrendingUp, Settings, Bell, LogOut, Camera, Edit2, Save, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth, useHoney } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function ProfilePage() {
  const router = useRouter()
  const { user: authUser, logout } = useAuth()
  const { honeyBalance, streak } = useHoney()
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
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    fetchUserData()
    fetchTransactions()
  }, []) // Remove authUser from dependency array

  const fetchUserData = async () => {
    if (!authUser) return

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

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/honey/transactions')
      if (response.ok) {
        const data = await response.json()
        setTransactions(data.transactions || [])
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
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

  if (!mounted) return null

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-deep-indigo-dark">
        {/* Top Bar */}
        <header className="bg-deep-indigo border-b border-deep-indigo-light/20 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-deep-indigo/95">
          <Link href="/dashboard" className="flex items-center gap-3">
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
            <div className="flex items-center gap-2 bg-golden-honey/10 px-3 py-2 rounded-xl border border-golden-honey/30">
              <div className="text-2xl">🍯</div>
              <div>
                <div className="text-sm font-bold text-golden-honey">{honeyBalance || user.honeyBalance}</div>
                <div className="text-xs text-golden-honey/70 hidden sm:block">Honey</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-20">
          <div className="max-w-6xl mx-auto p-4 lg:p-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-golden-honey to-golden-honey-dark rounded-2xl p-8 mb-6 text-deep-indigo-dark">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white/30 backdrop-blur rounded-2xl flex items-center justify-center">
                    <User className="w-12 h-12" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-deep-indigo text-white rounded-lg flex items-center justify-center shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="opacity-80 mb-4">{user.email}</p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div className="bg-deep-indigo-dark/20 backdrop-blur px-4 py-2 rounded-xl">
                      <Trophy className="w-5 h-5 inline mr-2" />
                      {user.beeRank}
                    </div>
                    <div className="bg-deep-indigo-dark/20 backdrop-blur px-4 py-2 rounded-xl">
                      <Flame className="w-5 h-5 inline mr-2" />
                      {streak || user.streak} Day Streak
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="bg-deep-indigo-dark/20 hover:bg-deep-indigo-dark/30 backdrop-blur px-6 py-3 rounded-xl flex items-center gap-2 transition-colors font-semibold">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-deep-indigo rounded-2xl shadow border border-deep-indigo-light/20 mb-6">
              <div className="flex overflow-x-auto border-b border-deep-indigo-light/20">
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
                        ? 'text-golden-honey border-b-2 border-golden-honey'
                        : 'text-white/70 hover:text-white'
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
                      <div className="bg-gradient-to-br from-golden-honey to-golden-honey-dark text-deep-indigo-dark p-6 rounded-xl">
                        <div className="text-sm opacity-90 mb-1">Current Balance</div>
                        <div className="text-3xl font-bold">{honeyBalance || user.honeyBalance} 🍯</div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl">
                        <div className="text-sm text-green-400 mb-1">Total Earned</div>
                        <div className="text-3xl font-bold text-green-400">{user.totalEarned}</div>
                      </div>
                      <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-xl">
                        <div className="text-sm text-orange-400 mb-1">Total Spent</div>
                        <div className="text-3xl font-bold text-orange-400">{user.totalSpent}</div>
                      </div>
                    </div>

                    <div className="bg-deep-indigo-light/10 rounded-xl p-6 border border-deep-indigo-light/20">
                      <h3 className="text-lg font-bold text-white mb-4">Profile Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-white/60">Bio</label>
                          <p className="text-white">{user.bio || 'No bio yet'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-white/60">Location</label>
                          <p className="text-white">{user.location || 'Not set'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Honey History Tab */}
                {activeTab === 'honey' && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
                    <div className="space-y-3">
                      {transactions.length > 0 ? (
                        transactions.map((transaction, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-deep-indigo-light/10 rounded-xl border border-deep-indigo-light/10">
                            <div>
                              <div className="font-semibold text-white">{transaction.description || transaction.source}</div>
                              <div className="text-sm text-white/60">
                                {new Date(transaction.createdAt).toLocaleDateString()} at {new Date(transaction.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            <div className={`font-bold ${transaction.type === 'earn' ? 'text-green-400' : 'text-red-400'}`}>
                              {transaction.type === 'earn' ? '+' : '-'}{transaction.amount} 🍯
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-white/60">
                          <Star className="w-12 h-12 mx-auto mb-4 text-golden-honey/20" />
                          <p>No honey transactions yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-1">Name</label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full px-4 py-2 bg-deep-indigo-light/10 border border-deep-indigo-light/20 rounded-xl text-white focus:ring-2 focus:ring-golden-honey focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-1">Bio</label>
                          <textarea
                            defaultValue={user.bio}
                            rows={3}
                            className="w-full px-4 py-2 bg-deep-indigo-light/10 border border-deep-indigo-light/20 rounded-xl text-white focus:ring-2 focus:ring-golden-honey focus:border-transparent"
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-1">Location</label>
                          <input
                            type="text"
                            defaultValue={user.location}
                            placeholder="Nairobi, Kenya"
                            className="w-full px-4 py-2 bg-deep-indigo-light/10 border border-deep-indigo-light/20 rounded-xl text-white focus:ring-2 focus:ring-golden-honey focus:border-transparent"
                          />
                        </div>
                        <button className="bg-golden-honey hover:bg-golden-honey-dark text-deep-indigo-dark px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-deep-indigo-light/20 pt-6">
                      <h3 className="text-lg font-bold text-white mb-4">Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-4 bg-deep-indigo-light/10 rounded-xl cursor-pointer border border-deep-indigo-light/20">
                          <span className="text-white">Email Notifications</span>
                          <input type="checkbox" className="rounded border-deep-indigo-light/20 text-golden-honey focus:ring-golden-honey bg-deep-indigo-light/10" />
                        </label>
                        <label className="flex items-center justify-between p-4 bg-deep-indigo-light/10 rounded-xl cursor-pointer border border-deep-indigo-light/20">
                          <span className="text-white">Push Notifications</span>
                          <input type="checkbox" defaultChecked className="rounded border-deep-indigo-light/20 text-golden-honey focus:ring-golden-honey bg-deep-indigo-light/10" />
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
        <nav className="fixed bottom-0 left-0 right-0 bg-deep-indigo border-t border-deep-indigo-light/20 px-2 py-2 z-50 shadow-lg backdrop-blur-sm bg-deep-indigo/95">
          <div className="max-w-7xl mx-auto flex items-center justify-around">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-white/70 hover:text-golden-honey py-2 px-4 rounded-xl transition-colors">
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link href="/tools" className="flex flex-col items-center gap-1 text-white/70 hover:text-golden-honey py-2 px-4 rounded-xl transition-colors">
              <Wrench className="w-6 h-6" />
              <span className="text-xs font-medium">Tools</span>
            </Link>
            <Link href="/learn" className="flex flex-col items-center gap-1 text-white/70 hover:text-golden-honey py-2 px-4 rounded-xl transition-colors">
              <GraduationCap className="w-6 h-6" />
              <span className="text-xs font-medium">Learn</span>
            </Link>
            <Link href="/games" className="flex flex-col items-center gap-1 text-white/70 hover:text-golden-honey py-2 px-4 rounded-xl transition-colors">
              <Gamepad2 className="w-6 h-6" />
              <span className="text-xs font-medium">Play</span>
            </Link>
            <Link href="/marketplace" className="flex flex-col items-center gap-1 text-white/70 hover:text-golden-honey py-2 px-4 rounded-xl transition-colors">
              <ShoppingBag className="w-6 h-6" />
              <span className="text-xs font-medium">Shop</span>
            </Link>
          </div>
        </nav>
      </div>
    </ProtectedRoute>
  )
}