import { Link } from 'react-router-dom'
import Countdown from './Countdown'
import { weekendEnd, SALE_NAME } from '../lib/sale'
import { maxSale } from '../data/products'

export default function SaleBar() {
  return (
    <Link
      to="/deals"
      className="fixed inset-x-0 top-0 z-[60] flex h-11 items-center justify-center gap-3 border-b border-white/10 bg-[#0A0D14] px-3 font-mono text-[11px] uppercase tracking-widest text-paper"
    >
      <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-accent" />
      <span className="hidden sm:inline">
        {SALE_NAME} · up to {maxSale}% off · ends in
      </span>
      <span className="sm:hidden">Sale ends in</span>
      <Countdown target={weekendEnd} className="text-accent" />
    </Link>
  )
}