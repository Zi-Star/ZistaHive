'use client'

import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag, User, Settings, Search, Download, QrCode, Calculator, Lock, RefreshCw, Image, FileText, Palette, Code2, Hash, Star, Bell } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { PageTransition } from '../../components/PageTransition'

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  const tools = [
    { id: 1, name: 'YouTube Downloader', icon: Download, category: 'Media', description: 'Download videos and audio', color: 'from-red-500 to-pink-500' },
    { id: 2, name: 'QR Code Generator', icon: QrCode, category: 'Productivity', description: 'Create custom QR codes', color: 'from-blue-500 to-cyan-500' },
    { id: 3, name: 'Unit Converter', icon: RefreshCw, category: 'Utility', description: 'Convert units & measurements', color: 'from-orange-500 to-amber-500' },
    { id: 4, name: 'Password Generator', icon: Lock, category: 'Security', description: 'Generate secure passwords', color: 'from-purple-500 to-violet-500' },
    { id: 5, name: 'Calculator', icon: Calculator, category: 'Utility', description: 'Advanced calculator', color: 'from-green-500 to-emerald-500' },
    { id: 6, name: 'Image Compressor', icon: Image, category: 'Media', description: 'Reduce image file size', color: 'from-indigo-500 to-blue-500' },
    { id: 7, name: 'PDF Tools', icon: FileText, category: 'Documents', description: 'Merge, split PDFs', color: 'from-teal-500 to-cyan-500' },
    { id: 8, name: 'Color Picker', icon: Palette, category: 'Design', description: 'Pick & convert colors', color: 'from-pink-500 to-rose-500' },
    { id: 9, name: 'JSON Formatter', icon: Code2, category: 'Developer', description: 'Format & validate JSON', color: 'from-yellow-500 to-orange-500' },
    { id: 10, name: 'MD5 Generator', icon: Hash, category: 'Security', description: 'Generate MD5 hashes', color: 'from-gray-500 to-slate-500' },
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
          <div className="flex items-center gap-2 bg-primary-50 px-3 py-2 rounded-xl border border-primary-200">
            <div className="text-2xl">🍯</div>
            <div>
              <div className="text-sm font-bold text-gray-900">1250</div>
              <div className="text-xs text-gray-600 hidden sm:block">Honey</div>
            </div>
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <Link href="/profile">
            <div className="flex items-center gap-2 hover:bg-gray-100 rounded-xl p-2 transition-colors">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-gray-900 leading-tight">Ziramzis</div>
              </div>
            </div>
          </Link>
        </div>
      </header>

      <PageTransition>
        <main className="flex-1 overflow-y-auto pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-primary-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {tool.name}
                </h3>
                <div className="text-xs text-primary-600 font-semibold mb-2">{tool.category}</div>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                
                <div className="flex items-center gap-1 text-xs font-semibold text-primary-700">
                  <Star className="w-3 h-3 fill-current" />
                  +5 Honey
                </div>
              </div>
            ))}
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
