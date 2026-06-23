import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ROLES = [
  'Software Engineer',
  'React Native Developer',
  'Web Developer',
  'Mobile App Builder',
  'Next.js Engineer',
]

// Self-typing / deleting role text — ported from the old vanilla `type()` loop.
function useTypedRoles() {
  const [text, setText] = useState('')
  const state = useRef({ r: 0, c: 0, deleting: false })

  useEffect(() => {
    let timer
    const tick = () => {
      const s = state.current
      const word = ROLES[s.r]
      setText(word.slice(0, s.c))
      if (!s.deleting && s.c < word.length) {
        s.c++
        timer = setTimeout(tick, 90)
      } else if (!s.deleting && s.c === word.length) {
        s.deleting = true
        timer = setTimeout(tick, 1600)
      } else if (s.deleting && s.c > 0) {
        s.c--
        timer = setTimeout(tick, 45)
      } else {
        s.deleting = false
        s.r = (s.r + 1) % ROLES.length
        timer = setTimeout(tick, 350)
      }
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return text
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const typed = useTypedRoles()

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="hero-greeting" variants={item}>👋 Hello, I'm</motion.p>
        <motion.h1 className="hero-name" variants={item}>Muthu Jayabal</motion.h1>
        <motion.h2 className="hero-role" variants={item}>
          <span className="static-text">I'm a </span>
          <span className="typed">{typed}</span><span className="cursor-blink">|</span>
        </motion.h2>
        <motion.p className="hero-desc" variants={item}>
          Software Engineer with <strong>4+ years</strong> of experience building{' '}
          <strong>cross-platform web &amp; mobile apps</strong> with React, React Native &amp; Next.js —
          from production iOS/Android apps to AI-powered platforms.
        </motion.p>
        <motion.div className="hero-cta" variants={item}>
          <a href="#projects" className="btn btn-primary">View My Work →</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </motion.div>
        <motion.div className="hero-socials" variants={item}>
          <a href="https://www.linkedin.com/in/muthu-jayabal-1b7581209/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
          </a>
          <a href="mailto:jayabal99942@gmail.com" aria-label="Email" title="Email">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4-8 5-8-5V6l8 5 8-5z"/></svg>
          </a>
          <a href="tel:+919994251853" aria-label="Phone" title="Call">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>
          </a>
        </motion.div>
      </motion.div>

      <a href="#about" className="scroll-down" aria-label="Scroll down">
        <span className="mouse"><span className="wheel"></span></span>
      </a>
    </section>
  )
}
