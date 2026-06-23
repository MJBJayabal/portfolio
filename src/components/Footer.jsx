export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>© {year} Muthu Jayabal · Software Engineer</p>
      <p className="footer-made">Designed &amp; built with ❤️ and a lot of ☕</p>
    </footer>
  )
}
