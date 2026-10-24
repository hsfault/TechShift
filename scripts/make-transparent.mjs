import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const DIR = 'public/media/products'
const smooth = (t) => t * t * (3 - 2 * t)
const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith('.jpg'))

for (const f of files) {
  const { data, info } = await sharp(path.join(DIR, f))
    .resize({ width: 1000 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const w = info.width
  const h = info.height

  for (let y = 0; y < h; y++) {
    const ty = y / h
    const fy = ty <= 0.84 ? 1 : ty >= 0.99 ? 0 : 1 - smooth((ty - 0.84) / 0.15)

    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const fx = Math.min(1, Math.min(x, w - 1 - x) / (w * 0.04))
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = Math.max(r, g, b)

      if (a < 3) {
        data[i] = 0
        data[i + 1] = 0
        data[i + 2] = 0
        data[i + 3] = 0
        continue
      }

      const k = 255 / a
      data[i] = Math.min(255, Math.round(r * k))
      data[i + 1] = Math.min(255, Math.round(g * k))
      data[i + 2] = Math.min(255, Math.round(b * k))
      data[i + 3] = Math.round(a * fy * fx)
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .webp({ quality: 80, alphaQuality: 90 })
    .toFile(path.join(DIR, f.replace(/\.jpg$/i, '.webp')))

  console.log('done', f)
}