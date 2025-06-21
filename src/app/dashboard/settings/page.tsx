'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { User, Mail, Shield, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function Settings() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-darkGray">Settings</h1>
        <p className="text-neutral-darkGray mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-primary-blue" />
              <h2 className="text-xl font-semibold text-neutral-darkGray">Profile Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-darkGray mb-2">
                  Email Address
                </label>
                <div className="flex items-center space-x-3 p-3 bg-neutral-lightGray rounded-lg">
                  <Mail className="h-4 w-4 text-neutral-darkGray" />
                  <span className="text-neutral-darkGray">{user?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-darkGray mb-2">
                  User ID
                </label>
                <div className="flex items-center space-x-3 p-3 bg-neutral-lightGray rounded-lg">
                  <Shield className="h-4 w-4 text-neutral-darkGray" />
                  <span className="text-neutral-darkGray font-mono text-sm">
                    {user?.id}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-darkGray mb-2">
                  Account Created
                </label>
                <div className="p-3 bg-neutral-lightGray rounded-lg">
                  <span className="text-neutral-darkGray">
                    {new Date(user?.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
            <h2 className="text-xl font-semibold text-neutral-darkGray mb-6">Account Actions</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-neutral-lightGray rounded-lg">
                <h3 className="font-medium text-neutral-darkGray mb-2">Delete Account</h3>
                <p className="text-sm text-neutral-darkGray mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-accent-red hover:bg-accent-red/10"
                >
                  Delete Account
                </Button>
              </div>

              <div className="p-4 border border-neutral-lightGray rounded-lg">
                <h3 className="font-medium text-neutral-darkGray mb-2">Export Data</h3>
                <p className="text-sm text-neutral-darkGray mb-4">
                  Download all your university application data as a JSON file.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                >
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
            <h2 className="text-xl font-semibold text-neutral-darkGray mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* App Information */}
          <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
            <h2 className="text-xl font-semibold text-neutral-darkGray mb-4">App Information</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-darkGray">Version</span>
                <span className="text-neutral-darkGray">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-darkGray">Database</span>
                <span className="text-neutral-darkGray">Supabase</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-darkGray">Framework</span>
                <span className="text-neutral-darkGray">Next.js 14</span>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
            <h2 className="text-xl font-semibold text-neutral-darkGray mb-4">Support</h2>
            
            <p className="text-sm text-neutral-darkGray mb-4">
              Need help? Contact our support team or check our documentation.
            </p>
            
            <div className="space-y-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
              >
                Contact Support
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
              >
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 