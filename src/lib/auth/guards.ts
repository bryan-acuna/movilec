import { redirect } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

export type Role = 'passenger' | 'driver'

export type Profile = {
  role: Role
  first_name: string
  last_name: string
  phone: string | null
}

function loginRedirect(redirectTo: string): never {
  redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`)
}

export async function requireUser(redirectTo: string): Promise<{
  user: User
  supabase: SupabaseServerClient
}> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) loginRedirect(redirectTo)
  return { user, supabase }
}

async function requireRole(redirectTo: string, expected: Role) {
  const { user, supabase } = await requireUser(redirectTo)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, first_name, last_name, phone')
    .eq('id', user.id)
    .single<Profile>()

  if (!profile || profile.role !== expected) {
    redirect('/perfil')
  }

  return { user, supabase, profile }
}

export async function requireDriver(redirectTo: string) {
  return requireRole(redirectTo, 'driver')
}

export async function requirePassenger(redirectTo: string) {
  return requireRole(redirectTo, 'passenger')
}
