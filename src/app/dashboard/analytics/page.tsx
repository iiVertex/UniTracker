'use client'

import { useEffect, useState } from 'react'
import { supabase, University } from '@/lib/supabase'
import { 
  GraduationCap, 
  Globe, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Minus
} from 'lucide-react'

export default function Analytics() {
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUniversities()
  }, [])

  const fetchUniversities = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching universities:', error)
      } else {
        setUniversities(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: universities.length,
    applying: universities.filter(u => u.status === 'Applying').length,
    waiting: universities.filter(u => u.status === 'Waiting').length,
    accepted: universities.filter(u => u.status === 'Accepted').length,
    rejected: universities.filter(u => u.status === 'Rejected').length,
    waitlisted: universities.filter(u => u.status === 'Waitlisted').length,
  }

  const financialStats = {
    totalFees: universities.reduce((sum, uni) => sum + uni.application_fees, 0),
    avgScholarship: universities.length > 0 
      ? universities.reduce((sum, uni) => sum + uni.scholarship_percentage, 0) / universities.length 
      : 0,
    maxScholarship: Math.max(...universities.map(u => u.scholarship_percentage), 0),
  }

  const countryStats = universities.reduce((acc, uni) => {
    acc[uni.country] = (acc[uni.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topCountries = Object.entries(countryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  const upcomingDeadlines = universities
    .filter(uni => new Date(uni.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5)

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
        <h1 className="text-3xl font-bold text-neutral-darkGray">Analytics</h1>
        <p className="text-neutral-mediumGray mt-1">Insights into your university applications</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card border border-neutral-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-darkGray">Total Applications</p>
              <p className="text-2xl font-bold text-neutral-darkGray">{stats.total}</p>
            </div>
            <GraduationCap className="h-8 w-8 text-primary-blue" />
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-neutral-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-darkGray">Total Fees Paid</p>
              <p className="text-2xl font-bold text-neutral-darkGray">${financialStats.totalFees.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-accent-green" />
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-neutral-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-darkGray">Avg Scholarship</p>
              <p className="text-2xl font-bold text-neutral-darkGray">{financialStats.avgScholarship.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-accent-orange" />
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-neutral-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-darkGray">Countries</p>
              <p className="text-2xl font-bold text-neutral-darkGray">{Object.keys(countryStats).length}</p>
            </div>
            <Globe className="h-8 w-8 text-primary-blue" />
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
          <h2 className="text-xl font-semibold text-neutral-darkGray mb-4">Application Status</h2>
          <div className="space-y-4">
            {Object.entries(stats).map(([status, count]) => {
              if (status === 'total') return null
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'accepted': return 'bg-accent-green'
                  case 'rejected': return 'bg-accent-red'
                  case 'waitlisted': return 'bg-accent-orange'
                  case 'waiting': return 'bg-primary-blue'
                  default: return 'bg-neutral-mediumGray'
                }
              }
              const getStatusIcon = (status: string) => {
                switch (status) {
                  case 'accepted': return <CheckCircle className="h-4 w-4 text-accent-green" />
                  case 'rejected': return <XCircle className="h-4 w-4 text-accent-red" />
                  case 'waitlisted': return <AlertCircle className="h-4 w-4 text-accent-orange" />
                  case 'waiting': return <Clock className="h-4 w-4 text-primary-blue" />
                  default: return <Minus className="h-4 w-4 text-neutral-mediumGray" />
                }
              }
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(status)}
                    <span className="text-sm font-medium text-neutral-darkGray capitalize">
                      {status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-neutral-lightGray rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getStatusColor(status)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-neutral-darkGray w-12 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
          <h2 className="text-xl font-semibold text-neutral-darkGray mb-4">Top Countries</h2>
          <div className="space-y-4">
            {topCountries.map(([country, count]) => {
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0
              return (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-darkGray">
                    {country}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-neutral-lightGray rounded-full h-2">
                      <div 
                        className="h-2 bg-primary-blue rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-neutral-darkGray w-12 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
        <h2 className="text-xl font-semibold text-neutral-darkGray mb-4">Upcoming Deadlines</h2>
        {upcomingDeadlines.length === 0 ? (
          <p className="text-neutral-mediumGray">No upcoming deadlines</p>
        ) : (
          <div className="space-y-3">
            {upcomingDeadlines.map((university) => {
              const daysUntil = Math.ceil((new Date(university.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
              return (
                <div key={university.id} className="flex items-center justify-between p-3 bg-neutral-lightGray/30 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-darkGray">{university.name}</p>
                    <p className="text-sm text-neutral-darkGray">{university.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-darkGray">
                      {new Date(university.deadline).toLocaleDateString()}
                    </p>
                    <p className={`text-xs ${daysUntil <= 7 ? 'text-accent-red' : 'text-neutral-mediumGray'}`}>
                      {daysUntil} days left
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Financial Summary */}
      <div className="bg-card rounded-xl shadow-card p-6 border border-neutral-lightGray">
        <h2 className="text-xl font-semibold text-neutral-darkGray mb-4">Financial Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-darkGray">${financialStats.totalFees.toFixed(2)}</p>
            <p className="text-sm text-neutral-darkGray">Total Application Fees</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-darkGray">{financialStats.avgScholarship.toFixed(1)}%</p>
            <p className="text-sm text-neutral-darkGray">Average Scholarship</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-darkGray">{financialStats.maxScholarship}%</p>
            <p className="text-sm text-neutral-darkGray">Highest Scholarship</p>
          </div>
        </div>
      </div>
    </div>
  )
} 