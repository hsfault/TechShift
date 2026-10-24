import * as THREE from 'three'

const OPEN_ANGLE = 1.95
const KEYS = ['lid', 'glow', 'rotY', 'camDist', 'camY', 'lookY', 'x', 'y']
const SCALE = 1.25 // canvas is 1280x800, drawing units are 1024x640

function roundRect(g, x, y, w, h, r) {
  g.beginPath()
  g.moveTo(x + r, y)
  g.arcTo(x + w, y, x + w, y + h, r)
  g.arcTo(x + w, y + h, x, y + h, r)
  g.arcTo(x, y + h, x, y, r)
  g.arcTo(x, y, x + w, y, r)
  g.closePath()
}

function makeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024 * SCALE
  canvas.height = 640 * SCALE
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4

  const wall = new Image()
  let wallReady = false

  const draw = () => {
    const g = canvas.getContext('2d')
    g.setTransform(SCALE, 0, 0, SCALE, 0, 0)

    // wallpaper (falls back to a navy gradient until the image loads)
    const base = g.createLinearGradient(0, 0, 1024, 640)
    base.addColorStop(0, '#050913')
    base.addColorStop(1, '#10264f')
    g.fillStyle = base
    g.fillRect(0, 0, 1024, 640)

    if (wallReady) {
      const k = Math.max(1024 / wall.width, 640 / wall.height)
      const dw = wall.width * k
      const dh = wall.height * k
      g.drawImage(wall, (1024 - dw) / 2, (640 - dh) / 2, dw, dh)
    }

    const dim = g.createLinearGradient(0, 0, 0, 640)
    dim.addColorStop(0, 'rgba(5,9,19,0.45)')
    dim.addColorStop(1, 'rgba(5,9,19,0.72)')
    g.fillStyle = dim
    g.fillRect(0, 0, 1024, 640)

    // clock and date
    const now = new Date()
    const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    g.textAlign = 'center'
    g.fillStyle = '#F2F5FA'
    g.font = '800 92px Archivo, Arial, sans-serif'
    g.fillText(time, 512, 128)
    g.fillStyle = 'rgba(242,245,250,0.8)'
    g.font = '500 22px Inter, Arial, sans-serif'
    g.fillText(date, 512, 166)

    // sign-in panel
    roundRect(g, 352, 210, 320, 330, 28)
    g.fillStyle = 'rgba(8,13,26,0.55)'
    g.fill()
    g.strokeStyle = 'rgba(255,255,255,0.14)'
    g.lineWidth = 1.5
    g.stroke()

    // avatar
    const ag = g.createLinearGradient(452, 240, 572, 360)
    ag.addColorStop(0, '#8FB4FF')
    ag.addColorStop(1, '#4D7CFF')
    g.fillStyle = ag
    g.beginPath()
    g.arc(512, 296, 52, 0, Math.PI * 2)
    g.fill()
    g.fillStyle = 'rgba(8,13,26,0.85)'
    g.beginPath()
    g.arc(512, 282, 17, 0, Math.PI * 2)
    g.fill()
    g.beginPath()
    g.ellipse(512, 336, 30, 22, 0, Math.PI, 0)
    g.fill()

    g.fillStyle = '#F2F5FA'
    g.font = '700 26px Inter, Arial, sans-serif'
    g.fillText('Guest', 512, 392)
    g.fillStyle = 'rgba(242,245,250,0.6)'
    g.font = '500 14px Inter, Arial, sans-serif'
    g.fillText('Local account', 512, 414)

    // password field
    roundRect(g, 382, 436, 260, 46, 23)
    g.fillStyle = 'rgba(255,255,255,0.12)'
    g.fill()
    g.strokeStyle = 'rgba(255,255,255,0.22)'
    g.lineWidth = 1
    g.stroke()
    g.textAlign = 'left'
    g.fillStyle = 'rgba(242,245,250,0.55)'
    g.font = '500 16px Inter, Arial, sans-serif'
    g.fillText('Password', 402, 465)

    g.fillStyle = '#F2F5FA'
    g.beginPath()
    g.arc(618, 459, 17, 0, Math.PI * 2)
    g.fill()
    g.strokeStyle = '#080D1A'
    g.lineWidth = 2.4
    g.lineCap = 'round'
    g.lineJoin = 'round'
    g.beginPath()
    g.moveTo(611, 459)
    g.lineTo(625, 459)
    g.moveTo(619, 452)
    g.lineTo(626, 459)
    g.lineTo(619, 466)
    g.stroke()

    g.textAlign = 'center'
    g.fillStyle = 'rgba(242,245,250,0.7)'
    g.font = '500 14px Inter, Arial, sans-serif'
    g.fillText('Sign-in options', 512, 516)

    // bottom bar
    g.textAlign = 'left'
    g.fillStyle = '#F2F5FA'
    g.font = '800 15px Archivo, Arial, sans-serif'
    g.fillText('THE TECHSHIFT', 40, 604)
    g.fillStyle = 'rgba(242,245,250,0.6)'
    g.font = '500 12px "JetBrains Mono", monospace'
    g.fillText('SHIFT UP.', 40, 622)

    g.strokeStyle = '#F2F5FA'
    g.lineWidth = 1.6
    roundRect(g, 930, 598, 34, 16, 4)
    g.stroke()
    g.fillStyle = '#F2F5FA'
    roundRect(g, 933, 601, 24, 10, 2)
    g.fill()
    g.fillRect(966, 603, 3, 6)

    g.lineWidth = 2
    for (let i = 0; i < 3; i++) {
      g.beginPath()
      g.arc(898, 614, 8 + i * 6, -Math.PI * 0.78, -Math.PI * 0.22)
      g.stroke()
    }
    g.beginPath()
    g.arc(898, 613, 1.8, 0, Math.PI * 2)
    g.fill()

    tex.needsUpdate = true
  }

  wall.decoding = 'async'
  wall.onload = () => {
    wallReady = true
    draw()
  }
  wall.src = '/media/bg/hero.jpg'

  draw()
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw)
  setInterval(draw, 30000)
  return tex
}

// Shared assets and animation state. This file only loads in the browser.
export const rig = {
  tex: makeTexture(),
  bodyMat: new THREE.MeshStandardMaterial({
    color: '#15181f',
    metalness: 1,
    roughness: 0.34,
    envMapIntensity: 1.15,
  }),
  cur: { lid: 0, glow: 0, rotY: 0.65, camDist: 7.8, camY: 3.2, lookY: 0.1, x: 0, y: 0 },
}

// Called every frame. Plain function, so React lint rules do not inspect it.
export function updateRig(state, dt, target, parts) {
  const { group, lid, screenMat, light } = parts
  if (!group || !lid || !screenMat || !light) return

  const c = rig.cur
  const d = Math.min(dt, 0.05)

  if (target.snap) {
    KEYS.forEach((k) => { c[k] = target[k] })
    target.snap = false
  }
  KEYS.forEach((k) => { c[k] = THREE.MathUtils.damp(c[k], target[k], 5, d) })

  const t = state.clock.elapsedTime
  const aspect = state.size.width / state.size.height

  group.position.set(c.x, c.y, 0)
  group.rotation.y = c.rotY + Math.sin(t * 0.5) * 0.03
  group.scale.setScalar(Math.min(1, aspect * 0.95))
  lid.rotation.x = -c.lid * OPEN_ANGLE
  screenMat.color.setScalar(c.glow)
  light.intensity = c.glow * 10

  state.camera.position.set(0, c.camY, c.camDist)
  state.camera.lookAt(0, c.lookY, 0)
}