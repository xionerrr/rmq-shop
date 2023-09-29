import { Outlet } from 'react-router-dom'

import { DefaultLayout } from 'layouts'

export function MainWrapper() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}
