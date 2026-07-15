import { useEffect, useRef } from 'react'

export default function AuroraBackground({ children, className = '', intensity = 'normal' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      containerRef.current.style.setProperty('--mouse-x', `${x}px`)
      containerRef.current.style.setProperty('--mouse-y', `${y}px`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const blobs = intensity === 'light' ? 2 : intensity === 'heavy' ? 5 : 3

  return (
    <div ref={containerRef} className={`aurora-bg ${className}`} style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {blobs >= 1 && (
          <div style={{
            position: 'absolute', width: '500px', height: '500px',
            borderRadius: '50%', filter: 'blur(120px)',
            background: 'radial-gradient(circle, rgba(83,109,254,0.3) 0%, transparent 70%)',
            top: '-10%', left: '-5%',
            animation: 'aurora-drift-1 25s ease-in-out infinite',
            willChange: 'transform',
          }} />
        )}
        {blobs >= 2 && (
          <div style={{
            position: 'absolute', width: '400px', height: '400px',
            borderRadius: '50%', filter: 'blur(100px)',
            background: 'radial-gradient(circle, rgba(0,229,255,0.25) 0%, transparent 70%)',
            top: '20%', right: '-5%',
            animation: 'aurora-drift-2 30s ease-in-out infinite',
            willChange: 'transform',
          }} />
        )}
        {blobs >= 3 && (
          <div style={{
            position: 'absolute', width: '350px', height: '350px',
            borderRadius: '50%', filter: 'blur(90px)',
            background: 'radial-gradient(circle, rgba(124,77,255,0.2) 0%, transparent 70%)',
            bottom: '-5%', left: '30%',
            animation: 'aurora-drift-3 20s ease-in-out infinite',
            willChange: 'transform',
          }} />
        )}
        {blobs >= 4 && (
          <div style={{
            position: 'absolute', width: '300px', height: '300px',
            borderRadius: '50%', filter: 'blur(80px)',
            background: 'radial-gradient(circle, rgba(0,230,118,0.15) 0%, transparent 70%)',
            top: '60%', left: '10%',
            animation: 'aurora-drift-1 35s ease-in-out infinite reverse',
            willChange: 'transform',
          }} />
        )}
        {blobs >= 5 && (
          <div style={{
            position: 'absolute', width: '250px', height: '250px',
            borderRadius: '50%', filter: 'blur(70px)',
            background: 'radial-gradient(circle, rgba(255,82,82,0.15) 0%, transparent 70%)',
            top: '40%', right: '20%',
            animation: 'aurora-drift-2 28s ease-in-out infinite reverse',
            willChange: 'transform',
          }} />
        )}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
