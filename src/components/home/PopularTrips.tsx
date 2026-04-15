import TripCard, { Trip } from './TripCard'

export default function PopularTrips({ trips }: { trips: Trip[] }) {
  return (
    <section className="px-4 pt-5 pb-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-gray-900 text-lg">Viajes Populares</h2>
        <div className="flex gap-1">
          <button
            aria-label="Anterior"
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            aria-label="Siguiente"
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal scroll list */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  )
}
