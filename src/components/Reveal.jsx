import { motion } from 'framer-motion'

// Drop-in replacement for the old `.reveal` IntersectionObserver pattern.
// Fades + lifts content into view once, when it scrolls into the viewport.
export default function Reveal({ children, as = 'div', delay = 0, className, ...rest }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
