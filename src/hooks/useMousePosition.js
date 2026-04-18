import { useState, useEffect } from 'react'

/**
 * Tracks pointer position in viewport coordinates (clientX / clientY).
 */
export function useMousePosition() {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (event) => {
      setCoords({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return coords
}
