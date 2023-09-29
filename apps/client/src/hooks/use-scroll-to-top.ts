import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    document.body.scrollTo({
      top: 0,
      left: 0,
    })
  }, [location.pathname])
}
