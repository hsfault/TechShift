import { useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export default function useSceneSection({ ref, id, store, poseFn, onVisible }) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => store.apply(id, poseFn(v)))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) store.apply(id, poseFn(scrollYProgress.get()))
        if (onVisible) onVisible(id, entry.isIntersecting)
      },
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, id, store, poseFn, onVisible, scrollYProgress])

  return scrollYProgress
}