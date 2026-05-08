import Link from 'next/link'
import BottomNav from '@/components/layout/BottomNav'
import { requireDriver } from '@/lib/auth/guards'
import PublishTripForm from './PublishTripForm'

export default async function PublishTripPage() {
  const { user, supabase } = await requireDriver('/conductor/viajes/nuevo')

  const { data: driver } = await supabase
    .from('drivers')
    .select('status')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">
        <Link href="/perfil" className="text-gray-500" aria-label="Volver">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Publicar viaje</h1>
      </header>

      <main className="flex-1 pb-24 px-5 pt-5">
        {driver?.status === 'pending' && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            Tu cuenta de conductor está en revisión. Puedes preparar tus viajes,
            pero solo serán visibles para los pasajeros una vez aprobada.
          </div>
        )}
        {driver?.status === 'rejected' && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800">
            Tu cuenta de conductor fue rechazada. Contáctanos antes de publicar viajes.
          </div>
        )}

        <PublishTripForm driverId={user.id} />
      </main>

      <BottomNav />
    </div>
  )
}
