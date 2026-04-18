const FLOAT_DECOR = [
  { char: '💜', top: '11%', left: '5%', delay: '0s', size: '1.35rem' },
  { char: '✨', top: '22%', left: '91%', delay: '0.4s', size: '1.1rem' },
  { char: '💫', top: '48%', left: '3%', delay: '0.9s', size: '1.2rem' },
  { char: '⭐', top: '62%', left: '94%', delay: '0.2s', size: '1rem' },
  { char: '🌙', top: '78%', left: '8%', delay: '1.1s', size: '1.15rem' },
  { char: '✦', top: '36%', left: '48%', delay: '0.6s', size: '0.95rem' },
  { char: '💜', top: '88%', left: '86%', delay: '1.4s', size: '1.2rem' },
]

/**
 * Full-viewport decorative layer: gradients, stars, soft blobs, tiny floats.
 * Lives behind page content; pointer-events none.
 */
export default function CuteBackground() {
  return (
    <div className="cute-bg-shell pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="cute-bg-gradient-base" />
      <div className="cute-bg-blob cute-bg-blob--1" />
      <div className="cute-bg-blob cute-bg-blob--2" />
      <div className="cute-bg-blob cute-bg-blob--3" />
      <div className="cute-bg-blob cute-bg-blob--4" />
      <div className="cute-bg-starfield" />
      <div className="cute-bg-shimmer" />
      {FLOAT_DECOR.map((item, index) => (
        <span
          key={index}
          className="cute-bg-float"
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            fontSize: item.size,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  )
}
