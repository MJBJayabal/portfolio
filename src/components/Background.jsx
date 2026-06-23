import CodeRain from './CodeRain.jsx'

// Software-themed code rain (canvas) behind animated gradient blobs + grid overlay.
export default function Background() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <CodeRain />
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="grid-overlay"></div>
    </div>
  )
}
