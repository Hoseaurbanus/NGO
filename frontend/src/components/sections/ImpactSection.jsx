import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import CountUp from '@components/ui/CountUp'
import AuroraBackground from '@components/ui/AuroraBackground'

const impactStats = [
  { value: 250000, suffix: '+', label: 'Lives Impacted', icon: 'bi-heart' },
  { value: 45, suffix: '+', label: 'Active Programs', icon: 'bi-folder' },
  { value: 18, suffix: '', label: 'Countries Reached', icon: 'bi-globe' },
  { value: 5000, suffix: '+', label: 'Volunteers Worldwide', icon: 'bi-people' },
  { value: 12, suffix: 'M', label: 'Funds Raised', prefix: '$', icon: 'bi-currency-dollar' },
  { value: 200, suffix: '+', label: 'Projects Completed', icon: 'bi-check-circle' },
]

export default function ImpactSection() {
  return (
    <AuroraBackground intensity="light" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--aurora-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Our Impact
            </div>
            <GradientText tag="h2" gradient="aurora" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-display)',
              marginBottom: '16px',
            }}>
              Numbers That Tell Our Story
            </GradientText>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Every number represents a life touched, a community strengthened, a future brightened.
            </p>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}>
          {impactStats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="glass-card" style={{
                padding: '32px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--gradient-aurora)',
                  opacity: 0.5,
                }} />
                <i className={`bi ${stat.icon}`} style={{
                  fontSize: '1.5rem',
                  color: 'var(--aurora-cyan)',
                  marginBottom: '16px',
                  display: 'block',
                }}></i>
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--gradient-aurora)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                }}>
                  <CountUp end={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix} />
                </div>
                <div style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}>{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </AuroraBackground>
  )
}
