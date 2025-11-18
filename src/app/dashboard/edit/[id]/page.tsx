'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function EditUniversity() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    deadline: '',
    scholarship_percentage: '',
    application_fees: '',
    notes: '',
    status: 'Applying'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const universityId = params.id as string

  const statusOptions = [
    { value: 'Applying', label: 'Applying' },
    { value: 'Waiting', label: 'Waiting' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Waitlisted', label: 'Waitlisted' },
    { value: 'Rejected', label: 'Rejected' }
  ]

  useEffect(() => {
    const fetchUniversity = async () => {
      setLoading(true)
      try {
        const { data } = await supabase
          .from('universities')
          .select('*')
          .eq('id', universityId)
          .single()
        setFormData({
          name: data.name,
          country: data.country,
          deadline: data.deadline.split('T')[0], // Format date for input
          scholarship_percentage: data.scholarship_percentage.toString(),
          application_fees: data.application_fees.toString(),
          notes: data.notes || '',
          status: data.status
        })
      } catch {
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchUniversity()
  }, [universityId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('You must be logged in to update a university')
        return
      }

      const { error } = await supabase
        .from('universities')
        .update({
          ...formData,
          scholarship_percentage: parseFloat(formData.scholarship_percentage),
          application_fees: parseFloat(formData.application_fees),
          updated_at: new Date().toISOString()
        })
        .eq('id', universityId)
        .eq('user_id', user.id)

      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-blue mx-auto mb-4" />
          <p className="text-neutral-mediumGray">Loading university...</p>
        </div>
      </div>
    )
  }

  if (error && !loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="bg-card rounded-xl shadow-card p-8 text-center border border-neutral-lightGray">
          <p className="text-accent-red mb-4">{error}</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/dashboard">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-neutral-darkGray">Edit University</h1>
          <p className="text-neutral-darkGray mt-1">Update university information</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card rounded-xl shadow-card p-8 border border-neutral-lightGray">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="University Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Harvard University"
              required
            />

            <Input
              label="Country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              placeholder="e.g., United States"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Application Deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
              required
            />

            <Select
              label="Application Status"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              options={statusOptions}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Scholarship Percentage"
              color="white"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formData.scholarship_percentage}
              onChange={(e) => handleChange('scholarship_percentage', e.target.value)}
              placeholder="e.g., 25.5"
              required
            />

            <Input
              label="Application Fees ($)"
              type="number"
              min="0"
              step="0.01"
              value={formData.application_fees}
              onChange={(e) => handleChange('application_fees', e.target.value)}
              placeholder="e.g., 75.00"
              required
            />
          </div>

          <Textarea
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Add any additional notes about this university application..."
            rows={4}
          />

          {error && (
            <div className="text-accent-red text-sm bg-accent-red/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-neutral-lightGray">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push('/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 