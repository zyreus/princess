import { useEffect } from 'react'
import { motion as Motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'
import { useCursorLetterLinkHover } from '../hooks/useCursorLetterLinkHover.js'

export function CustomCursor() {
  const { x, y } = useMousePosition()
  const { letterLinkHover } = useCursorLetterLinkHover()
  const reduceMotion = useReducedMotion()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = reduceMotion
    ? { stiffness: 10000, damping: 100, mass: 0.2 }
    : { stiffness: 280, damping: 28, mass: 0.4 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)
  const trail0x = useSpring(cursorX, reduceMotion ? springConfig : { stiffness: 230, damping: 28, mass: 0.45 })
  const trail0y = useSpring(cursorY, reduceMotion ? springConfig : { stiffness: 230, damping: 28, mass: 0.45 })
  const trail1x = useSpring(cursorX, reduceMotion ? springConfig : { stiffness: 190, damping: 28, mass: 0.48 })
  const trail1y = useSpring(cursorY, reduceMotion ? springConfig : { stiffness: 190, damping: 28, mass: 0.48 })
  const trail2x = useSpring(cursorX, reduceMotion ? springConfig : { stiffness: 160, damping: 28, mass: 0.5 })
  const trail2y = useSpring(cursorY, reduceMotion ? springConfig : { stiffness: 160, damping: 28, mass: 0.5 })
  const trail3x = useSpring(cursorX, reduceMotion ? springConfig : { stiffness: 130, damping: 28, mass: 0.52 })
  const trail3y = useSpring(cursorY, reduceMotion ? springConfig : { stiffness: 130, damping: 28, mass: 0.52 })
  const trail4x = useSpring(cursorX, reduceMotion ? springConfig : { stiffness: 105, damping: 28, mass: 0.56 })
  const trail4y = useSpring(cursorY, reduceMotion ? springConfig : { stiffness: 105, damping: 28, mass: 0.56 })
  const trailSprings = [
    { x: trail0x, y: trail0y },
    { x: trail1x, y: trail1y },
    { x: trail2x, y: trail2y },
    { x: trail3x, y: trail3y },
    { x: trail4x, y: trail4y },
  ]

  useEffect(() => {
    cursorX.set(x)
    cursorY.set(y)
  }, [x, y, cursorX, cursorY])

  return (
    <Motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:flex"
      style={{
        left: springX,
        top: springY,
        x: '-50%',
        y: '-50%',
      }}
      aria-hidden
    >
      {!letterLinkHover &&
        trailSprings.map((trail, index) => (
          <Motion.span
            key={index}
            className="pointer-events-none absolute rounded-full bg-violet-400"
            style={{
              left: trail.x,
              top: trail.y,
              x: '-50%',
              y: '-50%',
              width: `${10 - index}px`,
              height: `${10 - index}px`,
              opacity: 0.26 - index * 0.04,
            }}
          />
        ))}
      <Motion.div
        className="relative flex items-center justify-center"
        animate={{ scale: letterLinkHover ? 1.5 : 1 }}
        transition={
          reduceMotion
            ? { duration: 0.12 }
            : { type: 'spring', stiffness: 420, damping: 26, mass: 0.35 }
        }
      >
        {letterLinkHover ? (
          <span className="select-none text-2xl leading-none drop-shadow-[0_0_14px_rgba(192,132,252,0.95)]">
            ✨
          </span>
        ) : (
          <div className="custom-cursor-glow h-4 w-4 rounded-full bg-violet-400" />
        )}
      </Motion.div>
    </Motion.div>
  )
}
