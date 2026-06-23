import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import CodeWindow from './CodeWindow.jsx'

const STATS = [
  { target: 4, suffix: '+', label: 'Years Experience' },
  { target: 7, suffix: '+', label: 'Projects Shipped' },
  { target: 2, suffix: '', label: 'Apps Live on Stores' },
  { target: 100, suffix: '%', label: 'Commitment' },
]

// Count-up number that starts when scrolled into view (easeOutCubic).
function Counter({ target, suffix }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const obs = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      obs.unobserve(el)
      const duration = 1400
      let start = null
      const step = (now) => {
        if (start === null) start = now
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(Math.round(eased * target))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => { obs.disconnect(); cancelAnimationFrame(raf) }
  }, [target])

  return <span className="num" ref={ref}>{value}{suffix}</span>
}

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal className="section-head">
        <span className="kicker">01 — About</span>
        <h2>Turning ideas into <span className="grad-text">shipped products</span></h2>
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            I'm a Software Engineer based in <strong>Bengaluru, India</strong>, focused on{' '}
            <strong>web &amp; mobile application development</strong>. Over the past 4 years at{' '}
            <strong>Kraftbyte</strong>, I've designed and shipped cross-platform apps end-to-end —
            from the first wireframe to the App Store.
          </p>
          <p>
            My toolkit centers on <strong>React, React Native (Expo) and Next.js</strong>, backed by{' '}
            <strong>Node.js, MongoDB and Supabase</strong>. I love building AI-powered experiences and
            I actively use <strong>AI-assisted development (Claude AI / Claude Code)</strong> to ship
            faster without compromising code quality.
          </p>
          <div className="about-tags">
            <span>📍 Bengaluru, India</span>
            <span>💼 Open to opportunities</span>
            <span>🚀 2 apps live on stores</span>
          </div>
        </Reveal>

        <Reveal>
          <CodeWindow />
        </Reveal>
      </div>

      <Reveal className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <Counter target={s.target} suffix={s.suffix} />
            <span className="label">{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
