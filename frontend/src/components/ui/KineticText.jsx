import { useEffect, useRef, useState } from 'react'

export default function KineticText({ text, className = '', tag: Tag = 'h1', delay = 0, stagger = 0.03 }) {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const words = text.split(' ')

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref} className={className} style={{ overflow: 'hidden' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', overflow: 'hidden' }}>
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              style={{
                display: 'inline-block',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(60px) rotateX(-60deg)',
                transition: `opacity 0.5s var(--ease-spring) ${delay + (wi * word.length + ci) * stagger}s, transform 0.5s var(--ease-spring) ${delay + (wi * word.length + ci) * stagger}s`,
              }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
