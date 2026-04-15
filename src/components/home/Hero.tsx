export default function Hero() {
  return (
    <section className="relative">
      {/* Background — replace with a real Ecuador landscape photo */}
      <div
        className="relative h-72 w-full overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #87CEEB 0%, #5BA8C4 30%, #4A8B6F 60%, #2D5A3D 100%)',
        }}
      >
        {/* Mountain silhouette overlay */}
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 L0 80 L60 30 L110 70 L160 10 L220 60 L270 20 L320 55 L370 25 L400 50 L400 120 Z"
            fill="#2D5A3D"
            opacity="0.85"
          />
          <path
            d="M0 120 L0 95 L80 55 L130 85 L180 40 L240 75 L290 45 L340 70 L400 55 L400 120 Z"
            fill="#1E3D28"
            opacity="0.7"
          />
        </svg>

        {/* Headline */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 pt-4">
          <h1 className="text-white font-extrabold text-4xl leading-tight drop-shadow-lg">
            VIAJA POR<br />ECUADOR.
          </h1>
          <p className="text-white text-base mt-1 drop-shadow">
            Comparte tu camino
          </p>
        </div>
      </div>
    </section>
  )
}
