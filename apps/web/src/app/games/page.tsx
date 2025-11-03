'use client'

import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Search, Trophy, Zap, Brain, Target, Users, Star, Bell, Swords, Puzzle, Calculator, BookOpen, Crown, Flame } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { PageTransition } from '../../components/PageTransition'
import Image from 'next/image'

type Category = 'All' | 'Puzzles' | 'Strategy' | 'Trivia' | 'Challenges'
type GameMode = 'Solo' | 'Multiplayer' | 'Tournament'
type Difficulty = 'Easy' | 'Medium' | 'Hard'

interface Game {
  id: number
  name: string
  description: string
  category: Exclude<Category, 'All'>
  mode: GameMode
  difficulty: Difficulty
  players: string
  honeyReward: number
  entryCost?: number
  icon: any
  color: string
  featured?: boolean
}

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const pathname = usePathname()

  const games: Game[] = useMemo(() => [
    // Puzzles
    { id: 1, name: 'Sudoku Classic', description: 'Number puzzle game for logic lovers', category: 'Puzzles', mode: 'Solo', difficulty: 'Medium', players: '1 Player', honeyReward: 10, icon: Puzzle, color: 'from-blue-500 to-cyan-500', featured: true },
    { id: 2, name: 'Word Search', description: 'Find hidden words in the grid', category: 'Puzzles', mode: 'Solo', difficulty: 'Easy', players: '1 Player', honeyReward: 5, icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { id: 3, name: 'Jigsaw Puzzle', description: 'Complete beautiful picture puzzles', category: 'Puzzles', mode: 'Solo', difficulty: 'Medium', players: '1 Player', honeyReward: 15, icon: Puzzle, color: 'from-purple-500 to-pink-500' },
    { id: 4, name: 'Memory Match', description: 'Test your memory with card matching', category: 'Puzzles', mode: 'Solo', difficulty: 'Easy', players: '1 Player', honeyReward: 8, icon: Brain, color: 'from-indigo-500 to-purple-500' },

    // Strategy
    { id: 5, name: 'Chess', description: 'Classic strategy board game', category: 'Strategy', mode: 'Multiplayer', difficulty: 'Hard', players: '2 Players', honeyReward: 50, entryCost: 20, icon: Crown, color: 'from-yellow-500 to-orange-500', featured: true },
    { id: 6, name: 'Checkers', description: 'Strategic board game classic', category: 'Strategy', mode: 'Multiplayer', difficulty: 'Medium', players: '2 Players', honeyReward: 30, entryCost: 10, icon: Target, color: 'from-red-500 to-orange-500' },
    { id: 7, name: 'Connect Four', description: 'Strategic connection game', category: 'Strategy', mode: 'Multiplayer', difficulty: 'Easy', players: '2 Players', honeyReward: 20, entryCost: 5, icon: Target, color: 'from-blue-500 to-indigo-500' },
    { id: 8, name: 'Tic Tac Toe', description: 'Quick strategy game', category: 'Strategy', mode: 'Multiplayer', difficulty: 'Easy', players: '2 Players', honeyReward: 10, entryCost: 5, icon: Swords, color: 'from-cyan-500 to-blue-500' },

    // Trivia
    { id: 9, name: 'General Knowledge Quiz', description: 'Test your knowledge across topics', category: 'Trivia', mode: 'Solo', difficulty: 'Medium', players: '1 Player', honeyReward: 25, icon: Brain, color: 'from-purple-500 to-violet-500', featured: true },
    { id: 10, name: 'Science Trivia', description: 'Challenge your science knowledge', category: 'Trivia', mode: 'Solo', difficulty: 'Hard', players: '1 Player', honeyReward: 30, icon: Zap, color: 'from-green-500 to-teal-500' },
    { id: 11, name: 'History Quiz', description: 'Explore world history through questions', category: 'Trivia', mode: 'Solo', difficulty: 'Medium', players: '1 Player', honeyReward: 20, icon: BookOpen, color: 'from-orange-500 to-red-500' },
    { id: 12, name: 'Sports Trivia', description: 'Test your sports knowledge', category: 'Trivia', mode: 'Solo', difficulty: 'Easy', players: '1 Player', honeyReward: 15, icon: Trophy, color: 'from-yellow-500 to-amber-500' },
    { id: 13, name: 'Pop Culture Quiz', description: 'Movies, music, celebrities & trends', category: 'Trivia', mode: 'Solo', difficulty: 'Easy', players: '1 Player', honeyReward: 15, icon: Star, color: 'from-pink-500 to-rose-500' },

    // Challenges
    { id: 14, name: 'Math Challenge', description: 'Solve math problems under time pressure', category: 'Challenges', mode: 'Solo', difficulty: 'Medium', players: '1 Player', honeyReward: 20, icon: Calculator, color: 'from-blue-500 to-cyan-500' },
    { id: 15, name: 'Speed Typing Test', description: 'Type fast and accurately to win', category: 'Challenges', mode: 'Solo', difficulty: 'Easy', players: '1 Player', honeyReward: 10, icon: Zap, color: 'from-green-500 to-emerald-500' },
    { id: 16, name: 'Weekly Tournament', description: 'Compete against all players for top prizes', category: 'Challenges', mode: 'Tournament', difficulty: 'Hard', players: 'Unlimited', honeyReward: 500, entryCost: 50, icon: Trophy, color: 'from-yellow-500 to-orange-500', featured: true },
    { id: 17, name: 'Daily Challenge', description: 'New challenge every day!', category: 'Challenges', mode: 'Solo', difficulty: 'Medium', players: '1 Player', honeyReward: 35, icon: Flame, color: 'from-red-500 to-pink-500', featured: true },
  ], [])

  const categories: { id: Category; label: string; icon: any }[] = useMemo(() => [
    { id: 'All', label: 'All Games', icon: Gamepad2 },
    { id: 'Puzzles', label: 'Puzzles', icon: Puzzle },
    { id: 'Strategy', label: 'Strategy', icon: Target },
    { id: 'Trivia', label: 'Trivia', icon: Brain },
    { id: 'Challenges', label: 'Challenges', icon: Trophy },
  ], [])

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory, games])

  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category)
  }, [])

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'Hard': return 'text-red-400'
    }
  }

  const getModeIcon = (mode: GameMode) => {
    switch (mode) {
      case 'Solo': return <User className="w-3 h-3" />
      case 'Multiplayer': return <Users className="w-3 h-3" />
      case 'Tournament': return <Trophy className="w-3 h-3" />
    }
  }

  const featuredGames = useMemo(() => games.filter(g => g.featured), [games])

  return (
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
          <div className="flex items-center gap-2 bg-golden-honey/10 px-3 py-2 rounded-xl border border-golden-honey/30">
            <div className="text-2xl">🍯</div>
            <div>
              <div className="text-sm font-bold text-golden-honey">1250</div>
              <div className="text-xs text-golden-honey/70 hidden sm:block">Honey</div>
            </div>
          </div>

          <button className="relative p-2 hover:bg-deep-indigo-light/30 rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <Link href="/profile">
            <div className="flex items-center gap-2 hover:bg-deep-indigo-light/30 rounded-xl p-2 transition-colors">
              <div className="w-9 h-9 bg-gradient-to-br from-golden-honey to-golden-honey-dark rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-deep-indigo" />
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-white leading-tight">Ziramzis</div>
              </div>
            </div>
          </Link>
        </div>
      </header>

      <PageTransition>
        <main className="flex-1 overflow-y-auto pb-20">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Play & Earn</h1>
              <p className="text-white/70">Challenge yourself and win Honey. {games.length} games available</p>
            </div>

            {/* Featured Games Carousel */}
            {featuredGames.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-golden-honey fill-golden-honey" />
                  Featured Games
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featuredGames.map((game) => (
                    <div
                      key={game.id}
                      className="relative group bg-gradient-to-br from-golden-honey/10 to-deep-indigo/50 border-2 border-golden-honey/30 rounded-xl p-4 hover:border-golden-honey/60 hover:shadow-golden-honey/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="absolute top-2 right-2">
                        <Star className="w-4 h-4 text-golden-honey fill-golden-honey" />
                      </div>
                      <div className={`w-14 h-14 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                        <game.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1">{game.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-golden-honey font-bold">
                        <Trophy className="w-3 h-3" />
                        Win {game.honeyReward} 🍯
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-deep-indigo/50 border border-deep-indigo-light/20 rounded-xl pl-12 pr-4 py-3 lg:py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-golden-honey/50 focus:border-golden-honey/50 transition-all"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      activeCategory === category.id
                        ? 'bg-golden-honey text-deep-indigo'
                        : 'bg-deep-indigo/50 border border-deep-indigo-light/20 text-white/70 hover:text-white hover:border-golden-honey/30'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Games Count */}
            <div className="mb-4">
              <p className="text-sm text-white/60">
                Showing <span className="text-golden-honey font-semibold">{filteredGames.length}</span> game{filteredGames.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="group bg-deep-indigo/50 backdrop-blur-sm border border-deep-indigo-light/20 rounded-xl p-5 hover:border-golden-honey/50 hover:bg-deep-indigo/70 transition-all duration-300 cursor-pointer"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <game.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {game.entryCost ? (
                          <div className="bg-orange-500/10 border border-orange-500/30 px-2 py-1 rounded-md">
                            <span className="text-xs font-bold text-orange-400">-{game.entryCost} 🍯</span>
                          </div>
                        ) : (
                          <div className="bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-md">
                            <span className="text-xs font-bold text-green-400">FREE</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-golden-honey transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-xs text-white/60 mb-3">{game.description}</p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs mb-3">
                      <div className="flex items-center gap-1 text-white/50">
                        {getModeIcon(game.mode)}
                        <span>{game.players}</span>
                      </div>
                      <span className={`font-medium ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                    </div>

                    {/* Reward */}
                    <div className="flex items-center justify-between pt-3 border-t border-deep-indigo-light/10">
                      <div className="flex items-center gap-1 text-golden-honey font-bold text-sm">
                        <Trophy className="w-4 h-4" />
                        Win {game.honeyReward} 🍯
                      </div>
                      <button className="text-xs font-medium text-white/70 hover:text-golden-honey transition-colors">
                        Play →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-deep-indigo/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No games found</h3>
                <p className="text-white/60 text-sm">Try adjusting your search or filter</p>
              </div>
            )}
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
  )
}