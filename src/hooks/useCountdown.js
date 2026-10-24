import { useSyncExternalStore } from 'react'

let now = Date.now()
let timer = null
const listeners = new Set()

const subscribe = (cb) => {
  listeners.add(cb)
  if (!timer) {
    now = Date.now()
    timer = setInterval(() => {
      now = Date.now()
      listeners.forEach((l) => l())
    }, 1000)
  }
  return () => {
    listeners.delete(cb)
    if (listeners.size === 0) {
      clearInterval(timer)
      timer = null
    }
  }
}

const getSnapshot = () => now

export default function useCountdown(getTarget) {
  const t = useSyncExternalStore(subscribe, getSnapshot)
  const total = Math.max(0, Math.floor((getTarget() - t) / 1000))
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  }
}