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
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <Reveal as="article" className="project-card" key={p.title} delay={i * 0.06}>
            <div className="pc-top"><span className="pc-emoji">{p.emoji}</span><div className="pc-links"></div></div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="chips small">
              {p.chips.map((c) => <span key={c}>{c}</span>)}
            </div>
          </Reveal>
        ))}

        <Reveal as="article" className="project-card more-card">
          <span className="pc-emoji">✨</span>
          <h3>More on the way</h3>
          <p>I'm always building. Reach out to see code samples, private repos and what I'm shipping next.</p>
          <a href="#contact" className="link-arrow">Let's talk →</a>
        </Reveal>
      </div>
    </section>
  )
}
