'use client'

import { 
  Download, QrCode, Calculator, Lock, FileText, Palette, RefreshCw, Image as ImageIcon, 
  Code2, Hash, Smartphone, Zap, Users, Trophy, TrendingUp, Star, Play, BookOpen, 
  Gamepad2, ShoppingBag, ArrowRight, CheckCircle, Youtube, Instagram, Twitter, 
  Music, Scissors, FileImage, FileSpreadsheet, Percent, Clock, Globe, 
  Medal, Crown, Flame, Award, ShoppingCart, Gift, Heart, MessageCircle,
  Wrench as WrenchIcon, GraduationCap, User
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ImageComponent from 'next/image'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const { user, isAuthenticated, isLoading } = useAuth()
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Tools data
  const tools = [
    { icon: Download, name: 'YouTube Downloader', category: 'Downloads', description: 'Download videos and audio', color: 'from-red-500 to-pink-500', honey: 10 },
    { icon: Instagram, name: 'Instagram Downloader', category: 'Downloads', description: 'Save Instagram media', color: 'from-purple-500 to-pink-500', honey: 10 },
    { icon: ImageIcon, name: 'Image Compressor', category: 'Image', description: 'Reduce image file size', color: 'from-indigo-500 to-blue-500', honey: 5 },
    { icon: QrCode, name: 'QR Generator', category: 'Security', description: 'Create custom QR codes', color: 'from-blue-500 to-cyan-500', honey: 5 },
    { icon: Calculator, name: 'Calculator', category: 'Calculator', description: 'Advanced calculator', color: 'from-green-500 to-emerald-500', honey: 0 },
    { icon: Lock, name: 'Password Generator', category: 'Security', description: 'Generate secure passwords', color: 'from-purple-500 to-violet-500', honey: 0 },
    { icon: FileText, name: 'PDF Tools', category: 'Document', description: 'Merge, split PDFs', color: 'from-teal-500 to-cyan-500', honey: 5 },
    { icon: Palette, name: 'Color Picker', category: 'Developer', description: 'Pick & convert colors', color: 'from-pink-500 to-rose-500', honey: 0 },
  ]

  // Courses data
  const courses = [
    { title: 'Web Development Basics', instructor: 'Ziramzis', lessons: 12, duration: '2h 30m', level: 'Beginner', honey: 100 },
    { title: 'Digital Marketing Mastery', instructor: 'Marketing Pro', lessons: 18, duration: '4h 15m', level: 'Intermediate', honey: 150 },
    { title: 'Financial Literacy', instructor: 'Finance Expert', lessons: 10, duration: '1h 45m', level: 'Beginner', honey: 75 },
    { title: 'Graphic Design Fundamentals', instructor: 'Design Guru', lessons: 15, duration: '3h 20m', level: 'Beginner', honey: 125 },
  ]

  // Games data
  const games = [
    { name: 'Chess Master', type: 'Strategy', players: '1v1', honey: '10-100', icon: Gamepad2 },
    { name: 'Brain Teasers', type: 'Puzzle', players: 'Solo', honey: '5-25', icon: Trophy },
    { name: 'Trivia Challenge', type: 'Quiz', players: 'Multiplayer', honey: '10-50', icon: Medal },
    { name: 'Math Wizard', type: 'Educational', players: 'Solo', honey: '5-30', icon: Calculator },
  ]

  // Marketplace products
  const products = [
    { name: 'Wireless Earbuds', price: 'KSh 2,500', category: 'Tech', rating: 4.8 },
    { name: 'Designer T-Shirt', price: 'KSh 1,200', category: 'Fashion', rating: 4.6 },
    { name: 'Smart Watch', price: 'KSh 8,000', category: 'Tech', rating: 4.9 },
    { name: 'Notebook Set', price: 'KSh 800', category: 'Stationery', rating: 4.7 },
  ]

  // Services
  const services = [
    { name: 'Social Media Management', provider: 'Zista Pro', price: 'From KSh 5,000', category: 'Marketing' },
    { name: 'Website Development', provider: 'Zista Devs', price: 'From KSh 15,000', category: 'Tech' },
    { name: 'Graphic Design', provider: 'Creative Hive', price: 'From KSh 3,000', category: 'Design' },
    { name: 'Content Writing', provider: 'Word Masters', price: 'From KSh 2,000', category: 'Writing' },
  ]

  // Stats data
  const stats = [
    { value: '20+', label: 'Productivity Tools', icon: WrenchIcon },
    { value: '100%', label: 'Free to Start', icon: Heart },
    { value: '24/7', label: 'Available', icon: Clock },
    { value: '10K+', label: 'Active Users', icon: Users },
  ]

  // Honey rewards
  const honeyRewards = [
    { action: 'Daily Login', reward: '5-50', icon: Flame },
    { action: 'Use Tools', reward: '5-10', icon: Zap },
    { action: 'Complete Courses', reward: '100-250', icon: BookOpen },
    { action: 'Win Games', reward: '10-100', icon: Trophy },
  ]

  return (
    <>
      {/* Header */}
      <header className="bg-deep-indigo border-b border-deep-indigo-light/20 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-deep-indigo/95">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <ImageComponent 
              src="/Logo.png" 
              alt="Zista Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">Zista</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/tools" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                false 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <WrenchIcon className="w-4 h-4" />
              <span className="font-medium">Tools</span>
            </Link>
            <Link 
              href="/learn" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                false 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">Learn</span>
            </Link>
            <Link 
              href="/games" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                false 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="font-medium">Play</span>
            </Link>
            <Link 
              href="/marketplace" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                false 
                  ? 'text-golden-honey bg-golden-honey/10' 
                  : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-medium">Shop</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && !isLoading && user ? (
            <>
              <div className="flex items-center gap-2 bg-golden-honey/10 px-3 py-2 rounded-xl border border-golden-honey/30">
                <div className="text-2xl">🍯</div>
                <div>
                  <div className="text-sm font-bold text-golden-honey">{user.honeyBalance || 0}</div>
                  <div className="text-xs text-golden-honey/70 hidden sm:block">Honey</div>
                </div>
              </div>
              <Link href="/profile">
                <div className="w-9 h-9 bg-gradient-to-br from-golden-honey to-golden-honey-dark rounded-xl flex items-center justify-center">
                  {user.avatar ? (
                    <ImageComponent 
                      src={user.avatar} 
                      alt={user.name} 
                      width={40} 
                      height={40} 
                      className="w-full h-full rounded-xl object-cover" 
                    />
                  ) : (
                    <User className="w-5 h-5 text-deep-indigo" />
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 text-white/70 hover:text-golden-honey font-medium transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-6 py-2 bg-golden-honey hover:bg-golden-honey-dark text-deep-indigo-dark font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
      
      <main className="min-h-screen bg-deep-indigo-dark">
        {/* Hero Section with Storytelling */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-golden-honey/5 via-deep-indigo to-deep-indigo-dark"></div>
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="max-w-6xl mx-auto">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Left Column - Story & Brand */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-golden-honey/10 px-4 py-2 rounded-full border border-golden-honey/30 mb-6">
                      <div className="w-6 h-6 bg-golden-honey rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-deep-indigo-dark" />
                      </div>
                      <span className="text-golden-honey font-semibold text-sm">Life-Changing Productivity</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 bg-gradient-to-r from-golden-honey to-golden-honey-light bg-clip-text text-transparent leading-tight">
                      Zista
                    </h1>
                    
                    <p className="text-2xl md:text-3xl text-white mb-4 font-semibold">
                      Stay Busy. Stay Smart.
                    </p>
                    
                    <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
                      Your all-in-one productivity hive for tools, learning, games &amp; rewards. 
                      Join thousands of Kenyan youth transforming their daily hustle into productive mastery.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                      <Link href="/signup">
                        <button className="group px-8 py-4 bg-gradient-to-r from-golden-honey to-golden-honey-dark hover:from-golden-honey-dark hover:to-golden-honey text-deep-indigo-dark font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3 text-lg">
                          <Smartphone className="w-5 h-5" />
                          Start Earning Honey
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </Link>
                      <Link href="/tools">
                        <button className="px-8 py-4 bg-deep-indigo-light/20 hover:bg-deep-indigo-light/30 text-white font-semibold rounded-xl transition-all border-2 border-deep-indigo-light/30 hover:border-golden-honey/50 flex items-center gap-3 text-lg">
                          <Play className="w-5 h-5" />
                          See How It Works
                        </button>
                      </Link>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-golden-honey" />
                        <span className="text-white/80">20+ Powerful Tools</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-golden-honey" />
                        <span className="text-white/80">100% Free to Start</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-golden-honey" />
                        <span className="text-white/80">Earn While You Work</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Visual Representation */}
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      {/* Main App Mockup */}
                      <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-deep-indigo-light to-deep-indigo border-2 border-golden-honey/20 shadow-2xl overflow-hidden">
                        {/* App Header */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-deep-indigo-light/50 backdrop-blur-sm border-b border-deep-indigo-light/20 flex items-center px-4">
                          <div className="w-8 h-8 rounded-lg bg-golden-honey flex items-center justify-center">
                            <Zap className="w-4 h-4 text-deep-indigo-dark" />
                          </div>
                          <div className="ml-2 text-white font-semibold">Zista</div>
                        </div>
                        
                        {/* App Content */}
                        <div className="pt-16 p-6 h-full flex flex-col">
                          <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 bg-golden-honey/10 px-3 py-1 rounded-full border border-golden-honey/30">
                              <span className="text-2xl">🍯</span>
                              <span className="text-golden-honey font-bold">125</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 flex-1">
                            <div className="bg-deep-indigo-light/30 rounded-xl border border-deep-indigo-light/20 flex flex-col items-center justify-center p-2">
                              <Download className="w-6 h-6 text-red-400 mb-1" />
                              <span className="text-xs text-white/80 text-center">Downloader</span>
                            </div>
                            <div className="bg-deep-indigo-light/30 rounded-xl border border-deep-indigo-light/20 flex flex-col items-center justify-center p-2">
                              <BookOpen className="w-6 h-6 text-blue-400 mb-1" />
                              <span className="text-xs text-white/80 text-center">Learn</span>
                            </div>
                            <div className="bg-deep-indigo-light/30 rounded-xl border border-deep-indigo-light/20 flex flex-col items-center justify-center p-2">
                              <Gamepad2 className="w-6 h-6 text-green-400 mb-1" />
                              <span className="text-xs text-white/80 text-center">Games</span>
                            </div>
                            <div className="bg-deep-indigo-light/30 rounded-xl border border-deep-indigo-light/20 flex flex-col items-center justify-center p-2">
                              <ShoppingBag className="w-6 h-6 text-purple-400 mb-1" />
                              <span className="text-xs text-white/80 text-center">Shop</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-center">
                            <div className="text-xs text-white/60">Your Productivity Hive</div>
                          </div>
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-golden-honey/20 backdrop-blur-sm border border-golden-honey/30 flex items-center justify-center animate-pulse">
                          <span className="text-2xl">🍯</span>
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-accent-cyan/20 backdrop-blur-sm border border-accent-cyan/30 flex items-center justify-center animate-pulse delay-300">
                          <Zap className="w-5 h-5 text-accent-cyan" />
                        </div>
                      </div>
                      
                      {/* Floating Honey Elements */}
                      <div className="absolute -top-8 -left-8 w-20 h-20 rounded-full bg-golden-honey/10 backdrop-blur-sm border border-golden-honey/20 flex items-center justify-center animate-bounce">
                        <span className="text-3xl">🍯</span>
                      </div>
                      <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-golden-honey/10 backdrop-blur-sm border border-golden-honey/20 flex items-center justify-center animate-bounce delay-500">
                        <span className="text-2xl">🍯</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated Honey Trail */}
              <div className="absolute top-1/4 left-0 w-full h-1 flex items-center justify-between opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 rounded-full bg-golden-honey animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-b from-deep-indigo-dark to-deep-indigo">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-deep-indigo/50 backdrop-blur-sm rounded-2xl p-6 border border-deep-indigo-light/20 text-center">
                  <div className="inline-flex p-3 bg-golden-honey/10 rounded-xl mb-4">
                    <stat.icon className="w-8 h-8 text-golden-honey" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-golden-honey to-golden-honey-light bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 bg-deep-indigo">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-golden-honey/10 px-4 py-2 rounded-full border border-golden-honey/30 mb-4">
                <WrenchIcon className="w-5 h-5 text-golden-honey" />
                <span className="text-golden-honey font-semibold">20+ Powerful Tools</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Daily Productivity Supercharged</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Stop juggling multiple apps. Get everything you need in one seamless experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
              {tools.map((tool, index) => (
                <div 
                  key={index}
                  className="group relative bg-deep-indigo-light/10 border border-deep-indigo-light/20 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`mb-4 inline-flex p-3 bg-gradient-to-br ${tool.color} rounded-xl shadow-lg`}>
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-golden-honey transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">{tool.description}</p>
                    
                    {/* Category & Honey */}
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-golden-honey bg-golden-honey/10 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                      {tool.honey > 0 ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-golden-honey/10 rounded-full text-xs font-semibold text-golden-honey border border-golden-honey/30">
                          <Star className="w-3 h-3 fill-current" />
                          +{tool.honey}
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded-full text-xs font-semibold text-green-400 border border-green-500/30">
                          <CheckCircle className="w-3 h-3 fill-current" />
                          FREE
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Tools */}
            <div className="text-center">
              <Link href="/tools">
                <button className="px-8 py-4 bg-gradient-to-r from-golden-honey to-golden-honey-dark hover:from-golden-honey-dark hover:to-golden-honey text-deep-indigo-dark font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
                  <span>Explore All Tools</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Learn Section */}
        <section className="py-20 bg-deep-indigo-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent-cyan/10 px-4 py-2 rounded-full border border-accent-cyan/30 mb-4">
                <BookOpen className="w-5 h-5 text-accent-cyan" />
                <span className="text-accent-cyan font-semibold">18 Courses &amp; Growing</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Learn Skills That Matter</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Build real-world skills with bite-sized courses designed for busy Kenyan youth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
              {courses.map((course, index) => (
                <div 
                  key={index}
                  className="group bg-deep-indigo rounded-2xl overflow-hidden border border-deep-indigo-light/20 hover:border-accent-cyan/30 transition-all duration-300"
                >
                  <div className="h-40 bg-gradient-to-r from-accent-cyan/20 to-blue-500/20 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-accent-cyan/50" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">
                        {course.title}
                      </h3>
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-golden-honey/10 rounded-full text-xs font-semibold text-golden-honey border border-golden-honey/30">
                        <Star className="w-3 h-3 fill-current" />
                        +{course.honey}
                      </div>
                    </div>
                    <p className="text-sm text-white/60 mb-4">by {course.instructor}</p>
                    
                    <div className="flex justify-between text-xs text-white/50 mb-4">
                      <span>{course.lessons} lessons</span>
                      <span>{course.duration}</span>
                      <span className="px-2 py-0.5 bg-white/10 rounded">{course.level}</span>
                    </div>
                    
                    <button className="w-full py-2 bg-deep-indigo-light/20 hover:bg-deep-indigo-light/30 text-white font-medium rounded-lg transition-colors border border-deep-indigo-light/30 hover:border-accent-cyan/30">
                      Preview Course
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Courses */}
            <div className="text-center">
              <Link href="/learn">
                <button className="px-8 py-4 bg-gradient-to-r from-accent-cyan to-blue-500 hover:from-accent-cyan-dark hover:to-blue-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
                  <span>Browse Learning Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-20 bg-deep-indigo">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30 mb-4">
                <Gamepad2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">17 Skill-Based Games</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Play, Compete &amp; Earn</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Sharpen your mind with skill-based games. Compete with friends and earn Honey rewards.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
              {games.map((game, index) => (
                <div 
                  key={index}
                  className="group bg-deep-indigo-light/10 rounded-2xl p-6 border border-deep-indigo-light/20 hover:border-green-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <game.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{game.name}</h3>
                      <p className="text-sm text-white/60">{game.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-medium text-white/50">Players: {game.players}</span>
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-golden-honey/10 rounded-full text-xs font-semibold text-golden-honey border border-golden-honey/30">
                      <Star className="w-3 h-3 fill-current" />
                      {game.honey}
                    </div>
                  </div>
                  
                  <button className="w-full py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-medium rounded-lg transition-colors border border-green-500/30 hover:border-green-400/50">
                    Play Now
                  </button>
                </div>
              ))}
            </div>

            {/* Tournaments CTA */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-8 border border-green-500/30 text-center">
              <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Weekly Tournaments</h3>
              <p className="text-white/80 mb-6">
                Compete in Honey tournaments every week. Top players win big rewards!
              </p>
              <Link href="/games">
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl">
                  Join Tournament
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Marketplace Section */}
        <section className="py-20 bg-deep-indigo-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/30 mb-4">
                <ShoppingCart className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-semibold">23 Products &amp; Services</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Shop Curated for Youth</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Discover products and services from local partners. Use Honey for discounts.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-12">
              {/* Products */}
              <div className="bg-deep-indigo rounded-2xl p-6 border border-deep-indigo-light/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Gift className="w-6 h-6 text-purple-400" />
                  Trending Products
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {products.map((product, index) => (
                    <div 
                      key={index}
                      className="group bg-deep-indigo-light/10 rounded-xl p-4 border border-deep-indigo-light/20 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <ShoppingBag className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm text-white/60 mb-1">{product.category}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-golden-honey">{product.price}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-xs text-white/70">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="bg-deep-indigo rounded-2xl p-6 border border-deep-indigo-light/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                  Popular Services
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div 
                      key={index}
                      className="group bg-deep-indigo-light/10 rounded-xl p-4 border border-deep-indigo-light/20 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                            {service.name}
                          </h4>
                          <p className="text-sm text-white/60 mb-1">{service.provider}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-golden-honey">{service.price}</span>
                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                              {service.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* View Marketplace */}
            <div className="text-center">
              <Link href="/marketplace">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Honey Economy CTA */}
        <section className="py-20 bg-gradient-to-r from-golden-honey/10 to-yellow-500/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-golden-honey/20 px-4 py-2 rounded-full border border-golden-honey/50 mb-4">
                  <Crown className="w-5 h-5 text-golden-honey" />
                  <span className="text-golden-honey font-semibold">Honey Reward System</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Earn While You Work</h2>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Collect Honey tokens for daily logins, completing tasks, and using tools. 
                  Unlock premium features and exclusive content.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {honeyRewards.map((reward, index) => (
                  <div 
                    key={index}
                    className="bg-deep-indigo-dark rounded-2xl p-6 border border-deep-indigo-light/20 text-center group hover:border-golden-honey/30 transition-all"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-golden-honey/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-golden-honey/20 transition-colors">
                      <reward.icon className="w-8 h-8 text-golden-honey" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{reward.action}</h3>
                    <div className="text-2xl font-bold bg-gradient-to-r from-golden-honey to-yellow-500 bg-clip-text text-transparent">
                      +{reward.reward}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-golden-honey to-golden-honey-dark rounded-2xl p-8 text-center text-deep-indigo-dark">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Daily Earning Potential</h3>
                <div className="text-4xl font-bold mb-4">95 🍯/day</div>
                <p className="text-lg opacity-90 mb-6">
                  That&apos;s <span className="font-bold">2,850 Honey/month</span> to spend on premium features!
                </p>
                <Link href="/signup">
                  <button className="px-8 py-4 bg-deep-indigo-dark hover:bg-deep-indigo text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
                    <span>Start Earning Today</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-deep-indigo border-t border-deep-indigo-light/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ImageComponent 
                  src="/Logo.png" 
                  alt="Zista Logo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-white">Zista</span>
              </div>
              <p className="text-white/70 mb-4">
                Your all-in-one productivity hive for tools, learning, games & rewards.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-deep-indigo-light/30 flex items-center justify-center hover:bg-golden-honey/20 transition-colors">
                  <Youtube className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-deep-indigo-light/30 flex items-center justify-center hover:bg-golden-honey/20 transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-deep-indigo-light/30 flex items-center justify-center hover:bg-golden-honey/20 transition-colors">
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/tools" className="text-white/70 hover:text-golden-honey transition-colors">Tools</Link></li>
                <li><Link href="/learn" className="text-white/70 hover:text-golden-honey transition-colors">Learning</Link></li>
                <li><Link href="/games" className="text-white/70 hover:text-golden-honey transition-colors">Games</Link></li>
                <li><Link href="/marketplace" className="text-white/70 hover:text-golden-honey transition-colors">Marketplace</Link></li>
                <li><Link href="/pricing" className="text-white/70 hover:text-golden-honey transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-white/70 hover:text-golden-honey transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-white/70 hover:text-golden-honey transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="text-white/70 hover:text-golden-honey transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-white/70 hover:text-golden-honey transition-colors">Contact</Link></li>
                <li><Link href="/partners" className="text-white/70 hover:text-golden-honey transition-colors">Partners</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-white/70 hover:text-golden-honey transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="text-white/70 hover:text-golden-honey transition-colors">Privacy</Link></li>
                <li><Link href="/cookies" className="text-white/70 hover:text-golden-honey transition-colors">Cookies</Link></li>
                <li><Link href="/security" className="text-white/70 hover:text-golden-honey transition-colors">Security</Link></li>
                <li><Link href="/compliance" className="text-white/70 hover:text-golden-honey transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-deep-indigo-light/20 mt-8 pt-8 text-center">
            <p className="text-white/50">
              &copy; {new Date().getFullYear()} Z-Star | Life in Motion. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}