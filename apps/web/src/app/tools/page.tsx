'use client'

import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Search, Download, QrCode, Calculator, Lock, RefreshCw, Image as ImageIcon, FileText, Palette, Code2, Hash, Star, Bell, Instagram, Twitter, Music, Scissors, Zap, FileImage, FileSpreadsheet, Percent, Clock, Globe } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import ImageComponent from 'next/image'
import { useAuth, useHoney } from '@/hooks/useAuth'
import { AppHeader } from '@/components/AppHeader'
import { BottomNavigation } from '@/components/BottomNavigation'

type Category = 'All' | 'Downloads' | 'Image' | 'Document' | 'Calculator' | 'Security' | 'Developer'

interface Tool {
  id: number
  name: string
  icon: any
  category: Exclude<Category, 'All'>
  description: string
  color: string
  honey: number
}

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const pathname = usePathname()
  const { user: authUser } = useAuth()
  const { honeyBalance } = useHoney()

  const tools: Tool[] = useMemo(() => [
    // Downloads
    { id: 1, name: 'YouTube Downloader', icon: Download, category: 'Downloads', description: 'Download videos and audio', color: 'from-red-500 to-pink-500', honey: 10 },
    { id: 2, name: 'Instagram Downloader', icon: Instagram, category: 'Downloads', description: 'Save Instagram media', color: 'from-purple-500 to-pink-500', honey: 10 },
    { id: 3, name: 'Twitter Video', icon: Twitter, category: 'Downloads', description: 'Download Twitter videos', color: 'from-blue-400 to-cyan-500', honey: 10 },
    { id: 4, name: 'TikTok Downloader', icon: Music, category: 'Downloads', description: 'Save TikTok videos', color: 'from-pink-500 to-rose-500', honey: 10 },
    
    // Image Tools  
    { id: 5, name: 'Image Compressor', icon: ImageIcon, category: 'Image', description: 'Reduce image file size', color: 'from-indigo-500 to-blue-500', honey: 5 },
    { id: 6, name: 'Photo Collage', icon: FileImage, category: 'Image', description: 'Create photo collages', color: 'from-purple-500 to-violet-500', honey: 5 },
    { id: 7, name: 'Background Remover', icon: Scissors, category: 'Image', description: 'Remove image backgrounds', color: 'from-cyan-500 to-blue-500', honey: 10 },
    { id: 8, name: 'Image Converter', icon: RefreshCw, category: 'Image', description: 'Convert image formats', color: 'from-orange-500 to-amber-500', honey: 0 },
    
    // Document Tools  
    { id: 9, name: 'PDF Tools', icon: FileText, category: 'Document', description: 'Merge, split PDFs', color: 'from-teal-500 to-cyan-500', honey: 5 },
    { id: 10, name: 'Word to PDF', icon: FileText, category: 'Document', description: 'Convert DOCX to PDF', color: 'from-blue-500 to-indigo-500', honey: 5 },
    { id: 11, name: 'Excel to CSV', icon: FileSpreadsheet, category: 'Document', description: 'Convert spreadsheets', color: 'from-green-500 to-emerald-500', honey: 0 },
    
    // Calculators
    { id: 12, name: 'Calculator', icon: Calculator, category: 'Calculator', description: 'Advanced calculator', color: 'from-green-500 to-emerald-500', honey: 0 },
    { id: 13, name: 'Unit Converter', icon: RefreshCw, category: 'Calculator', description: 'Convert units', color: 'from-orange-500 to-amber-500', honey: 0 },
    { id: 14, name: 'Percentage Calculator', icon: Percent, category: 'Calculator', description: 'Calculate percentages', color: 'from-yellow-500 to-orange-500', honey: 0 },
    { id: 15, name: 'Time Zone Converter', icon: Clock, category: 'Calculator', description: 'Convert time zones', color: 'from-blue-400 to-cyan-400', honey: 0 },
    
    // Security
    { id: 16, name: 'Password Generator', icon: Lock, category: 'Security', description: 'Generate secure passwords', color: 'from-purple-500 to-violet-500', honey: 0 },
    { id: 17, name: 'MD5 Generator', icon: Hash, category: 'Security', description: 'Generate MD5 hashes', color: 'from-gray-500 to-slate-500', honey: 0 },
    { id: 18, name: 'QR Code Generator', icon: QrCode, category: 'Security', description: 'Create custom QR codes', color: 'from-blue-500 to-cyan-500', honey: 5 },
    
    // Developer
    { id: 19, name: 'JSON Formatter', icon: Code2, category: 'Developer', description: 'Format & validate JSON', color: 'from-yellow-500 to-orange-500', honey: 0 },
    { id: 20, name: 'Color Picker', icon: Palette, category: 'Developer', description: 'Pick & convert colors', color: 'from-pink-500 to-rose-500', honey: 0 },
    { id: 21, name: 'Base64 Encoder', icon: Code2, category: 'Developer', description: 'Encode/decode Base64', color: 'from-indigo-500 to-purple-500', honey: 0 },
  ], [])

  const categories: { id: Category; label: string; icon: any }[] = useMemo(() => [
    { id: 'All', label: 'All Tools', icon: Zap },
    { id: 'Downloads', label: 'Downloads', icon: Download },
    { id: 'Image', label: 'Image', icon: ImageIcon },
    { id: 'Document', label: 'Document', icon: FileText },
    { id: 'Calculator', label: 'Calculator', icon: Calculator },
    { id: 'Security', label: 'Security', icon: Lock },
    { id: 'Developer', label: 'Developer', icon: Code2 },
  ], [])

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [tools, searchQuery, activeCategory])

  const handleCategoryChange = useCallback((category: Category) => {
    setActiveCategory(category)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-deep-indigo-dark">
      <AppHeader />
      <main className="flex-1 overflow-y-auto pb-20">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">All Tools</h1>
              <p className="text-white/70">Discover {tools.length}+ powerful productivity tools</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search tools..."
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

            {/* Tools Count */}
            <div className="mb-4">
              <p className="text-sm text-white/60">
                Showing <span className="text-golden-honey font-semibold">{filteredTools.length}</span> tool{filteredTools.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Tools Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="group bg-deep-indigo/50 backdrop-blur-sm border border-deep-indigo-light/20 rounded-xl p-5 hover:border-golden-honey/50 hover:bg-deep-indigo/70 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      {tool.honey > 0 && (
                        <div className="bg-golden-honey/10 border border-golden-honey/30 px-2 py-1 rounded-md">
                          <span className="text-xs font-bold text-golden-honey">{tool.honey} 🍯</span>
                        </div>
                      )}
                      {tool.honey === 0 && (
                        <div className="bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-md">
                          <span className="text-xs font-bold text-green-400">FREE</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-golden-honey transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-white/60 mb-2">{tool.description}</p>
                    <div className="text-[10px] text-white/40 font-medium uppercase tracking-wide">{tool.category}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-deep-indigo/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No tools found</h3>
                <p className="text-white/60 text-sm">Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </main>
      <BottomNavigation />
    </div>
  )
}