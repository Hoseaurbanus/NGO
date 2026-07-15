import { useEffect, useRef, useState } from 'react'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import GlassCard from '@components/ui/GlassCard'
import CountUp from '@components/ui/CountUp'
import MagneticButton from '@components/ui/MagneticButton'
import { Link } from 'react-router-dom'
import { ROUTES } from '@constants'

const stats = [
  { label: 'Lives Impacted', value: 250000, suffix: '+' },
  { label: 'Programs', value: 45, suffix: '+' },
  { label: 'African Nations', value: 12, suffix: '' },
  { label: 'Community Volunteers', value: 5000, suffix: '+' },
]

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <AuroraBackground intensity="heavy" className="hero-section">
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            willChange: 'transform',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(0, 229, 255, 0.1)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              marginBottom: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--aurora-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Impact. Redefined.
            </div>

            <KineticText
              text="Building Brighter Futures, Together"
              tag="h1"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '24px',
                maxWidth: '900px',
              }}
            />

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}>
              SmugFlex is a Pan-African NGO empowering communities through education, healthcare, and sustainable development. We don't just meet needs — we redefine impact across the continent.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}>
              <Link to={ROUTES.DONATE}>
                <MagneticButton size="lg">
                  <i className="bi bi-heart-fill" style={{ marginRight: '8px' }}></i>
                  Donate Now
                </MagneticButton>
              </Link>
              <Link to={ROUTES.ABOUT}>
                <MagneticButton size="lg" variant="secondary">
                  Our Mission
                  <i className="bi bi-arrow-right" style={{ marginLeft: '8px' }}></i>
                </MagneticButton>
              </Link>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            transform: `translateY(${scrollY * 0.05}px)`,
          }}>
            {stats.map((stat, i) => (
              <GlassCard key={stat.label} glow style={{
                padding: '24px',
                textAlign: 'center',
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--gradient-aurora)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                }}>
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}>{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="hero-scroll-indicator" style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: scrollY > 100 ? 0 : 1,
          transition: 'opacity 0.3s',
        }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll to explore
          </span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--aurora-cyan), transparent)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-scroll-indicator { display: none !important; }
        }
      `}</style>
    </AuroraBackground>
  )
}
