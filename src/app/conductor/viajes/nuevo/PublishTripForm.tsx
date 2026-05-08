'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import {
  ECUADOR_CITIES_BY_PROVINCE,
  isEcuadorCity,
} from '@/lib/locations/ecuador-cities'

const tripSchema = z
  .object({
    origin: z
      .string()
      .min(1, { error: 'Selecciona el origen' })
      .refine(isEcuadorCity, { error: 'Selecciona una ciudad válida' }),
    destination: z
      .string()
      .min(1, { error: 'Selecciona el destino' })
      .refine(isEcuadorCity, { error: 'Selecciona una ciudad válida' }),
    departure_at: z
      .string()
      .min(1, { error: 'Selecciona fecha y hora' })
      .refine(
        (v) => {
          const t = new Date(v).getTime()
          return !Number.isNaN(t) && t > Date.now()
        },
        { error: 'La fecha debe ser en el futuro' }
      ),
    seats: z
      .number({ error: 'Ingresa el número de asientos' })
      .int({ error: 'Asientos debe ser un número entero' })
      .min(1, { error: 'Mínimo 1 asiento' })
      .max(10, { error: 'Máximo 10 asientos' }),
    price_per_seat: z
      .number({ error: 'Ingresa el precio por asiento' })
      .min(0, { error: 'El precio no puede ser negativo' })
      .max(1000, { error: 'Máximo $1000 por asiento' }),
  })
  .refine((v) => v.origin !== v.destination, {
    message: 'El origen y el destino deben ser diferentes',
    path: ['destination'],
  })

type TripForm = z.infer<typeof tripSchema>

const inputClass =
  'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition'
const errorClass = 'text-xs text-red-600 mt-1'

function nowLocalForInput() {
  const d = new Date(Date.now() + 60 * 60 * 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function PublishTripForm({ driverId }: { driverId: string }) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TripForm>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      origin: '',
      destination: '',
      departure_at: nowLocalForInput(),
      seats: 1,
      price_per_seat: 0,
    },
  })

  const onSubmit = async (values: TripForm) => {
    setServerError(null)

    const supabase = createClient()
    const { error } = await supabase.from('trips').insert({
      driver_id: driverId,
      origin: values.origin,
      destination: values.destination,
      departure_at: new Date(values.departure_at).toISOString(),
      seats: values.seats,
      price_per_seat: values.price_per_seat,
    })

    if (error) {
      setServerError(error.message)
      return
    }

    router.push('/perfil?published=1')
    router.refresh()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="origin" className="text-sm font-medium text-gray-700">
          Desde
        </label>
        <input
          id="origin"
          type="text"
          list="ecuador-cities"
          autoComplete="off"
          placeholder="Empieza a escribir una ciudad"
          className={inputClass}
          {...register('origin')}
        />
        {errors.origin && <p className={errorClass}>{errors.origin.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="destination" className="text-sm font-medium text-gray-700">
          Hasta
        </label>
        <input
          id="destination"
          type="text"
          list="ecuador-cities"
          autoComplete="off"
          placeholder="Empieza a escribir una ciudad"
          className={inputClass}
          {...register('destination')}
        />
        {errors.destination && <p className={errorClass}>{errors.destination.message}</p>}
      </div>

      <datalist id="ecuador-cities">
        {ECUADOR_CITIES_BY_PROVINCE.flatMap((p) =>
          p.cities.map((c) => (
            <option key={`${p.province}:${c}`} value={c}>
              {p.province}
            </option>
          )),
        )}
      </datalist>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="departure_at" className="text-sm font-medium text-gray-700">
          Fecha y hora de salida
        </label>
        <input
          id="departure_at"
          type="datetime-local"
          className={inputClass}
          {...register('departure_at')}
        />
        {errors.departure_at && <p className={errorClass}>{errors.departure_at.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="seats" className="text-sm font-medium text-gray-700">
          Asientos disponibles
        </label>
        <input
          id="seats"
          type="number"
          min={1}
          max={10}
          className={inputClass}
          {...register('seats', { valueAsNumber: true })}
        />
        {errors.seats && <p className={errorClass}>{errors.seats.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="price_per_seat" className="text-sm font-medium text-gray-700">
          Precio por asiento (USD)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            $
          </span>
          <input
            id="price_per_seat"
            type="number"
            min={0}
            max={1000}
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            className={`${inputClass} pl-8`}
            {...register('price_per_seat', { valueAsNumber: true })}
          />
        </div>
        {errors.price_per_seat && (
          <p className={errorClass}>{errors.price_per_seat.message}</p>
        )}
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
        style={{ backgroundColor: '#1A9E5C' }}
      >
        {isSubmitting ? 'Publicando...' : 'Publicar viaje'}
      </button>
    </form>
  )
}
