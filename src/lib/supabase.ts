import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface University {
  id: string
  name: string
  country: string
  deadline: string
  scholarship_percentage: number
  application_fees: number
  notes: string
  status: 'Applying' | 'Waiting' | 'Accepted' | 'Waitlisted' | 'Rejected'
  user_id: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
} 