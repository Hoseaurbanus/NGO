import { useState, useRef, useCallback } from 'react'

export default function GlassCard({ children, className = '', hover = true, glow = false, as: Tag = 'div', ...props }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
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

  const style = {
    background: 'var(--glass-bg)',
    border: `1px solid ${isHovered ? 'var(--border-glow)' : 'var(--glass-border)'}`,
    backdropFilter: 'blur(var(--glass-blur))',
    WebkitBackdropFilter: 'blur(var(--glass-blur))',
    borderRadius: 'var(--radius-lg)',
    transition: 'all 0.3s var(--ease-smooth)',
    transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered && hover ? 'translateY(-4px)' : ''}`,
    boxShadow: isHovered && glow ? 'var(--shadow-glow)' : isHovered ? 'var(--shadow-card)' : 'none',
    ...props.style,
  }

  return (
    <Tag
      ref={cardRef}
      className={`glass-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}
