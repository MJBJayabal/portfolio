import { useEffect, useRef } from 'react'

// Software-themed background: faint falling streams of code glyphs / binary,
// drawn on a canvas in the brand palette. Sits behind the gradient blobs.
const CHARS = '01<>{}[]();=+-*/&|!?λ→$#%_'.split('')

// Stable pseudo-random glyph per (column, row) so streams read as falling code
// rather than flickering noise.
const glyph = (i, row) => CHARS[Math.abs(i * 92821 + row * 53987) % CHARS.length]

export default function CodeRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const FONT = 16   // px cell size
    const TAIL = 9    // trailing glyphs per stream
    let cols = 0, drops = [], width = 0, height = 0

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT}px "SF Mono","Fira Code",Consolas,monospace`
      ctx.textBaseline = 'top'
      cols = Math.ceil(width / FONT)
      drops = Array.from({ length: cols }, () => ({
        y: (Math.random() * -height) / FONT, // start above the top, measured in rows
        speed: 0.12 + Math.random() * 0.22,  // rows advanced per drawn frame (slow drift)
      }))
    }

    // Single faint static frame for reduced-motion users.
    function drawStatic() {
      ctx.clearRect(0, 0, width, height)
      const rows = Math.ceil(height / FONT)
      ctx.fillStyle = 'rgba(99,140,246,0.06)'
      for (let i = 0; i < cols; i++) {
        for (let r = 0; r < rows; r += 3) ctx.fillText(glyph(i, r), i * FONT, r * FONT)
      }
    }

    let raf, last = 0
    function loop(ts) {
      raf = requestAnimationFrame(loop)
      if (ts - last < 33) return // throttle to ~30fps
      last = ts

      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < cols; i++) {
        const d = drops[i]
        const headRow = Math.floor(d.y)
        for (let t = 0; t < TAIL; t++) {
          const row = headRow - t
          if (row < 0) continue
          const yy = row * FONT
          if (yy > height) continue
          const a = 1 - t / TAIL
          ctx.fillStyle = t === 0
            ? `rgba(180,240,255,${0.6 * a + 0.35})` // bright cyan-white head
            : `rgba(120,155,250,${0.6 * a})`         // indigo fading tail
          ctx.fillText(glyph(i, row), i * FONT, yy)
        }
        d.y += d.speed
        if ((d.y - TAIL) * FONT > height) {
          d.y = Math.random() * -20
          d.speed = 0.12 + Math.random() * 0.22
        }
      }
    }

    let resizeTimer
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setup()
        if (reduce) drawStatic()
      }, 200)
    }

    setup()
    if (reduce) drawStatic()
    else raf = requestAnimationFrame(loop)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas className="code-rain" ref={ref} aria-hidden="true" />
}
