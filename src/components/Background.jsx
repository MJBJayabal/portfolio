import Aurora from './Aurora.jsx'

// Flowing aurora gradient waves behind animated gradient blobs + grid overlay.
export default function Background() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <Aurora />
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="grid-overlay"></div>
    </div>
  )
}
