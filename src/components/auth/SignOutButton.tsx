'use client'

import { useTransition } from 'react'
import { signOut } from '@/app/auth/actions'

export default function SignOutButton({ className }: { className?: string }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => signOut())}
      className={
        className ??
        'rounded-full border border-gray-300 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 disabled:opacity-60'
      }
    >
      {pending ? 'Saliendo...' : 'Cerrar Sesión'}
    </button>
  )
}
