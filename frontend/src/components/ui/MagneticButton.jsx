import { useRef, useState, useCallback } from 'react'

export default function MagneticButton({ children, className = '', variant = 'primary', size = 'md', ...props }) {
  const btnRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setOffset({ x: x * 0.3, y: y * 0.3 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  const sizeStyles = {
    sm: { padding: '10px 20px', fontSize: '0.875rem' },
    md: { padding: '14px 32px', fontSize: '1rem' },
    lg: { padding: '18px 40px', fontSize: '1.125rem' },
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
        transition: 'transform 0.3s var(--ease-spring), box-shadow 0.3s var(--ease-smooth)',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
          opacity: 0,
          transition: 'opacity 0.3s',
          zIndex: 0,
        }} />
      )}
    </button>
  )
}
