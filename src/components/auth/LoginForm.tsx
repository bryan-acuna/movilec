'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import GoogleButton from '@/components/auth/GoogleButton'

export type LoginVariant = 'passenger' | 'driver'

type Theme = {
  primary: string
  primaryRing: string
  primaryHoverBorder: string
  registroHref: string
  registroLabel: string
  subtitle: string
}

const THEMES: Record<LoginVariant, Theme> = {
  passenger: {
    primary: '#F97316',
    primaryRing: 'focus:border-orange-400 focus:ring-orange-100',
    primaryHoverBorder: 'border-orange-400',
    registroHref: '/registro',
    registroLabel: 'Regístrate gratis',
    subtitle: 'Ingresa a tu cuenta',
  },
  driver: {
    primary: '#1A9E5C',
    primaryRing: 'focus:border-green-500 focus:ring-green-100',
    primaryHoverBorder: 'border-green-500',
    registroHref: '/conductor/registro',
    registroLabel: 'Regístrate como conductor',
    subtitle: 'Ingresa como conductor',
  },
}

const loginSchema = z.object({
  email: z.email({ error: 'Ingresa un correo válido' }).trim(),
  password: z.string().min(1, { error: 'Ingresa tu contraseña' }),
})

type LoginFormValues = z.infer<typeof loginSchema>

const errorClass = 'text-xs text-red-600 mt-1'

function RutaECLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#1A9E5C" />
      <path d="M6 22 L12 10 L18 18 L22 13 L28 22 Z" fill="#4CAF82" stroke="white" strokeWidth="0.5" />
      <path d="M4 24 Q16 12 28 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function LoginForm({ variant }: { variant: LoginVariant }) {
  const theme = THEMES[variant]
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/perfil'
  const confirmed = searchParams.get('confirmed') === '1'

  const inputClass = `w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none ${theme.primaryRing} focus:ring-2 transition`

  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null)
    const supabase = createClient()
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setServerError(
        error.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos'
          : error.message
      )
      return
    }

    const userId = authData.user?.id
    if (!userId) {
      setServerError('No se pudo verificar la cuenta. Intenta de nuevo.')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()

    const expectedRole = variant === 'driver' ? 'driver' : 'passenger'

    if (profile?.role !== expectedRole) {
      await supabase.auth.signOut()
      setServerError(
        variant === 'driver'
          ? 'Esta cuenta no está registrada como conductor. Inicia sesión como pasajero.'
          : 'Esta cuenta es de conductor. Usa el inicio de sesión de conductor.'
      )
      return
    }

    if (variant === 'driver') {
      const { data: driver } = await supabase
        .from('drivers')
        .select('id')
        .eq('id', userId)
        .maybeSingle()

      if (!driver) {
        await supabase.auth.signOut()
        setServerError(
          'Tu cuenta de conductor no está completa. Contáctanos para finalizar el registro.'
        )
        return
      }
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-4 pt-4">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Volver
        </Link>
      </div>

      <div className="flex flex-col items-center px-6 pt-8 pb-10 flex-1">
        <div className="flex flex-col items-center gap-2 mb-8">
          <RutaECLogo />
          <span className="text-2xl font-bold text-gray-900">RutaEC</span>
          <p className="text-gray-500 text-sm">{theme.subtitle}</p>
        </div>

        {confirmed && (
          <div className="w-full mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            Correo confirmado. Ya puedes iniciar sesión.
          </div>
        )}

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              className={inputClass}
              {...register('email')}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={inputClass}
              {...register('password')}
            />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <Link
              href="/recuperar-contrasena"
              className="text-xs font-medium"
              style={{ color: theme.primary }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {serverError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full py-3.5 font-bold text-white text-sm tracking-widest uppercase mt-2 disabled:opacity-60"
            style={{ backgroundColor: theme.primary }}
          >
            {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {variant === 'passenger' && (
          <>
            <div className="flex items-center gap-3 w-full my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">o continúa con</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <GoogleButton />
          </>
        )}

        <p className="mt-8 text-sm text-gray-500">
          ¿No tienes cuenta?{' '}
          <Link
            href={theme.registroHref}
            className="font-semibold"
            style={{ color: theme.primary }}
          >
            {theme.registroLabel}
          </Link>
        </p>

        {variant === 'passenger' ? (
          <p className="mt-2 text-xs text-gray-400">
            ¿Eres conductor?{' '}
            <Link href="/conductor/login" className="font-medium underline">
              Inicia sesión aquí
            </Link>
          </p>
        ) : (
          <p className="mt-2 text-xs text-gray-400">
            ¿Eres pasajero?{' '}
            <Link href="/login" className="font-medium underline">
              Inicia sesión aquí
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
