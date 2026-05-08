import Link from 'next/link'
import SignOutButton from '@/components/auth/SignOutButton'
import { requireDriver } from '@/lib/auth/guards'

type DriverStatus = 'pending' | 'approved' | 'rejected'

const STATUS_META: Record<DriverStatus, { label: string; bg: string; text: string }> = {
  pending: { label: 'En revisión', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700' },
  approved: { label: 'Aprobado', bg: 'bg-green-50 border-green-200', text: 'text-green-700' },
  rejected: { label: 'Rechazado', bg: 'bg-red-50 border-red-200', text: 'text-red-700' },
}

export default async function ConductorPerfilPage() {
  const { user, supabase, profile } = await requireDriver('/conductor/perfil')

  const { data: driver } = await supabase
    .from('drivers')
    .select('cedula, license_number, vehicle_make, vehicle_model, license_plate, status')
    .eq('id', user.id)
    .single()

  const firstName = profile.first_name?.trim() || ''
  const lastName = profile.last_name?.trim() || ''
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Sin nombre'
  const initials =
    (firstName[0] ?? user.email?.[0] ?? '?').toUpperCase() +
    (lastName[0] ?? '').toUpperCase()

  const status = (driver?.status as DriverStatus | undefined) ?? null
  const statusMeta = status ? STATUS_META[status] : null

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-5 py-4">
        <h1 className="text-lg font-bold text-gray-900">Mi Perfil</h1>
      </header>

      <main className="flex-1 pb-10 px-5 pt-5 flex flex-col gap-4">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
            style={{ backgroundColor: '#1A9E5C' }}
          >
            {initials}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-base font-bold text-gray-900 truncate">{fullName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            <span
              className="mt-1.5 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: '#E8F5EE', color: '#1A9E5C' }}
            >
              Conductor
            </span>
          </div>
        </section>

        {statusMeta && (
          <section className={`rounded-2xl border ${statusMeta.bg} px-4 py-3`}>
            <p className={`text-xs font-bold uppercase tracking-widest ${statusMeta.text}`}>
              Estado: {statusMeta.label}
            </p>
            {status === 'pending' && (
              <p className="mt-1 text-xs text-amber-800">
                Un administrador revisará tus documentos antes de que puedas publicar viajes.
              </p>
            )}
            {status === 'rejected' && (
              <p className="mt-1 text-xs text-red-800">
                Tu solicitud fue rechazada. Revisa tus documentos o contáctanos para más información.
              </p>
            )}
          </section>
        )}

        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
          <Row label="Nombre" value={firstName || '—'} />
          <Row label="Apellido" value={lastName || '—'} />
          <Row label="Teléfono" value={profile.phone?.trim() || '—'} />
          <Row label="Correo" value={user.email ?? '—'} />
        </section>

        {driver && (
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="px-5 pt-4 pb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Datos de conductor
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              <Row label="Cédula" value={driver.cedula?.trim() || '—'} />
              <Row label="N° de licencia" value={driver.license_number?.trim() || '—'} />
              <Row
                label="Vehículo"
                value={
                  [driver.vehicle_make, driver.vehicle_model]
                    .map((v) => v?.trim())
                    .filter(Boolean)
                    .join(' ') || '—'
                }
              />
              <Row label="Placa" value={driver.license_plate?.trim().toUpperCase() || '—'} />
            </div>
          </section>
        )}

        <section className="flex flex-col gap-3 mt-2">
          <Link
            href="/conductor/viajes/nuevo"
            className="w-full text-center rounded-full py-3 text-sm font-bold tracking-widest uppercase text-white"
            style={{ backgroundColor: '#1A9E5C' }}
          >
            Publicar Viaje
          </Link>
          <Link
            href="/perfil/editar"
            className="w-full text-center rounded-full py-3 text-sm font-bold tracking-widest uppercase border-2 border-green-600 bg-white text-green-700"
          >
            Editar Perfil
          </Link>
          <SignOutButton className="w-full text-center rounded-full py-3 text-sm font-bold tracking-widest uppercase border-2 border-gray-300 bg-white text-gray-700 disabled:opacity-60" />
        </section>
      </main>
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
