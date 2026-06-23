import Reveal from './Reveal.jsx'

const TIMELINE = [
  {
    title: 'Software Engineer',
    date: 'Jun 2021 – Present',
    org: 'Kraftbyte · Bengaluru, India',
    bullets: [
      'Built & shipped a cross-platform health & food-rating app (React Native, TypeScript) with HealthKit / Health Connect, auth, camera and notifications — released to the App Store & Google Play.',
      'Developed Tour Connect & Namma Kadai — multi-language RN apps with maps, geolocation and offline state on a Supabase backend.',
      'Delivered web apps including Creamy Sticks Stock and Label Reader, with PDF reporting and cloud integrations.',
    ],
  },
  {
    title: 'Full Stack Development — Certification',
    date: 'Certification',
    org: 'Kalvi Institute · Madurai, India',
    bullets: [
      'Intensive full-stack web development program covering modern JavaScript, front-end frameworks and back-end fundamentals.',
    ],
  },
  {
    title: 'Bachelor of Business Administration (BBA)',
    date: '2016 – 2019',
    org: 'The American College, Madurai Kamaraj University · Madurai, India',
    bullets: [],
  },
]

export default function Experience() {
  return (
    <section className="section" id="experience">
      <Reveal className="section-head">
        <span className="kicker">04 — Journey</span>
        <h2>Experience &amp; <span className="grad-text">education</span></h2>
      </Reveal>

      <div className="timeline">
        {TIMELINE.map((t, i) => (
          <Reveal className="tl-item" key={t.title} delay={i * 0.08}>
            <div className="tl-dot"></div>
            <div className="tl-card">
              <div className="tl-head"><h3>{t.title}</h3><span className="tl-date">{t.date}</span></div>
              <p className="tl-org">{t.org}</p>
              {t.bullets.length > 0 && (
                <ul>{t.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
