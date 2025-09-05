import { createClient } from '@supabase/supabase-js'

// Supabase configuration for project "Masarly"
const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      quiz_responses: {
        Row: {
          id: string
          created_at: string
          user_id?: string
          current_role?: string
          goal?: string
          riasec_vector: Record<string, number>
          work_style: Record<string, string>
          values: string[]
          criteria: Record<string, string>
          domain: string[]
          experience_band?: string
          results?: Record<string, any>
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string
          current_role?: string
          goal?: string
          riasec_vector: Record<string, number>
          work_style: Record<string, string>
          values: string[]
          criteria: Record<string, string>
          domain: string[]
          experience_band?: string
          results?: Record<string, any>
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          current_role?: string
          goal?: string
          riasec_vector?: Record<string, number>
          work_style?: Record<string, string>
          values?: string[]
          criteria?: Record<string, string>
          domain?: string[]
          experience_band?: string
          results?: Record<string, any>
        }
      }
    }
  }
}