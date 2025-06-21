'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { 
  GraduationCap, 
  Home, 
  Plus, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User
} from 'lucide-react'

interface SidebarProps {
  userEmail?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ userEmail }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Add University', href: '/dashboard/add', icon: Plus },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-card"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-card transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 p-6 border-b border-black">
            <GraduationCap className="h-8 w-8 text-black" />
            <span className="text-xl font-bold text-black">UniTracker</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={
                    `group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-black hover:bg-black/80 hover:text-white`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 text-black group-hover:text-white" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-black">
            <div className="flex flex-col items-center mb-4">
              <p className="text-sm font-medium text-black truncate text-center">
                {userEmail || 'User'}
              </p>
            </div>
            
            <Button
              type="button"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start border border-black text-black bg-transparent hover:bg-black/10"
            >
              <LogOut className="h-4 w-4 mr-2 text-black" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
} 