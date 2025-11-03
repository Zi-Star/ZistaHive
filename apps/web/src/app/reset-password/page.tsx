'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Lock, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const token = searchParams.get('token')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!token) {
      setError('Invalid reset link')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!token) {
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
            <h1 className="text-2xl font-bold text-white mb-4">Invalid Reset Link</h1>
            <p className="text-white/70 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Link 
              href="/forgot-password" 
              className="inline-block px-6 py-3 bg-golden-honey hover:bg-golden-honey-dark text-deep-indigo-dark font-semibold rounded-xl transition-all"
            >
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    )
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
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Password Reset Successful</h1>
            <p className="text-white/70 mb-6">
              Your password has been updated successfully. You will be redirected to the login page.
            </p>
            <Link 
              href="/login" 
              className="inline-block px-6 py-3 bg-golden-honey hover:bg-golden-honey-dark text-deep-indigo-dark font-semibold rounded-xl transition-all"
            >
              Go to Login
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
          <h1 className="text-2xl font-bold text-white mb-2">Reset Your Password</h1>
          <p className="text-white/70">Enter your new password below</p>
        </div>

        <div className="bg-deep-indigo rounded-2xl shadow-xl p-8 border border-deep-indigo-light/20">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-12 py-3 bg-deep-indigo-light/10 border border-deep-indigo-light/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-golden-honey focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-white/50">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-12 py-3 bg-deep-indigo-light/10 border border-deep-indigo-light/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-golden-honey focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-golden-honey to-golden-honey-dark hover:from-golden-honey-dark hover:to-golden-honey text-deep-indigo-dark font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}