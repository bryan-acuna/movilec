import Link from 'next/link'
import BottomNav from '@/components/layout/BottomNav'
import SignOutButton from '@/components/auth/SignOutButton'
import { requirePassenger } from '@/lib/auth/guards'

export default async function PasajeroPerfilPage() {
  const { user, profile } = await requirePassenger('/pasajero/perfil')

  const firstName = profile.first_name?.trim() || ''
  const lastName = profile.last_name?.trim() || ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Sin nombre'
  const initials =
    (firstName[0] ?? user.email?.[0] ?? '?').toUpperCase() +
    (lastName[0] ?? '').toUpperCase()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-5 py-4">
        <h1 className="text-lg font-bold text-gray-900">Mi Perfil</h1>
      </header>

      <main className="flex-1 pb-24 px-5 pt-5 flex flex-col gap-4">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
            style={{ backgroundColor: '#F97316' }}
          >
            {initials}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-base font-bold text-gray-900 truncate">{fullName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            <span
              className="mt-1.5 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: '#FFF4EC', color: '#F97316' }}
            >
              Pasajero
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
          <Row label="Nombre" value={firstName || '—'} />
          <Row label="Apellido" value={lastName || '—'} />
          <Row label="Teléfono" value={profile.phone?.trim() || '—'} />
          <Row label="Correo" value={user.email ?? '—'} />
        </section>

        <section className="flex flex-col gap-3 mt-2">
          <Link
            href="/perfil/editar"
            className="w-full text-center rounded-full py-3 text-sm font-bold tracking-widest uppercase text-white"
            style={{ backgroundColor: '#F97316' }}
          >
            Editar Perfil
          </Link>
          <SignOutButton className="w-full text-center rounded-full py-3 text-sm font-bold tracking-widest uppercase border-2 border-gray-300 bg-white text-gray-700 disabled:opacity-60" />
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <span className="text-sm text-gray-900 truncate ml-4">{value}</span>
    </div>
  )
}
