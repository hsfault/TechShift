import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/cart-context'

const links = [
  { to: '/shop', label: 'Shop' },
  { to: '/deals', label: 'Deals' },
  { to: '/contact', label: 'Contact' },
]

export default function GlassNav() {
  const [open, setOpen] = useState(false)
  const { count, openCart } = useCart()
  const close = () => setOpen(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      if (window.__lenis) window.__lenis.stop()
    } else {
      document.body.style.overflow = ''
      if (window.__lenis) window.__lenis.start()
    }
  }, [open])

  return (
    <>
      <header className="fixed left-0 right-0 top-[3.25rem] z-50 flex justify-center px-4">
        <nav className="glass flex w-full max-w-3xl items-center justify-between rounded-full py-2 pl-5 pr-2">
          <Link
            to="/"
            onClick={close}
            className="font-display wide flex min-h-[44px] items-center text-sm text-paper"
          >
            THE TECH<span className="text-accent">SHIFT</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center rounded-full px-4 font-mono text-xs uppercase tracking-widest transition-colors ${
                      isActive ? 'bg-white/10 text-paper' : 'text-mute hover:text-paper'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open bag, ${count} items`}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-white/10 text-paper"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 8h12l-1 12H7L6 8z" />
                <path d="M9 8V6a3 3 0 016 0v2" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 font-mono text-[10px] text-ink">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-5 bg-paper transition-all duration-300 ${
                    open ? 'top-[5px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-5 bg-paper transition-all duration-300 ${
                    open ? 'top-[5px] -rotate-45' : 'top-[10px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#05060A] px-8 pt-24 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-1">
              {[{ to: '/', label: 'Home' }, ...links].map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                >
                  <Link
                    to={l.to}
                    onClick={close}
                    className="font-display wide flex min-h-[56px] items-center text-4xl text-paper"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="mt-10 font-mono text-xs uppercase tracking-widest text-mute">
              HP · Lenovo · Dell · ASUS · Acer · MSI
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}