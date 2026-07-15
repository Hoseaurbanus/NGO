import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState([])
  const [visible, setVisible] = useState(false)
  const rafRef = useRef(null)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    let trailTimeout = null
    const handleMouseMove = (e) => {
      lastPos.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition(lastPos.current)
          rafRef.current = null
        })
      }
      setVisible(true)
      if (!trailTimeout) {
        trailTimeout = setTimeout(() => {
          setTrail(prev => [...prev.slice(-3), { x: lastPos.current.x, y: lastPos.current.y, id: Date.now() }])
          trailTimeout = null
        }, 50)
      }
    }

    const handleMouseEnter = () => setVisible(true)
    const handleMouseLeave = () => setVisible(false)

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, .magnetic-btn, [role="button"], .glass-card')) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (trailTimeout) clearTimeout(trailTimeout)
    }
  }, [])

  if (!visible) return null

  const size = isHovering ? 40 : 12
  const offset = isHovering ? 20 : 6

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>
      {trail.map((point, i) => (
        <div
          key={point.id}
          style={{
            position: 'fixed',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: `rgba(0, 229, 255, ${(i + 1) * 0.15})`,
            transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
            transform: `translate(${point.x - 4}px, ${point.y - 4}px)`,
            willChange: 'transform',
          }}
        />
      ))}
      <div style={{
        position: 'fixed',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: '2px solid rgba(0, 229, 255, 0.6)',
        transition: 'width 0.3s var(--ease-spring), height 0.3s var(--ease-spring), transform 0.08s ease-out',
        transform: `translate(${position.x - offset}px, ${position.y - offset}px)`,
        willChange: 'transform',
        mixBlendMode: 'difference',
      }} />
    </div>
  )
}
