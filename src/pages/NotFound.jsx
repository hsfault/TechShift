import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Error 404</p>
      <h1 className="font-display wide outline-text mt-4 text-[28vw] leading-none md:text-[16vw]">404</h1>
      <p className="mt-4 text-paper/80">This page wandered off.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/shop"
          className="flex min-h-[48px] items-center rounded-full bg-paper px-7 font-mono text-xs uppercase tracking-widest text-ink"
        >
          Shop laptops
        </Link>
        <Link
          to="/"
          className="glass flex min-h-[48px] items-center rounded-full px-7 font-mono text-xs uppercase tracking-widest text-paper"
        >
          Back home
        </Link>
      </div>
    </section>
  )
}