import Reveal from './Reveal.jsx'

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <Reveal className="contact-box">
        <span className="kicker center">05 — Contact</span>
        <h2>Let's build something <span className="grad-text">great together</span></h2>
        <p className="contact-sub">
          I'm open to <strong>Software Engineer roles</strong> and exciting projects. Have an opportunity
          or just want to say hi? My inbox is always open.
        </p>
        <a href="mailto:jayabal99942@gmail.com" className="btn btn-primary lg">✉️ Say Hello</a>
        <div className="contact-methods">
          <a href="mailto:jayabal99942@gmail.com">jayabal99942@gmail.com</a>
          <a href="tel:+919994251853">+91 99942 51853</a>
          <a href="https://www.linkedin.com/in/muthu-jayabal-1b7581209/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </Reveal>
    </section>
  )
}
