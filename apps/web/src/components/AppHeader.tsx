'use client'

import { User, Bell } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth, useHoney } from '@/hooks/useAuth'

export function AppHeader() {
  const { user: authUser } = useAuth()
  const { honeyBalance } = useHoney()

  return (
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
        {/* Honey Balance */}
        <div className="flex items-center gap-2 bg-golden-honey/10 px-3 py-2 rounded-xl border border-golden-honey/30">
          <div className="text-2xl">🍯</div>
          <div>
            <div className="text-sm font-bold text-golden-honey">{honeyBalance || 0}</div>
            <div className="text-xs text-golden-honey/70 hidden sm:block">Honey</div>
          </div>
        </div>

        <button className="relative p-2 hover:bg-deep-indigo-light/30 rounded-xl transition-colors">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <Link href="/profile" className="flex items-center gap-2 hover:bg-deep-indigo-light/30 rounded-xl p-2 transition-colors">
          <div className="w-9 h-9 bg-gradient-to-br from-golden-honey to-golden-honey-dark rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-deep-indigo" />
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-semibold text-white leading-tight">{authUser?.name || 'User'}</div>
          </div>
        </Link>
      </div>
    </header>
  )
}
