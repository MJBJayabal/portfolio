import { useEffect, useRef } from 'react'

// [text, tokenClass] — class maps to .tok-* colors in index.css
const LINES = [
  [['const ', 'key'], ['developer', 'var'], [' = ', 'punc'], ['{', 'punc']],
  [['  name', 'var'], [': ', 'punc'], ['"Muthu Jayabal"', 'str'], [',', 'punc']],
  [['  role', 'var'], [': ', 'punc'], ['"Software Engineer"', 'str'], [',', 'punc']],
  [['  location', 'var'], [': ', 'punc'], ['"Bengaluru, India"', 'str'], [',', 'punc']],
  [['  stack', 'var'], [': ', 'punc'], ['[', 'punc'], ['"React"', 'str'], [', ', 'punc'], ['"React Native"', 'str'], [', ', 'punc'], ['"Next.js"', 'str'], [']', 'punc'], [',', 'punc']],
  [['  passion', 'var'], [': ', 'punc'], ['true', 'num'], [',', 'punc']],
  [['}', 'punc'], [';', 'punc']],
  [],
  [['function ', 'key'], ['build', 'fn'], ['() ', 'punc'], ['{', 'punc']],
  [['  while ', 'key'], ['(', 'punc'], ['coffee', 'var'], [') ', 'punc'], ['{', 'punc']],
  [['    ship', 'fn'], ['(', 'punc'], ['product', 'var'], ['); ', 'punc'], ['// 🚀 ships to the App Store', 'com']],
  [['  }', 'punc']],
  [['}', 'punc']],
]

const spanFor = (cls) => (cls === 'punc' || cls === '') ? 'tok-punc' : `tok-${cls}`

// Self-typing code editor — ported from the old vanilla IIFE.
export default function CodeWindow() {
  const codeRef = useRef(null)

  useEffect(() => {
    const codeEl = codeRef.current
    if (!codeEl) return

    // Flatten lines into a token stream with explicit newlines.
    const stream = []
    LINES.forEach((line, i) => {
      line.forEach((t) => stream.push(t))
      if (i < LINES.length - 1) stream.push(['\n', 'nl'])
    })

    const fullHTML = () =>
      stream.map(([txt, cls]) => (cls === 'nl' ? '\n' : `<span class="${spanFor(cls)}">${txt}</span>`)).join('')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      codeEl.innerHTML = fullHTML()
      return
    }

    const CARET = '<span class="code-caret"></span>'
    let committed = ''
    let ti = 0
    let timers = []
    const wait = (fn, ms) => timers.push(setTimeout(fn, ms))

    function typeToken() {
      if (ti >= stream.length) {
        codeEl.innerHTML = committed + CARET
        wait(() => { committed = ''; ti = 0; typeToken() }, 4000)
        return
      }
      const [txt, cls] = stream[ti]
      if (cls === 'nl') { committed += '\n'; ti++; wait(typeToken, 120); return }

      const span = spanFor(cls)
      let ci = 0
      const typeChar = () => {
        ci++
        codeEl.innerHTML = committed + `<span class="${span}">${txt.slice(0, ci)}</span>` + CARET
        if (ci < txt.length) {
          wait(typeChar, txt.length > 12 ? 16 : 30)
        } else {
          committed += `<span class="${span}">${txt}</span>`
          ti++
          wait(typeToken, cls === 'com' ? 260 : 40)
        }
      }
      typeChar()
    }

    // Start once the window scrolls into view.
    const startObs = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { typeToken(); obs.disconnect() }
    }, { threshold: 0.3 })
    startObs.observe(codeEl)

    return () => {
      startObs.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="code-window" aria-hidden="true">
      <div className="cw-bar">
        <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
        <span className="cw-title">developer.js</span>
      </div>
      <pre className="cw-body"><code ref={codeRef}></code></pre>
    </div>
  )
}
