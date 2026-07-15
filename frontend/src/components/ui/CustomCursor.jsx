import { useState, useEffect, useCallback } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)
      setTrail(prev => [...prev.slice(-3), { x: e.clientX, y: e.clientY, id: Date.now() }])
    }

    const handleMouseEnter = () => setVisible(true)
    const handleMouseLeave = () => setVisible(false)

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, .magnetic-btn, [role="button"], .glass-card')) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove)
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
    }
  }, [])

  if (!visible) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>
      {trail.map((point, i) => (
        <div
          key={point.id}
          style={{
            position: 'fixed',
            left: point.x - 4,
            top: point.y - 4,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: `rgba(0, 229, 255, ${(i + 1) * 0.15})`,
            transition: 'all 0.15s ease-out',
          }}
        />
      ))}
      <div style={{
        position: 'fixed',
        left: position.x - (isHovering ? 20 : 6),
        top: position.y - (isHovering ? 20 : 6),
        width: isHovering ? '40px' : '12px',
        height: isHovering ? '40px' : '12px',
        borderRadius: '50%',
        border: '2px solid rgba(0, 229, 255, 0.6)',
        transition: 'width 0.3s var(--ease-spring), height 0.3s var(--ease-spring), left 0.08s ease-out, top 0.08s ease-out',
        willChange: 'transform',
        mixBlendMode: 'difference',
      }} />
    </div>
  )
}
