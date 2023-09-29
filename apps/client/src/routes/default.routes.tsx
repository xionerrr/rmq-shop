import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthWrapper, MainWrapper } from './wrappers'

import { useScrollToTop } from 'hooks'
import { Paths } from 'models'
import { Auth, Home } from 'views'

export function AppRoutes() {
  useScrollToTop()

  return (
    <Routes>
      <Route path={Paths.start} element={<Navigate to={Paths.home} />} />
      <Route element={<MainWrapper />}>
        <Route path={Paths.home} element={<Home />} />
      </Route>
      <Route element={<AuthWrapper />}>
        <Route path={Paths.auth} element={<Auth />} />
      </Route>
    </Routes>
  )
}
