import { useState } from 'react'

export default function Scene({ image, eager = false }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-b from-[#050913] via-[#0B1733] to-[#10264f]"
    >
      {image && (
        <img
          src={image}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
    </div>
  )
}