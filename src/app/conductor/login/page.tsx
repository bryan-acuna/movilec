import { Suspense } from 'react'
import LoginForm from '@/components/auth/LoginForm'

export default function ConductorLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm variant="driver" />
    </Suspense>
  )





}
