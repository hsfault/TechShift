import { useState } from 'react'

function Placeholder({ product }) {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" role="img" aria-label={product.name}>
      <rect x="52" y="22" width="136" height="88" rx="8" fill="#0B1224" stroke="#8FB4FF" strokeOpacity="0.5" />
      <rect x="60" y="30" width="120" height="72" rx="3" fill="#4D7CFF" fillOpacity="0.14" />
      <path d="M30 118h180l-10 16H40z" fill="#14171e" stroke="#8FB4FF" strokeOpacity="0.35" />
      <text x="120" y="68" textAnchor="middle" fill="#F2F5FA" fontSize="14" fontWeight="800" fontFamily="Archivo, sans-serif">
        {product.brand.toUpperCase()}
      </text>
      <text x="120" y="86" textAnchor="middle" fill="#9AA3B5" fontSize="8" fontFamily="JetBrains Mono, monospace">
        {product.series.toUpperCase()}
      </text>
    </svg>
  )
}

// stage 0: transparent .webp  ->  stage 1: original .jpg  ->  stage 2: drawn placeholder
export default function ProductImage({ product, className = '', eager = false }) {
  const [stage, setStage] = useState(0)
  const src = stage === 0 ? product.image.replace(/\.jpg$/i, '.webp') : product.image

  return (
    <div className={`relative aspect-[4/3] ${stage === 1 ? 'isolate bg-[#05060A]' : ''} ${className}`}>
      {stage === 2 ? (
        <Placeholder product={product} />
      ) : (
        <img
          key={stage}
          src={src}
          alt={product.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setStage((s) => s + 1)}
          className={`h-full w-full object-contain ${stage === 1 ? 'mix-blend-lighten' : ''}`}
        />
      )}
    </div>
  )
}