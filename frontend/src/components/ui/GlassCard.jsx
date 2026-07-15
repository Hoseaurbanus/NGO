import { useState, useRef, useCallback } from 'react'

export default function GlassCard({ children, className = '', hover = true, glow = false, as: Tag = 'div', ...props }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (e.pointerType !== 'mouse') return
    if (!cardRef.current || !hover) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }, [hover])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }, [])

  const handleTouchStart = useCallback(() => {
    setIsPressed(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false)
    setTilt({ x: 0, y: 0 })
  }, [])

  const isHoverState = isHovered && hover
  const isPressState = isPressed
  const tiltTransform = isPressState ? 'scale(0.98)' : `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHoverState ? 'translateY(-4px)' : ''}`

  const style = {
    background: 'var(--glass-bg)',
    border: `1px solid ${isHoverState || isPressState ? 'var(--border-glow)' : 'var(--glass-border)'}`,
    backdropFilter: 'blur(var(--glass-blur))',
    WebkitBackdropFilter: 'blur(var(--glass-blur))',
    borderRadius: 'var(--radius-lg)',
    transition: 'transform 0.15s var(--ease-smooth), border-color 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth)',
    transform: tiltTransform,
    boxShadow: (isHoverState || isPressState) && glow ? 'var(--shadow-glow)' : isHoverState || isPressState ? 'var(--shadow-card)' : 'none',
    ...props.style,
  }

  return (
    <Tag
      ref={cardRef}
      className={`glass-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...props}
    >
      {children}
    </Tag>
  )
}