import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth/guards'

export default async function PerfilPage() {
  const { user, supabase } = await requireUser('/perfil')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  redirect(profile?.role === 'driver' ? '/conductor/perfil' : '/pasajero/perfil')
}
