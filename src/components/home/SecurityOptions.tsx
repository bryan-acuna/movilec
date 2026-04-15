const SECURITY_FEATURES = [
  {
    label: 'Identidad Verificada',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#F97316" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
      </svg>
    ),
  },
  {
    label: 'Soporte 24/7',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#F97316" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
]

export default function SecurityOptions() {
  return (
    <section className="px-4 pt-4 pb-6">
      <h2 className="font-bold text-gray-900 text-lg mb-3">Opciones de Seguridad</h2>

      <div className="flex gap-3">
        {SECURITY_FEATURES.map((feature) => (
          <div
            key={feature.label}
            className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-3"
          >
            {feature.icon}
            <span className="text-xs font-medium text-gray-700 leading-tight">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
