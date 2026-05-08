import Link from 'next/link'
import BottomNav from '@/components/layout/BottomNav'
import { requireUser } from '@/lib/auth/guards'

const dateFormatter = new Intl.DateTimeFormat('es-EC', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export default async function MisViajesPage() {
  const { user, supabase } = await requireUser('/mis-viajes')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isDriver = profile?.role === 'driver'

  const { data: trips } = isDriver
    ? await supabase
        .from('trips')
        .select('id, origin, destination, departure_at, seats')
        .eq('driver_id', user.id)
        .order('departure_at', { ascending: true })
    : { data: [] as Trip[] }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Mis viajes</h1>
        {isDriver && (
          <Link
            href="/conductor/viajes/nuevo"
            className="rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
            style={{ backgroundColor: '#1A9E5C' }}
          >
            + Nuevo
          </Link>
        )}
      </header>

      <main className="flex-1 pb-24 px-5 pt-5">
        {isDriver ? (
          trips && trips.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Aún no has publicado viajes"
              body="Publica tu primer viaje para que los pasajeros puedan reservarlo."
              ctaLabel="Publicar viaje"
              ctaHref="/conductor/viajes/nuevo"
              ctaColor="#1A9E5C"
            />
          )
        ) : (
          <EmptyState
            title="Aún no tienes viajes"
            body="Cuando reserves un viaje, aparecerá aquí."
            ctaLabel="Buscar viajes"
            ctaHref="/pasajero"
            ctaColor="#F97316"
          />
        )}
      </main>

      <BottomNav />
    </div>
  )
}

type Trip = {
  id: string
  origin: string
  destination: string
  departure_at: string
  seats: number
}

function TripCard({ trip }: { trip: Trip }) {
  const departure = new Date(trip.departure_at)
  const isPast = departure.getTime() < Date.now()

  return (
    <li className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-gray-900">
          {trip.origin} → {trip.destination}
        </p>
        {isPast && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Finalizado
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-500 capitalize">
        {dateFormatter.format(departure)}
      </p>
      <p className="mt-2 text-xs font-medium text-gray-700">
        {trip.seats} {trip.seats === 1 ? 'asiento' : 'asientos'} disponibles
      </p>
    </li>
  )
}

function EmptyState({
  title,
  body,
  ctaLabel,
  ctaHref,
  ctaColor,
}: {
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
  ctaColor: string
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 pt-16">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: `${ctaColor}1A` }}
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke={ctaColor} strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      </div>
      <p className="text-base font-bold text-gray-900">{title}</p>
      <p className="mt-1.5 max-w-xs text-sm text-gray-500">{body}</p>
      <Link
        href={ctaHref}
        className="mt-6 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest text-white"
        style={{ backgroundColor: ctaColor }}
      >
        {ctaLabel}
      </Link>
    </div>
  )
}
