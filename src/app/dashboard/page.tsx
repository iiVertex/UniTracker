'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { supabase, University } from '@/lib/supabase'
import { 
  Plus, 
  Edit, 
  Trash2, 
  GraduationCap, 
  Calendar, 
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Minus
} from 'lucide-react'

export default function Dashboard() {
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this university?')) return

    try {
      const { error } = await supabase
        .from('universities')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting university:', error)
      } else {
        setUniversities(universities.filter(uni => uni.id !== id))
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="h-5 w-5 text-black" />
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-black" />
      case 'Waitlisted':
        return <AlertCircle className="h-5 w-5 text-black" />
      case 'Waiting':
        return <Clock className="h-5 w-5 text-black" />
      default:
        return <Minus className="h-5 w-5 text-black" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-red/10 text-red border-red/20'
      case 'Rejected':
        return 'bg-red/10 text-red border-red/20'
      case 'Waitlisted':
        return 'bg-red/10 text-red border-red/20'
      case 'Waiting':
        return 'bg-red/10 text-red border-red/20'
      default:
        return 'bg-neutral-lightGray text-neutral-mediumGray border-neutral-mediumGray/20'
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-lightGray min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white mt-1">Track your university applications</p>
        </div>
        <Link href="/dashboard/add">
          <Button variant="primary" className="bg-red text-white">
            <Plus className="h-5 w-5 mr-2" />
            Add University
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-card border border-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Total</p>
              <p className="text-2xl font-bold text-black">{stats.total}</p>
            </div>
            <GraduationCap className="h-8 w-8 text-black" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-card border border-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Applying</p>
              <p className="text-2xl font-bold text-black">{stats.applying}</p>
            </div>
            <div className="h-8 w-8 bg-red/10 rounded-lg flex items-center justify-center">
              <Minus className="h-5 w-5 text-black" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card border border-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Waiting</p>
              <p className="text-2xl font-bold text-black">{stats.waiting}</p>
            </div>
            <Clock className="h-8 w-8 text-black" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card border border-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Accepted</p>
              <p className="text-2xl font-bold text-black">{stats.accepted}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-black" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card border border-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Rejected</p>
              <p className="text-2xl font-bold text-black">{stats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-black" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card border border-lightGray">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black">Waitlisted</p>
              <p className="text-2xl font-bold text-black">{stats.waitlisted}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-black" />
          </div>
        </div>
      </div>

      {/* Universities Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden border border-lightGray">
        <div className="px-6 py-4 border-b border-lightGray">
          <h2 className="text-xl font-semibold text-black">Your Universities</h2>
        </div>
        
        {universities.length === 0 ? (
          <div className="p-12 text-center">
            <GraduationCap className="h-16 w-16 text-black mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-2">No universities yet</h3>
            <p className="text-black mb-6">Start tracking your university applications by adding your first university.</p>
            <Link href="/dashboard/add">
              <Button variant="primary" className="bg-red text-white">
                <Plus className="h-5 w-5 mr-2" />
                Add Your First University
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-lightGray/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Scholarship
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lightGray">
                {universities.map((university) => (
                  <tr key={university.id} className="hover:bg-lightGray/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-black">
                          {university.name}
                        </div>
                        {university.notes && (
                          <div className="text-sm text-black truncate max-w-xs">
                            {university.notes}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {university.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {new Date(university.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {university.scholarship_percentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      ${university.application_fees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${getStatusColor(university.status)}
                      `}>
                        {getStatusIcon(university.status)}
                        <span className="ml-1">{university.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      <div className="flex items-center space-x-2">
                        <Link href={`/dashboard/edit/${university.id}`}>
                          <Button variant="secondary" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDelete(university.id)}
                          className="text-red hover:bg-red/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 