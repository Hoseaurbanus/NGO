import ScrollReveal from '@components/ui/ScrollReveal'
import Container from '@components/ui/Container'
import SectionHeading from '@components/ui/SectionHeading'
import CountUp from '@components/ui/CountUp'
import AuroraBackground from '@components/ui/AuroraBackground'

const impactStats = [
  { value: 0, suffix: '+', label: 'Lives Impacted', icon: 'bi-heart' },
  { value: 0, suffix: '+', label: 'Active Programs', icon: 'bi-folder' },
  { value: 0, suffix: '', label: 'Countries Reached', icon: 'bi-globe' },
  { value: 0, suffix: '+', label: 'Volunteers Worldwide', icon: 'bi-people' },
  { value: 0, suffix: 'M', label: 'Funds Raised', prefix: '$', icon: 'bi-currency-dollar' },
  { value: 0, suffix: '+', label: 'Projects Completed', icon: 'bi-check-circle' },
]

export default function ImpactSection() {
  return (
    <AuroraBackground intensity="light" className="impact-section" style={{ padding: '120px 0' }}>
      <Container>
        <ScrollReveal>
          <SectionHeading align="center" eyebrow="Our Impact" title="Numbers That Tell Our Story" subtitle="Every number represents a life touched, a community strengthened, a future brightened." />
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
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
      </Container>
    </AuroraBackground>
  )
}
