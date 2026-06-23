// Animated gradient blobs + grid overlay. Pure CSS animation (see index.css).
export default function Background() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="grid-overlay"></div>
    </div>
  )
}
