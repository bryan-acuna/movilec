export interface Trip {
  id: number
  from: string
  to: string
  vehicle: string
  seats: number
  price: number
  rating: number
  duration: string
  driverAvatarUrl?: string
  carImageUrl?: string
}

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className="min-w-[160px] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm flex-shrink-0">
      {/* Car image */}
      <div className="relative h-24 bg-gray-100">
        {trip.carImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trip.carImageUrl}
            alt={trip.vehicle}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <svg width="48" height="32" viewBox="0 0 48 32" fill="none" className="opacity-40">
              <rect x="4" y="10" width="40" height="16" rx="4" fill="#555" />
              <rect x="10" y="4" width="28" height="12" rx="3" fill="#555" />
              <circle cx="12" cy="26" r="5" fill="#333" />
              <circle cx="36" cy="26" r="5" fill="#333" />
              <circle cx="12" cy="26" r="2.5" fill="#888" />
              <circle cx="36" cy="26" r="2.5" fill="#888" />
            </svg>
          </div>
        )}

        {/* Heart icon */}
        <button
          aria-label="Guardar viaje"
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>

        {/* Driver avatar */}
        <div className="absolute bottom-0 left-2 translate-y-1/2">
          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
            {trip.driverAvatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={trip.driverAvatarUrl} alt="Driver" className="w-full h-full object-cover" />
            ) : (
              <svg viewBox="0 0 24 24" fill="#9CA3AF" className="w-full h-full">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="pt-5 px-3 pb-3">
        {/* Rating + duration */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span className="flex items-center gap-0.5 text-yellow-500 font-semibold">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
            </svg>
            {trip.rating}
          </span>
          <span>{trip.duration}</span>
        </div>

        {/* Route */}
        <p className="font-bold text-gray-900 text-sm leading-tight">
          {trip.from} → {trip.to}
        </p>

        {/* Vehicle */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          {trip.vehicle}
        </div>

        {/* Seats + Price */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            {trip.seats} seats
          </div>
          <span className="font-bold text-gray-900 text-sm">${trip.price}</span>
        </div>
      </div>
    </div>
  )
}
