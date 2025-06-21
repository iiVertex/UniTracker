'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase'
import { GraduationCap, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        // Redirect to dashboard
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue via-primary-darkBlue to-primary-lightBlue flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold text-white">UniTracker</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-white/80 mt-2">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-card p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-neutral-mediumGray hover:text-neutral-darkGray"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {error && (
              <div className="text-accent-red text-sm bg-accent-red/10 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="border border-black text-black px-6 py-2 rounded mx-auto block mt-4 text-sm bg-transparent hover:bg-black/5"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Log in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-black">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-red hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 