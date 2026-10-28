import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restablece el desplazamiento al encabezado (inicio) cada vez que el usuario cambia de página.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
    } catch {
      window.scrollTo(0, 0)
    }

    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }
  }, [pathname])

  return null
}
