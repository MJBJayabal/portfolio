import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Self-hosted fonts (no render-blocking request to Google Fonts).
// Weights match the original: Inter 400/500/600/700, Space Grotesk 500/600/700.
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'

import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
