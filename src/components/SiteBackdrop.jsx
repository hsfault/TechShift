import { useState } from 'react'

// Tries each image in order; if none exist it shows plain navy.
const SOURCES = ['/media/bg/stars.jpg', '/media/bg/ridge.jpg']

export default function SiteBackdrop() {
  const [i, setI] = useState(0)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-ink">
      {i < SOURCES.length && (
        <img
          key={i}
          src={SOURCES[i]}
          alt=""
          decoding="async"
          onError={() => setI((n) => n + 1)}
          className="h-full w-full object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/80" />
    </div>
  )
}