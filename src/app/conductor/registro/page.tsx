'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'

function RutaECLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#1A9E5C" />
      <path d="M6 22 L12 10 L18 18 L22 13 L28 22 Z" fill="#4CAF82" stroke="white" strokeWidth="0.5" />
      <path d="M4 24 Q16 12 28 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

const conductorSchema = z
  .object({
    nombre: z.string().trim().min(1, { error: 'Ingresa tu nombre' }),
    apellido: z.string().trim().min(1, { error: 'Ingresa tu apellido' }),
    email: z.email({ error: 'Ingresa un correo válido' }).trim(),
    telefono: z.string().trim().min(7, { error: 'Ingresa un teléfono válido' }),
    cedula: z.string().trim().min(5, { error: 'Ingresa tu cédula' }),
    licencia: z.string().trim().min(3, { error: 'Ingresa el número de licencia' }),
    marca: z.string().trim().min(1, { error: 'Ingresa la marca del vehículo' }),
    modelo: z.string().trim().min(1, { error: 'Ingresa el modelo del vehículo' }),
    placa: z.string().trim().min(3, { error: 'Ingresa la placa' }),
    password: z.string().min(8, { error: 'Mínimo 8 caracteres' }),
    confirmPassword: z.string(),
    acepta: z.literal(true, { error: 'Debes aceptar los términos' }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type ConductorForm = z.infer<typeof conductorSchema>

const inputClass =
  'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition'
const errorClass = 'text-xs text-red-600 mt-1'
const sectionLabel = 'text-xs font-bold uppercase tracking-widest text-gray-500 mt-2'

export default function ConductorRegistroPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConductorForm>({
    resolver: zodResolver(conductorSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      cedula: '',
      licencia: '',
      marca: '',
      modelo: '',
      placa: '',
      password: '',
      confirmPassword: '',
      acepta: false as unknown as true,
    },
  })

  const onSubmit = async (values: ConductorForm) => {
    setServerError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          role: 'driver',
          first_name: values.nombre,
          last_name: values.apellido,
          phone: values.telefono,
          cedula: values.cedula,
          license_number: values.licencia,
          vehicle_make: values.marca,
          vehicle_model: values.modelo,
          license_plate: values.placa,
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
      <div className="px-4 pt-4">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Volver
        </Link>
      </div>

      <div className="flex flex-col items-center px-6 pt-6 pb-10 flex-1">
        <div className="flex flex-col items-center gap-2 mb-7">
          <RutaECLogo />
          <span className="text-2xl font-bold text-gray-900">RutaEC</span>
          <p className="text-gray-500 text-sm">Regístrate como conductor</p>
        </div>

        <div className="w-full mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          Tu cuenta quedará en revisión hasta que un administrador verifique tus documentos.
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <p className={sectionLabel}>Información personal</p>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre</label>
              <input id="nombre" type="text" autoComplete="given-name" placeholder="Juan" className={inputClass} {...register('nombre')} />
              {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="apellido" className="text-sm font-medium text-gray-700">Apellido</label>
              <input id="apellido" type="text" autoComplete="family-name" placeholder="Pérez" className={inputClass} {...register('apellido')} />
              {errors.apellido && <p className={errorClass}>{errors.apellido.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
            <input id="email" type="email" autoComplete="email" placeholder="tu@correo.com" className={inputClass} {...register('email')} />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefono" className="text-sm font-medium text-gray-700">Teléfono</label>
            <input id="telefono" type="tel" autoComplete="tel" placeholder="+593 99 000 0000" className={inputClass} {...register('telefono')} />
            {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="cedula" className="text-sm font-medium text-gray-700">Cédula</label>
            <input id="cedula" type="text" placeholder="0123456789" className={inputClass} {...register('cedula')} />
            {errors.cedula && <p className={errorClass}>{errors.cedula.message}</p>}
          </div>

          <p className={sectionLabel}>Vehículo y licencia</p>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="licencia" className="text-sm font-medium text-gray-700">Número de licencia</label>
            <input id="licencia" type="text" placeholder="ABC-123456" className={inputClass} {...register('licencia')} />
            {errors.licencia && <p className={errorClass}>{errors.licencia.message}</p>}
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="marca" className="text-sm font-medium text-gray-700">Marca</label>
              <input id="marca" type="text" placeholder="Toyota" className={inputClass} {...register('marca')} />
              {errors.marca && <p className={errorClass}>{errors.marca.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="modelo" className="text-sm font-medium text-gray-700">Modelo</label>
              <input id="modelo" type="text" placeholder="Corolla" className={inputClass} {...register('modelo')} />
              {errors.modelo && <p className={errorClass}>{errors.modelo.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="placa" className="text-sm font-medium text-gray-700">Placa</label>
            <input id="placa" type="text" placeholder="PBA-1234" className={inputClass + ' uppercase'} {...register('placa')} />
            {errors.placa && <p className={errorClass}>{errors.placa.message}</p>}
          </div>

          <p className={sectionLabel}>Seguridad</p>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Contraseña</label>
            <input id="password" type="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" className={inputClass} {...register('password')} />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input id="confirm-password" type="password" autoComplete="new-password" placeholder="Repite tu contraseña" className={inputClass} {...register('confirmPassword')} />
            {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" className="mt-0.5 accent-green-600" {...register('acepta')} />
            <span className="text-xs text-gray-500 leading-relaxed">
              Acepto los{' '}
              <Link href="/terminos" className="font-medium underline" style={{ color: '#1A9E5C' }}>Términos de Servicio</Link>{' '}
              y la{' '}
              <Link href="/privacidad" className="font-medium underline" style={{ color: '#1A9E5C' }}>Política de Privacidad</Link>
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
            className="w-full rounded-full py-3.5 font-bold text-white text-sm tracking-widest uppercase mt-2 disabled:opacity-60"
            style={{ backgroundColor: '#1A9E5C' }}
          >
            {isSubmitting ? 'Creando...' : 'Crear cuenta de conductor'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/conductor/login" className="font-semibold" style={{ color: '#1A9E5C' }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
