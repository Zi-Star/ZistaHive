'use client'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Download, QrCode, Calculator, Lock, FileText, Palette, RefreshCw, Image, Code2, Hash, Smartphone, Zap, Users, Trophy, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-deep-indigo-dark">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-golden-honey/10 via-deep-indigo to-deep-indigo-dark opacity-50"></div>
          <div className="container mx-auto px-4 py-20 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Logo Icon */}
              <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-golden-honey to-golden-honey-dark rounded-2xl shadow-2xl">
                <Zap className="w-10 h-10 text-deep-indigo-dark" />
              </div>

              <h1 className="text-6xl md:text-7xl font-display font-black mb-6 bg-gradient-to-r from-golden-honey to-golden-honey-light bg-clip-text text-transparent">
                Zista
              </h1>

              <p className="text-2xl md:text-3xl text-white mb-4 font-semibold">
                Stay Busy. Stay Smart.
              </p>

              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Your all-in-one productivity platform. 20+ powerful tools, learning resources, 
                and rewards - all in one seamless experience.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/dashboard">
                  <button className="group px-8 py-4 bg-golden-honey hover:bg-golden-honey-dark text-deep-indigo-dark font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Get Started Free
                  </button>
                </Link>
                <Link href="/tools">
                  <button className="px-8 py-4 bg-deep-indigo hover:bg-deep-indigo-light text-white font-semibold rounded-xl transition-all border-2 border-deep-indigo-light/30 hover:border-golden-honey/50 flex items-center gap-2">
                    Explore Tools
                    <Code2 className="w-5 h-5" />
                  </button>
                </Link>
              </div>
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
