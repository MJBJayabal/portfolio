import { LazyMotion, domAnimation } from 'framer-motion'
import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// Asset base so the CV/PDF links resolve under the /portfolio/ Pages path AND in dev.
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`

export default function App() {
  // LazyMotion + the lightweight `m` components load only the `domAnimation`
  // feature set (animations, variants, hover/tap, whileInView) — no drag/layout —
  // which trims the Framer Motion bundle noticeably vs. importing full `motion`.
  return (
    <LazyMotion features={domAnimation}>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </LazyMotion>
  )
}
