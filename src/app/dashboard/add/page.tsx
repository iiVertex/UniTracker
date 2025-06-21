'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Save } from 'lucide-react'

export default function AddUniversity() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    deadline: '',
    scholarship_percentage: '',
    application_fees: '',
    notes: '',
    status: 'Applying'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const statusOptions = [
    { value: 'Applying', label: 'Applying' },
    { value: 'Waiting', label: 'Waiting' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Waitlisted', label: 'Waitlisted' },
    { value: 'Rejected', label: 'Rejected' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('You must be logged in to add a university')
        return
      }

      const { error: insertError } = await supabase
        .from('universities')
        .insert([
          {
            ...formData,
            user_id: user.id,
            scholarship_percentage: parseFloat(formData.scholarship_percentage),
            application_fees: parseFloat(formData.application_fees)
          }
        ])

      if (insertError) {
        setError(insertError.message)
      } else {
        router.push('/dashboard')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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
          <h1 className="text-3xl font-bold text-neutral-darkGray">Add University</h1>
          <p className="text-neutral-darkGray mt-1">Add a new university to your application tracker</p>
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
              className="border border-white text-white hover:bg-white hover:text-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 border border-white text-white hover:bg-white hover:text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Adding...' : 'Add University'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 