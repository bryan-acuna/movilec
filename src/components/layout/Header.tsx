'use client'

import { useState } from 'react'
import Link from 'next/link'

function RutaECLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="6" fill="#1A9E5C" />
      <path d="M6 22 L12 10 L18 18 L22 13 L28 22 Z" fill="#4CAF82" stroke="white" strokeWidth="0.5" />
      <path d="M4 24 Q16 12 28 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-white relative z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <RutaECLogo />
          <span className="text-xl font-bold text-gray-900">RutaEC</span>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* User icon */}
          <Link href="/perfil" aria-label="Perfil" className="text-gray-700">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </Link>

          {/* Hamburger / Close toggle */}
          <button
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="text-gray-700"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Slide-down drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <RutaECLogo />
                <span className="text-lg font-bold text-gray-900">RutaEC</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                className="text-gray-500"
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-5 pt-6 gap-3 flex-1">
              <Link
                href="/registro"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-sm tracking-widest uppercase"
                style={{ backgroundColor: '#F97316' }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Registrarse
              </Link>

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center rounded-full py-3.5 font-bold text-sm tracking-widest uppercase border-2 bg-white"
                style={{ color: '#F97316', borderColor: '#F97316' }}
              >
                Iniciar Sesión
              </Link>

              <Link
                href="/buscar"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-sm tracking-widest uppercase"
                style={{ backgroundColor: '#F97316' }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Buscar Viajes
              </Link>

              <div className="border-t border-gray-100 mt-2 pt-4 flex flex-col gap-1">
                {[
                  { href: '/', label: 'Inicio' },
                  { href: '/mensajes', label: 'Mensajes' },
                  { href: '/perfil', label: 'Mi Perfil' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-2 py-2.5 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
