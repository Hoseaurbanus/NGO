import { useRef, useState, useCallback } from 'react'

export default function MagneticButton({ children, className = '', variant = 'primary', size = 'md', ...props }) {
  const btnRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (e.pointerType !== 'mouse') return
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setOffset({ x: x * 0.3, y: y * 0.3 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  const handleTouchStart = useCallback(() => {
    setIsPressed(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false)
    setOffset({ x: 0, y: 0 })
  }, [])

  const sizeStyles = {
    sm: { padding: '12px 24px', fontSize: '0.9375rem', minHeight: '44px' },
    md: { padding: '14px 32px', fontSize: '1rem', minHeight: '44px' },
    lg: { padding: '18px 40px', fontSize: '1.125rem', minHeight: '48px' },
  }

  const variantStyles = {
    primary: {
      background: 'var(--gradient-aurora)',
      color: 'white',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--aurora-cyan)',
      border: '1px solid var(--aurora-cyan)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--glass-border)',
    },
  }

  const magneticTransform = isPressed ? `scale(0.97)` : `translate(${offset.x}px, ${offset.y}px)`

  return (
    <button
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.15s var(--ease-smooth), box-shadow 0.2s var(--ease-smooth)',
        transform: magneticTransform,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      {...props}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      {variant === 'primary' && (
        <span style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: 'inherit',
          background: 'var(--gradient-aurora)',
          filter: 'blur(12px)',
          opacity: isPressed ? 0.3 : 0,
          transition: 'opacity 0.3s',
          zIndex: 0,
        }} />
      )}
    </button>
  )
}