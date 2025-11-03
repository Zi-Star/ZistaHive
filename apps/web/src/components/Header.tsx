'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Zap, Wrench, GraduationCap, Gamepad2, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'

export function Header() {
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything on the server
  if (!isClient) {
    return (
      <header className="bg-deep-indigo border-b border-deep-indigo-light/20 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-deep-indigo/95">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-golden-honey to-golden-honey-dark rounded-xl"></div>
          <span className="text-xl font-bold text-white">Zista</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24 h-8 bg-deep-indigo-light/20 rounded-xl animate-pulse"></div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-deep-indigo border-b border-deep-indigo-light/20 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-sm bg-deep-indigo/95">
      <div className="flex items-center gap-6">
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

        <nav className="hidden md:flex items-center gap-1">
          <Link 
            href="/tools" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              pathname === '/tools' 
                ? 'text-golden-honey bg-golden-honey/10' 
                : 'text-white/70 hover:text-golden-honey hover:bg-deep-indigo-light/20'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span className="font-medium">Tools</span>
          </Link>
          <Link 
            href="/learn" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              pathname === '/learn' 
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
              pathname === '/games' 
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
              pathname === '/marketplace' 
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
                  <Image 
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
  )
}