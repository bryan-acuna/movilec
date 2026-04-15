import Header from '@/components/layout/Header'
import BottomNav from '@/components/layout/BottomNav'
import Hero from '@/components/home/Hero'
import PopularTrips from '@/components/home/PopularTrips'
import SecurityOptions from '@/components/home/SecurityOptions'
import { Trip } from '@/components/home/TripCard'

const MOCK_TRIPS: Trip[] = [
  {
    id: 1,
    from: 'Quito',
    to: 'Ambato',
    vehicle: 'Ford Explorer',
    seats: 3,
    price: 7,
    rating: 4.3,
    duration: '15m',
  },
  {
    id: 2,
    from: 'Quito',
    to: 'Ambato',
    vehicle: 'Ruibamba',
    seats: 3,
    price: 7,
    rating: 4.5,
    duration: '18m',
  },
  {
    id: 3,
    from: 'Ambato',
    to: 'Riobamba',
    vehicle: 'Toyota RAV4',
    seats: 1,
    price: 5,
    rating: 4.8,
    duration: '22m',
  },
  {
    id: 4,
    from: 'Guayaquil',
    to: 'Cuenca',
    vehicle: 'Chevrolet Sail',
    seats: 2,
    price: 12,
    rating: 4.1,
    duration: '45m',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 pb-20 overflow-y-auto">
        <Hero />
        <PopularTrips trips={MOCK_TRIPS} />
        <SecurityOptions />
      </main>
      <BottomNav />
    </div>
  )
}
