import Link from 'next/link'

function RutaECLogo() {
  return (
    <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#1A9E5C" />
      <path d="M6 22 L12 10 L18 18 L22 13 L28 22 Z" fill="#4CAF82" stroke="white" strokeWidth="0.5" />
      <path d="M4 24 Q16 12 28 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-col items-center px-6 pt-12 pb-8">
        <RutaECLogo />
        <span className="mt-3 text-3xl font-bold text-gray-900">RutaEC</span>
        <p className="mt-1 text-sm text-gray-500">Viaja por Ecuador. Comparte tu camino.</p>
      </div>

      <main className="flex-1 flex flex-col items-center px-6 pb-10">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1.5">¿Cómo quieres viajar?</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Elige tu rol para continuar</p>

        <div className="w-full flex flex-col gap-4 max-w-md">
          {/* Pasajero */}
          <Link
            href="/pasajero"
            className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-6 py-8 transition hover:border-orange-400 hover:shadow-md"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full mb-4"
              style={{ backgroundColor: '#FFF4EC' }}
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#F97316" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Soy Pasajero</span>
            <span className="mt-1 text-xs text-gray-500 text-center">Busca viajes y reserva tu asiento</span>
          </Link>

          {/* Conductor */}
          <Link
            href="/conductor/registro"
            className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-6 py-8 transition hover:border-green-500 hover:shadow-md"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full mb-4"
              style={{ backgroundColor: '#E8F5EE' }}
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#1A9E5C" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">Soy Conductor</span>
            <span className="mt-1 text-xs text-gray-500 text-center">Publica tus viajes y gana compartiendo</span>
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="font-semibold" style={{ color: '#F97316' }}>
            Regístrate gratis
          </Link>
        </p>
      </main>
    </div>
  )
}
