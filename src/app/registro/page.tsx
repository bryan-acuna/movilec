'use client'

import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import GoogleButton from '@/components/auth/GoogleButton'

function RutaECLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#1A9E5C" />
      <path d="M6 22 L12 10 L18 18 L22 13 L28 22 Z" fill="#4CAF82" stroke="white" strokeWidth="0.5" />
      <path d="M4 24 Q16 12 28 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

const registroSchema = z
  .object({
    nombre: z.string().trim().min(1, { error: 'Ingresa tu nombre' }),
    apellido: z.string().trim().min(1, { error: 'Ingresa tu apellido' }),
    email: z.email({ error: 'Ingresa un correo válido' }).trim(),
    telefono: z.string().trim().min(7, { error: 'Ingresa un teléfono válido' }),
    password: z.string().min(8, { error: 'Mínimo 8 caracteres' }),
    confirmPassword: z.string(),
    acepta: z.literal(true, { error: 'Debes aceptar los términos' }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type RegistroForm = z.infer<typeof registroSchema>

const inputClass =
  'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition'
const errorClass = 'text-xs text-red-600 mt-1'

export default function RegistroPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroForm>({
    resolver: zodResolver(registroSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      password: '',
      confirmPassword: '',
      acepta: false as unknown as true,
    },
  })

  const onSubmit = async (values: RegistroForm) => {
    setServerError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.nombre,
          last_name: values.apellido,
          phone: values.telefono,
        },
      },
    })

    if (error) {
      setServerError(error.message)
      return
    }

    router.push('/perfil')
    router.refresh()
  }

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
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                className={inputClass}
                {...register('nombre')}
              />
              {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
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
                className={inputClass}
                {...register('apellido')}
              />
              {errors.apellido && <p className={errorClass}>{errors.apellido.message}</p>}
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
              className={inputClass}
              {...register('email')}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
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
              className={inputClass}
              {...register('telefono')}
            />
            {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
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
              className={inputClass}
              {...register('password')}
            />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
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
              className={inputClass}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className={errorClass}>{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-orange-500" {...register('acepta')} />
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
          {errors.acepta && <p className={errorClass}>{errors.acepta.message}</p>}

          {serverError && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full py-3.5 font-bold text-white text-sm tracking-widest uppercase mt-1 disabled:opacity-60"
            style={{ backgroundColor: '#F97316' }}
          >
            {isSubmitting ? 'Creando...' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">o regístrate con</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Suspense fallback={null}>
          <GoogleButton label="Registrarse con Google" />
        </Suspense>

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
