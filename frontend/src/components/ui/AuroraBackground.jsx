import { useEffect, useRef, useState } from 'react'

export default function AuroraBackground({ children, className = '', intensity = 'normal' }) {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const isTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
    const isSmallScreen = window.innerWidth < 768
    setIsMobile(isTouch || isSmallScreen)

    const handleResize = () => {
      const isTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isTouch || isSmallScreen)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return

    const handleMouseMove = (e) => {
      if (e.pointerType !== 'mouse') return
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      containerRef.current.style.setProperty('--mouse-x', `${x}px`)
      containerRef.current.style.setProperty('--mouse-y', `${y}px`)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile, prefersReducedMotion])

  // On mobile: 1 static blob, no animation, no blur-heavy
  // On desktop with reduced motion: 1 blob, no animation
  // On desktop normal: full intensity
  const isStatic = isMobile || prefersReducedMotion
  const blobs = isStatic ? 1 : (intensity === 'light' ? 2 : intensity === 'heavy' ? 5 : 3)

  const getBlobStyle = (i) => {
    const sizes = [500, 400, 350, 300, 250]
    const blurs = [120, 100, 90, 80, 70]
    const opacities = [0.25, 0.2, 0.15, 0.12, 0.1]
    const colors = [
      'radial-gradient(circle, rgba(83,109,254,0.3) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(0,229,255,0.25) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(124,77,255,0.2) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(0,230,118,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(255,82,82,0.15) 0%, transparent 70%)',
    ]
    const positions = [
      { top: '-10%', left: '-5%' },
      { top: '20%', right: '-5%' },
      { bottom: '-5%', left: '30%' },
      { top: '60%', left: '10%' },
      { top: '40%', right: '20%' },
    ]

    if (isStatic) {
      return {
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        filter: 'blur(40px)',
        background: colors[0],
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.15,
      }
    }

    const size = sizes[i] || 300
    const blur = isMobile ? Math.min(blurs[i] || 70, 60) : blurs[i] || 70

    return {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      filter: `blur(${blur}px)`,
      background: colors[i] || colors[0],
      ...positions[i],
      animation: prefersReducedMotion ? 'none' : `aurora-drift-${(i % 3) + 1} ${20 + i * 5}s ease-in-out infinite`,
      willChange: 'transform',
    }
  }

  return (
    <div ref={containerRef} className={`aurora-bg ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: blobs }, (_, i) => (
          <div key={i} style={getBlobStyle(i)} />
        ))}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}