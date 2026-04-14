import Dashboard from '@/components/dahsboard/Dashboard'
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <Dashboard />
    </Suspense>
  )
}