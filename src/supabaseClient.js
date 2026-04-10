import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://supabase.com/dashboard/project/gfivxblhdkkdwnejavne'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmaXZ4YmxoZGtrZHduZWphdm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDQxMjgsImV4cCI6MjA5MTM4MDEyOH0.7pVyJmC2T8ZIFDANwjT5e4HFyCbd9DK4quSRazo-yMk'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

