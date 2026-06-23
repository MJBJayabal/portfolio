import { m, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const PROJECTS = [
  {
    emoji: '🗺️',
    title: 'Tour Connect',
    desc: 'A multi-language travel companion app with live maps, geolocation and offline-capable state — connecting travelers with tours and local guides.',
    chips: ['React Native', 'TypeScript', 'Supabase', 'react-native-maps', 'i18next', 'Zustand'],
  },
  {
    emoji: '🛒',
    title: 'Namma Kadai',
    desc: 'A local marketplace mobile app with multi-language support, maps and location services — bringing neighbourhood shops online for everyday buyers.',
    chips: ['React Native (Expo)', 'TypeScript', 'Maps', 'i18next', 'NativeWind', 'Zustand'],
  },
  {
    emoji: '📦',
    title: 'Creamy Sticks Stock',
    desc: 'An inventory & stock-management web app with real-time data and one-click PDF report generation — streamlining day-to-day operations for the business.',
    chips: ['Next.js', 'React', 'TypeScript', 'Supabase', 'jsPDF'],
  },
  {
    emoji: '🏷️',
    title: 'Label Reader',
    desc: 'A product-label scanning platform that reads and parses nutrition & ingredient labels, with secure auth and cloud storage on a MongoDB backend.',
    chips: ['Next.js', 'MongoDB', 'Clerk', 'AWS Amplify', 'Framer Motion'],
  },
]

export default function Projects() {
  const reduce = useReducedMotion()

  // Grid: cards fade/spring in one after another as the grid scrolls into view.
  const gridV = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.05 } },
  }
  // Each card: spring entrance + a "hover" state that lifts it (replaces the old CSS hover transform).
  const cardV = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } },
    hover: reduce ? {} : { y: -8, transition: { type: 'spring', stiffness: 320, damping: 22 } },
  }
  // Emoji reacts to its card's hover (variant label propagates from the parent article).
  const emojiV = {
    show: { rotate: 0, scale: 1 },
    hover: reduce ? {} : { rotate: [0, -14, 12, -8, 0], scale: 1.25, transition: { duration: 0.55 } },
  }
  const tap = reduce ? undefined : { scale: 0.985 }

  return (
    <section className="section" id="projects">
      <Reveal className="section-head">
        <span className="kicker">03 — Projects</span>
        <h2>Things I've <span className="grad-text">built &amp; shipped</span></h2>
      </Reveal>

      {/* Featured */}
      <Reveal as="article" className="project-featured">
        <div className="pf-content">
          <span className="pf-badge">⭐ Featured · Live on iOS &amp; Android</span>
          <h3>Food Rating App</h3>
          <p>
            A cross-platform <strong>AI health &amp; nutrition rating app</strong> that scans foods and scores
            them for healthiness. Built end-to-end in React Native, integrated with Apple HealthKit &amp;
            Android Health Connect, secure auth, in-app camera and push notifications — shipped to both stores.
          </p>
          <div className="chips small">
            <span>React Native (Expo)</span><span>TypeScript</span><span>Clerk</span>
            <span>HealthKit</span><span>Health Connect</span><span>Sentry</span>
          </div>
          <div className="pf-links">
            <a href="https://www.foodrating.in/" target="_blank" rel="noopener" className="btn btn-primary sm">🌐 Visit Website</a>
            <a href="https://apps.apple.com/in/app/ai-food-rating/id6762199452" target="_blank" rel="noopener" className="btn btn-ghost sm">App Store</a>
            <a href="https://play.google.com/store/apps/details?id=in.foodrating.ai" target="_blank" rel="noopener" className="btn btn-ghost sm">Google Play</a>
          </div>
        </div>
        <div className="pf-visual" aria-hidden="true">
          <div className="phone">
            <div className="phone-screen">
              <div className="ps-bar"></div>
              <div className="ps-score">A+</div>
              <div className="ps-title">Food Rating</div>
              <div className="ps-line"></div>
              <div className="ps-line short"></div>
              <div className="ps-pill">🥗 Healthy choice</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Grid */}
      <m.div
        className="projects-grid"
        variants={gridV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {PROJECTS.map((p) => (
          <m.article
            className="project-card"
            key={p.title}
            variants={cardV}
            whileHover="hover"
            whileTap={tap}
          >
            <div className="pc-top">
              <m.span className="pc-emoji" variants={emojiV}>{p.emoji}</m.span>
              <div className="pc-links"></div>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="chips small">
              {p.chips.map((c) => <span key={c}>{c}</span>)}
            </div>
          </m.article>
        ))}

        <m.article
          className="project-card more-card"
          variants={cardV}
          whileHover="hover"
          whileTap={tap}
        >
          <m.span className="pc-emoji" variants={emojiV}>✨</m.span>
          <h3>More on the way</h3>
          <p>I'm always building. Reach out to see code samples, private repos and what I'm shipping next.</p>
          <a href="#contact" className="link-arrow">Let's talk →</a>
        </m.article>
      </m.div>
    </section>
  )
}
