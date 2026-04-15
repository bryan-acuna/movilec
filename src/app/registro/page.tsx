import Link from 'next/link'

function RutaECLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#1A9E5C" />
      <path d="M6 22 L12 10 L18 18 L22 13 L28 22 Z" fill="#4CAF82" stroke="white" strokeWidth="0.5" />
      <path d="M4 24 Q16 12 28 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function RegistroPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Back link */}
      <div className="px-4 pt-4">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Volver
        </Link>
      </div>

      <div className="flex flex-col items-center px-6 pt-6 pb-10 flex-1">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-7">
          <RutaECLogo />
          <span className="text-2xl font-bold text-gray-900">RutaEC</span>
          <p className="text-gray-500 text-sm">Crea tu cuenta gratis</p>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                autoComplete="given-name"
                placeholder="Juan"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                id="apellido"
                type="text"
                autoComplete="family-name"
                placeholder="Pérez"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefono" className="text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              id="telefono"
              type="tel"
              autoComplete="tel"
              placeholder="+593 99 000 0000"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 8 caracteres"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              placeholder="Repite tu contraseña"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-orange-500" />
            <span className="text-xs text-gray-500 leading-relaxed">
              Acepto los{' '}
              <Link href="/terminos" className="font-medium underline" style={{ color: '#F97316' }}>
                Términos de Servicio
              </Link>{' '}
              y la{' '}
              <Link href="/privacidad" className="font-medium underline" style={{ color: '#F97316' }}>
                Política de Privacidad
              </Link>
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-full py-3.5 font-bold text-white text-sm tracking-widest uppercase mt-1"
            style={{ backgroundColor: '#F97316' }}
          >
            Crear Cuenta
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">o regístrate con</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google button */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-700">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continuar con Google
        </button>

        {/* Login link */}
        <p className="mt-6 text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold" style={{ color: '#F97316' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
