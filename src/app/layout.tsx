import './globals.css'
import { Providers } from '@/components/providers'

export const metadata = {
  title: 'RutaEC',
  description: 'Viaja por Ecuador. Comparte tu camino.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
