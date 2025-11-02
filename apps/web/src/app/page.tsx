'use client'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Download, QrCode, Calculator, Lock, FileText, Palette, RefreshCw, Image, Code2, Hash, Smartphone, Zap, Users, Trophy, TrendingUp, Star, Play, BookOpen, Gamepad2, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ImageComponent from 'next/image'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    { icon: Download, title: 'Media Downloader', description: 'Download videos & audio from YouTube', color: 'from-red-500 to-pink-500' },
    { icon: QrCode, title: 'QR Generator', description: 'Create custom QR codes instantly', color: 'from-blue-500 to-cyan-500' },
    { icon: Calculator, title: 'Calculator', description: 'Advanced calculator with history', color: 'from-green-500 to-emerald-500' },
    { icon: Lock, title: 'Password Gen', description: 'Generate secure passwords', color: 'from-purple-500 to-violet-500' },
    { icon: RefreshCw, title: 'Unit Converter', description: 'Convert units & measurements', color: 'from-orange-500 to-amber-500' },
    { icon: Image, title: 'Image Tools', description: 'Compress & optimize images', color: 'from-indigo-500 to-blue-500' },
    { icon: FileText, title: 'PDF Tools', description: 'Merge, split & convert PDFs', color: 'from-teal-500 to-cyan-500' },
    { icon: Palette, title: 'Color Picker', description: 'Pick & convert colors', color: 'from-pink-500 to-rose-500' },
  ]

  const valueProps = [
    { 
      icon: Zap, 
      title: 'All-in-One Convenience', 
      description: 'Stop juggling 10+ apps. Get everything you need in one seamless experience.' 
    },
    { 
      icon: Trophy, 
      title: 'Get Rewarded', 
      description: 'Earn Honey for being productive. Spend it on premium features and exclusive content.' 
    },
    { 
      icon: Users, 
      title: 'Built for Kenyan Youth', 
      description: 'Designed specifically for the needs and aspirations of young Kenyans.' 
    }
  ]

  return (
    <>
      <Header />
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
                      Your all-in-one productivity hive for tools, learning, games & rewards. 
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

        {/* Value Propositions */}
        <section className="py-20 bg-gradient-to-b from-deep-indigo-dark to-deep-indigo">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Zista is Different</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">We didn't just build another productivity app. We created a complete ecosystem for Kenyan youth.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {valueProps.map((prop, index) => (
                <div 
                  key={index}
                  className={`group bg-deep-indigo/50 backdrop-blur-sm rounded-2xl p-8 border border-deep-indigo-light/20 hover:border-golden-honey/30 transition-all duration-500 hover:-translate-y-2 ${index === 1 ? 'relative overflow-hidden' : ''}`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-golden-honey/5 rounded-full -translate-y-16 translate-x-16"></div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${index === 0 ? 'from-red-500/20 to-pink-500/20' : index === 1 ? 'from-golden-honey/20 to-yellow-500/20' : 'from-blue-500/20 to-cyan-500/20'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <prop.icon className={`w-8 h-8 ${index === 0 ? 'text-red-400' : index === 1 ? 'text-golden-honey' : 'text-blue-400'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{prop.title}</h3>
                  <p className="text-white/70">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid - App-like Module Cards */}
        <section className="py-20 bg-deep-indigo">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Powerful Tools at Your Fingertips</h2>
              <p className="text-xl text-white/70">Everything you need for daily productivity</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <Link href="/tools" key={index}>
                  <div className="group relative bg-deep-indigo-light/10 border border-deep-indigo-light/20 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                    
                    <div className="relative">
                      {/* Icon */}
                      <div className={`mb-4 inline-flex p-3 bg-gradient-to-br ${feature.color} rounded-xl shadow-lg`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-golden-honey transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/60">{feature.description}</p>
                      
                      {/* Honey Badge */}
                      <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-golden-honey/10 rounded-full text-xs font-semibold text-golden-honey border border-golden-honey/30">
                        <Star className="w-3 h-3 fill-current" />
                        +5 Honey
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Tools */}
            <div className="text-center mt-12">
              <Link href="/tools">
                <button className="px-6 py-3 bg-deep-indigo-light/20 hover:bg-deep-indigo-light/30 text-white font-semibold rounded-xl transition-all inline-flex items-center gap-2 border border-deep-indigo-light/20 hover:border-golden-honey/30">
                  View All 20+ Tools
                  <TrendingUp className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-deep-indigo-dark">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-deep-indigo rounded-2xl p-8 text-center shadow-lg border border-deep-indigo-light/20">
                <div className="text-5xl font-bold bg-gradient-to-r from-golden-honey to-golden-honey-light bg-clip-text text-transparent mb-2">20+</div>
                <div className="text-white/70 font-medium">Productivity Tools</div>
              </div>
              <div className="bg-deep-indigo rounded-2xl p-8 text-center shadow-lg border border-deep-indigo-light/20">
                <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-white/70 font-medium">Free to Start</div>
              </div>
              <div className="bg-deep-indigo rounded-2xl p-8 text-center shadow-lg border border-deep-indigo-light/20">
                <div className="text-5xl font-bold bg-gradient-to-r from-accent-cyan to-accent-cyan-light bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-white/70 font-medium">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Honey Economy CTA */}
        <section className="py-20 bg-deep-indigo">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-golden-honey to-golden-honey-dark rounded-3xl p-12 text-center text-deep-indigo-dark shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-deep-indigo-dark/10 rounded-2xl mb-6">
                <Trophy className="w-8 h-8 text-deep-indigo-dark" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Earn Rewards While You Work</h2>
              <p className="text-xl mb-8 opacity-90">
                Collect Honey tokens for daily logins, completing tasks, and using tools. 
                Unlock premium features and exclusive content.
              </p>
              <div className="flex justify-center gap-6 flex-wrap">
                <div className="bg-deep-indigo-dark/10 backdrop-blur-sm rounded-xl p-6 min-w-[150px]">
                  <Star className="w-8 h-8 mx-auto mb-2 fill-current text-deep-indigo-dark" />
                  <div className="text-sm opacity-90">Daily Login</div>
                  <div className="text-2xl font-bold">5-50</div>
                </div>
                <div className="bg-deep-indigo-dark/10 backdrop-blur-sm rounded-xl p-6 min-w-[150px]">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-deep-indigo-dark" />
                  <div className="text-sm opacity-90">Use Tools</div>
                  <div className="text-2xl font-bold">5-10</div>
                </div>
                <div className="bg-deep-indigo-dark/10 backdrop-blur-sm rounded-xl p-6 min-w-[150px]">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-deep-indigo-dark" />
                  <div className="text-sm opacity-90">Level Up</div>
                  <div className="text-2xl font-bold">500</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}