'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-deep-indigo-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image 
                src="/Logo.png" 
                alt="Zista Logo" 
                width={56} 
                height={56} 
                className="w-14 h-14 mx-auto"
              />
              <span className="text-3xl font-bold text-white">Zista</span>
            </Link>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Check Your Email</h1>
            <p className="text-white/70 mb-6">
              If an account exists for {email}, you will receive a password reset link shortly.
            </p>
            <Link 
              href="/login" 
              className="inline-block px-6 py-3 bg-golden-honey hover:bg-golden-honey-dark text-deep-indigo-dark font-semibold rounded-xl transition-all"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-indigo-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <Image 
              src="/Logo.png" 
              alt="Zista Logo" 
              width={56} 
              height={56} 
              className="w-14 h-14"
            />
            <span className="text-3xl font-bold text-white">Zista</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-white/70">Enter your email to reset your password</p>
        </div>

        <div className="bg-deep-indigo rounded-2xl shadow-xl p-8 border border-deep-indigo-light/20">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-deep-indigo-light/10 border border-deep-indigo-light/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-golden-honey focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-golden-honey to-golden-honey-dark hover:from-golden-honey-dark hover:to-golden-honey text-deep-indigo-dark font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            Remember your password?{' '}
            <Link href="/login" className="text-golden-honey hover:text-golden-honey-light font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}