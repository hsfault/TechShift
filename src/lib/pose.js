export const clamp01 = (v) => Math.min(1, Math.max(0, v))
export const range = (v, a, b) => clamp01((v - a) / (b - a))
export const mix = (a, b, t) => a + (b - a) * t
export const easeOut = (t) => 1 - Math.pow(1 - t, 3)
export const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const isWide = () => typeof window !== 'undefined' && window.innerWidth >= 768

export const basePose = {
  lid: 0,
  glow: 0,
  rotY: 0.65,
  camDist: 7.8,
  camY: 3.2,
  lookY: 0.1,
  x: 0,
  y: 0,
  finish: 0,
  snap: false,
  owner: '',
}

// Closed laptop wakes up: lid opens, screen lights, camera pushes in
export function heroPose(p) {
  const e = easeInOut(range(p, 0, 0.7))
  return {
    lid: easeInOut(range(p, 0.05, 0.55)),
    glow: range(p, 0.35, 0.65),
    rotY: mix(0.65, 0, easeInOut(range(p, 0, 0.65))),
    camDist: mix(7.8, 6.4, e),
    camY: mix(3.2, 1.4, e),
    lookY: mix(0.1, 0.95, e),
    x: 0,
    y: 0,
  }
}

// Open laptop turns slowly while the four specs take turns
export function specsPose(p) {
  const wide = isWide()
  return {
    lid: 1,
    glow: 1,
    rotY: 0.5 * Math.sin(p * Math.PI * 2),
    camDist: 6.4 - 0.6 * Math.sin(p * Math.PI),
    camY: 1.4,
    lookY: 0.95,
    x: 0,
    y: wide ? 0 : 0.6 * easeOut(range(p, 0, 0.1)),
  }
}

// Laptop slides to the side so the model names own the screen
export function lineupPose(p) {
  const wide = isWide()
  const t = easeInOut(range(p, 0, 0.1))
  return {
    lid: 1,
    glow: 1,
    rotY: mix(0, -0.4, t),
    camDist: mix(6.4, wide ? 6.6 : 7.4, t),
    camY: 1.4,
    lookY: 0.95,
    x: mix(0, wide ? 1.7 : 0, t),
    y: mix(wide ? 0 : 0.6, wide ? 0 : 1.2, t),
  }
}

// Bookend: the laptop closes slowly
export function finalPose(p) {
  const wide = isWide()
  const e = easeInOut(range(p, 0.1, 0.8))
  return {
    lid: 1 - easeInOut(range(p, 0.15, 0.7)),
    glow: 1 - range(p, 0.25, 0.65),
    rotY: mix(0, 0.65, e),
    camDist: mix(6.4, 7.8, e),
    camY: mix(1.4, 3.2, e),
    lookY: mix(0.95, 0.1, e),
    x: 0,
    y: wide ? 0 : 0.6,
  }
}

// Product page: wake up first, then the slow turn
export function productPose(p) {
  const intro = 0.35
  if (p < intro) return heroPose(p / intro)
  return specsPose(range(p, intro, 1))
}

// Collection page: static pose
export function collectionPose(wide) {
  return {
    lid: 1,
    glow: 1,
    rotY: wide ? -0.45 : -0.2,
    camDist: wide ? 6.6 : 7.6,
    camY: 1.4,
    lookY: 0.95,
    x: wide ? 1.9 : 0,
    y: wide ? 0 : 1.2,
  }
}