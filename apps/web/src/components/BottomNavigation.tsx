'use client'

import { Home, Wrench, GraduationCap, Gamepad2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BottomNavigation() {
  const pathname = usePathname()

  // Don't show on auth pages or homepage
  if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
    return null
  }

  return (
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
  )
}
