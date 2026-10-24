import { Fragment } from 'react'
import useCountdown from '../hooks/useCountdown'

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown({ target, variant = 'inline', compact = false, className = '' }) {
  const t = useCountdown(target)

  if (variant === 'inline') {
    return (
      <span className={`font-mono tabular-nums ${className}`}>
        {t.d > 0 && `${pad(t.d)}d `}
        {pad(t.h)}h {pad(t.m)}m {pad(t.s)}s
      </span>
    )
  }

  const digit = compact ? 'text-[9vw] md:text-[4vw]' : 'text-[10.5vw] md:text-[6vw]'
  const dots = compact ? 'pt-[2.2vw] md:pt-[1vw]' : 'pt-[3vw] md:pt-[1.8vw]'
  const units = [['Days', t.d], ['Hours', t.h], ['Min', t.m], ['Sec', t.s]]

  return (
    <div className={`flex items-start gap-2 md:gap-5 ${className}`} role="timer" aria-label="Time remaining">
      {units.map(([label, v], i) => (
        <Fragment key={label}>
          <div className="flex flex-col items-center">
            <span className={`font-display wide block leading-none tabular-nums text-paper ${digit}`}>
              {pad(v)}
            </span>
            <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-mute">{label}</span>
          </div>
          {i < 3 && (
            <span className={`flex flex-col gap-[1.4vw] md:gap-[0.7vw] ${dots}`}>
              <i className="block h-1.5 w-1.5 rounded-full bg-accent md:h-2 md:w-2" />
              <i className="block h-1.5 w-1.5 rounded-full bg-accent md:h-2 md:w-2" />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}