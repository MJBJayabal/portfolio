import Reveal from './Reveal.jsx'

const SKILLS = [
  {
    icon: '🎨',
    title: 'Frontend',
    chips: ['React', 'React Native', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind / NativeWind'],
  },
  {
    icon: '⚙️',
    title: 'Backend & Database',
    chips: ['Node.js', 'REST APIs', 'MongoDB', 'Mongoose', 'Supabase', 'SQL / PostgreSQL', 'Prisma'],
  },
  {
    icon: '📱',
    title: 'Mobile & Integrations',
    chips: ['Expo', 'Clerk Auth', 'HealthKit', 'Health Connect', 'Google Gemini', 'Maps & Geolocation', 'Push Notifications'],
  },
  {
    icon: '🛠️',
    title: 'Tools & Practices',
    chips: ['Git & GitHub', 'Claude AI / Claude Code', 'Agile / Scrum', 'EAS Build', 'Sentry', 'AWS Amplify', 'Vercel'],
  },
]

export default function Skills() {
  return (
    <section className="section" id="skills">
      <Reveal className="section-head">
        <span className="kicker">02 — Skills</span>
        <h2>My <span className="grad-text">technical toolkit</span></h2>
      </Reveal>

      <div className="skills-grid">
        {SKILLS.map((s, i) => (
          <Reveal className="skill-card" key={s.title} delay={i * 0.08}>
            <div className="skill-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <div className="chips">
              {s.chips.map((c) => <span key={c}>{c}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
