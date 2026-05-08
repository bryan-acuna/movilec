import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/auth/SignOutButton'

export default async function AuthCTA() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const firstName =
      (user.user_metadata?.first_name as string | undefined) ??
      user.email?.split('@')[0] ??
      'viajero'

    return (
      <section className="px-5 pt-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-900">
            Hola, {firstName}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Listo para tu próximo viaje.</p>
          <div className="mt-3 flex gap-2.5">
            <Link
              href="/pasajero"
              className="flex-1 flex items-center justify-center rounded-full py-2.5 text-xs font-bold tracking-widest uppercase text-white"
              style={{ backgroundColor: '#F97316' }}
            >
              Buscar Viajes
            </Link>
            <SignOutButton className="flex-1 flex items-center justify-center rounded-full py-2.5 text-xs font-bold tracking-widest uppercase border-2 bg-white text-gray-700 border-gray-300" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-5 pt-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">Reserva tu próximo viaje</p>
        <p className="text-xs text-gray-500 mt-0.5">Inicia sesión o crea tu cuenta para continuar.</p>
        <div className="mt-3 flex gap-2.5">
          <Link
            href="/login"
            className="flex-1 flex items-center justify-center rounded-full py-2.5 text-xs font-bold tracking-widest uppercase border-2 bg-white"
            style={{ color: '#F97316', borderColor: '#F97316' }}
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/registro"
            className="flex-1 flex items-center justify-center rounded-full py-2.5 text-xs font-bold tracking-widest uppercase text-white"
            style={{ backgroundColor: '#F97316' }}
          >
            Registrarse
          </Link>
        </div>
      </div>
    </section>
  )
}
