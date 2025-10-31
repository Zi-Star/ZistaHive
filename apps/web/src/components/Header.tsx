import Link from 'next/link'
import { HoneyPot } from '@zistahive/ui'
import { Zap, Wrench, GraduationCap, Gamepad2, ShoppingBag, User } from 'lucide-react'

interface HeaderProps {
  user?: {
    name: string
    honeyBalance: number
    avatar?: string
  }
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-dark-900">Zista</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">
              <Wrench className="w-4 h-4" />
              Tools
            </Link>
            <Link href="/learn" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">
              <GraduationCap className="w-4 h-4" />
              Learn
            </Link>
            <Link href="/games" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">
              <Gamepad2 className="w-4 h-4" />
              Games
            </Link>
            <Link href="/marketplace" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">
              <ShoppingBag className="w-4 h-4" />
              Marketplace
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <HoneyPot balance={user.honeyBalance} size="sm" />
                <Link href="/profile">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-bold text-white cursor-pointer hover:scale-105 transition-transform shadow-md">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-dark-900 font-semibold rounded-lg transition-colors">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
