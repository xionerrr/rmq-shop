import { Outlet } from 'react-router-dom'

import { AuthLayout } from 'layouts'

export function AuthWrapper() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
