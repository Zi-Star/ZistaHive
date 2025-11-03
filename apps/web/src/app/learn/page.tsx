'use client'

import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Search, BookOpen, Code, Briefcase, Lightbulb, Trophy, Clock, Star, Bell, Play, CheckCircle, Lock } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { PageTransition } from '../../components/PageTransition'
import Image from 'next/image'

type Category = 'All' | 'Digital Skills' | 'Life Skills' | 'Money Making' | 'Book Summaries'
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

interface Course {
  id: number
  title: string
  description: string
  category: Exclude<Category, 'All'>
  difficulty: Difficulty
  duration: string
  lessons: number
  honey: number
  progress?: number
  locked?: boolean
  icon: any
  color: string
}

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const pathname = usePathname()

  const courses: Course[] = useMemo(() => [
    // Digital Skills
    { id: 1, title: 'Web Development Basics', description: 'Learn HTML, CSS & JavaScript fundamentals', category: 'Digital Skills', difficulty: 'Beginner', duration: '4 hours', lessons: 12, honey: 150, progress: 0, icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Graphic Design with Canva', description: 'Create stunning designs for social media', category: 'Digital Skills', difficulty: 'Beginner', duration: '3 hours', lessons: 10, honey: 100, icon: Lightbulb, color: 'from-purple-500 to-pink-500' },
    { id: 3, title: 'Digital Marketing 101', description: 'Master social media, SEO & content marketing', category: 'Digital Skills', difficulty: 'Intermediate', duration: '5 hours', lessons: 15, honey: 200, icon: Briefcase, color: 'from-orange-500 to-amber-500' },
    { id: 4, title: 'Video Editing Essentials', description: 'Edit professional videos with free tools', category: 'Digital Skills', difficulty: 'Intermediate', duration: '4.5 hours', lessons: 14, honey: 180, icon: Play, color: 'from-red-500 to-pink-500' },
    { id: 5, title: 'Excel for Beginners', description: 'Master spreadsheets, formulas & data analysis', category: 'Digital Skills', difficulty: 'Beginner', duration: '3.5 hours', lessons: 11, honey: 120, icon: Code, color: 'from-green-500 to-emerald-500' },

    // Life Skills
    { id: 6, title: 'Leadership & Communication', description: 'Develop confidence and leadership skills', category: 'Life Skills', difficulty: 'Beginner', duration: '2.5 hours', lessons: 8, honey: 100, icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { id: 7, title: 'Time Management Mastery', description: 'Boost productivity and achieve your goals', category: 'Life Skills', difficulty: 'Beginner', duration: '2 hours', lessons: 7, honey: 80, icon: Clock, color: 'from-indigo-500 to-purple-500' },
    { id: 8, title: 'Financial Literacy', description: 'Budget, save, invest & build wealth', category: 'Life Skills', difficulty: 'Intermediate', duration: '4 hours', lessons: 12, honey: 150, icon: Briefcase, color: 'from-green-500 to-teal-500' },
    { id: 9, title: 'Negotiation & Persuasion', description: 'Win deals and influence people', category: 'Life Skills', difficulty: 'Advanced', duration: '3 hours', lessons: 9, honey: 120, icon: Trophy, color: 'from-blue-500 to-indigo-500' },

    // Money Making
    { id: 10, title: 'Freelancing 101', description: 'Start earning as a freelancer on Upwork & Fiverr', category: 'Money Making', difficulty: 'Beginner', duration: '3 hours', lessons: 10, honey: 180, icon: Briefcase, color: 'from-emerald-500 to-green-500' },
    { id: 11, title: 'Building a Personal Brand', description: 'Stand out online and attract opportunities', category: 'Money Making', difficulty: 'Intermediate', duration: '3.5 hours', lessons: 11, honey: 150, icon: Star, color: 'from-purple-500 to-violet-500' },
    { id: 12, title: 'Side Hustle Strategies', description: '10 proven ways to make money online in Kenya', category: 'Money Making', difficulty: 'Beginner', duration: '2.5 hours', lessons: 8, honey: 120, icon: Lightbulb, color: 'from-yellow-500 to-amber-500' },
    { id: 13, title: 'Content Creation for Profit', description: 'Monetize your content on YouTube & TikTok', category: 'Money Making', difficulty: 'Intermediate', duration: '4 hours', lessons: 13, honey: 200, icon: Play, color: 'from-red-500 to-orange-500' },

    // Book Summaries
    { id: 14, title: 'Atomic Habits Summary', description: 'Tiny changes, remarkable results', category: 'Book Summaries', difficulty: 'Beginner', duration: '30 min', lessons: 1, honey: 50, icon: BookOpen, color: 'from-cyan-500 to-blue-500' },
    { id: 15, title: 'Rich Dad Poor Dad Summary', description: 'Financial education and wealth building', category: 'Book Summaries', difficulty: 'Beginner', duration: '45 min', lessons: 1, honey: 50, icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { id: 16, title: 'The 7 Habits Summary', description: 'Effectiveness principles for success', category: 'Book Summaries', difficulty: 'Beginner', duration: '40 min', lessons: 1, honey: 50, icon: BookOpen, color: 'from-indigo-500 to-purple-500' },
    { id: 17, title: 'Think and Grow Rich Summary', description: 'Napoleon Hill\'s success philosophy', category: 'Book Summaries', difficulty: 'Beginner', duration: '35 min', lessons: 1, honey: 50, icon: BookOpen, color: 'from-yellow-500 to-orange-500' },
    { id: 18, title: 'How to Win Friends Summary', description: 'Dale Carnegie\'s influence tactics', category: 'Book Summaries', difficulty: 'Beginner', duration: '30 min', lessons: 1, honey: 50, icon: BookOpen, color: 'from-pink-500 to-rose-500' },
  ], [])

  const categories: { id: Category; label: string; icon: any }[] = useMemo(() => [
    { id: 'All', label: 'All Courses', icon: GraduationCap },
    { id: 'Digital Skills', label: 'Digital Skills', icon: Code },
    { id: 'Life Skills', label: 'Life Skills', icon: Trophy },
    { id: 'Money Making', label: 'Money Making', icon: Briefcase },
    { id: 'Book Summaries', label: 'Book Summaries', icon: BookOpen },
  ], [])

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory, courses])

  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category)
  }, [])

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400'
      case 'Intermediate': return 'text-yellow-400'
      case 'Advanced': return 'text-red-400'
    }
  }

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
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Learn & Grow</h1>
              <p className="text-white/70">Build skills that pay. {courses.length} courses & summaries available</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search courses, skills, books..."
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

            {/* Courses Count */}
            <div className="mb-4">
              <p className="text-sm text-white/60">
                Showing <span className="text-golden-honey font-semibold">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group bg-deep-indigo/50 backdrop-blur-sm border border-deep-indigo-light/20 rounded-xl p-5 hover:border-golden-honey/50 hover:bg-deep-indigo/70 transition-all duration-300 cursor-pointer"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <course.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="bg-golden-honey/10 border border-golden-honey/30 px-2 py-1 rounded-md">
                          <span className="text-xs font-bold text-golden-honey">{course.honey} 🍯</span>
                        </div>
                        <span className={`text-[10px] font-medium ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-golden-honey transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-white/60 mb-3 line-clamp-2">{course.description}</p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} lesson{course.lessons > 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Progress or Lock */}
                    {course.progress !== undefined ? (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">Progress</span>
                          <span className="text-golden-honey font-medium">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-deep-indigo-light/20 rounded-full h-1.5">
                          <div 
                            className="bg-golden-honey h-1.5 rounded-full transition-all" 
                            style={{width: `${course.progress}%`}}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <button className="w-full bg-golden-honey/10 hover:bg-golden-honey/20 border border-golden-honey/30 text-golden-honey font-medium text-xs py-2 rounded-lg transition-all">
                        Start Learning →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-deep-indigo/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No courses found</h3>
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