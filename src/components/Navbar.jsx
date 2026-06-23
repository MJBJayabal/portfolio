import { useEffect, useState } from 'react'
import { asset } from '../App.jsx'

const LINKS = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  // Navbar gets a solid background after a little scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the link for the section currently in view.
  useEffect(() => {
    const sections = LINKS.map(([id]) => document.getElementById(id)).filter(Boolean)
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => spy.observe(s))
    return () => spy.disconnect()
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <a href="#home" className="logo">MJ<span>.</span></a>

      <nav className={`nav-links${open ? ' open' : ''}`}>
        {LINKS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href={asset('assets/Muthu_Jayabal_Resume.pdf')}
          className="btn-resume"
          download
          onClick={() => setOpen(false)}
        >
          Download CV
        </a>
      </nav>

      <button
        className={`hamburger${open ? ' open' : ''}`}
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span></span><span></span><span></span>
      </button>
    </header>
  )
}
