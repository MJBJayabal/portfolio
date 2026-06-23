// Aurora gradient waves — soft, flowing sheets of indigo/cyan/violet/pink light.
// Pure CSS animation (see .aurora in index.css); respects prefers-reduced-motion
// via the global reduced-motion block.
export default function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="w1"></span>
      <span className="w2"></span>
      <span className="w3"></span>
    </div>
  )
}
