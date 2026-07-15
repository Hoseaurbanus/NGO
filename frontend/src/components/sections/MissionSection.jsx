import ScrollReveal from '@components/ui/ScrollReveal'
import Container from '@components/ui/Container'
import SectionHeading from '@components/ui/SectionHeading'
import GlassCard from '@components/ui/GlassCard'

const pillars = [
  {
    icon: 'bi-book',
    title: 'Education',
    description: 'Providing quality education and learning resources to underserved communities worldwide.',
  },
  {
    icon: 'bi-heart-pulse',
    title: 'Healthcare',
    description: 'Delivering essential healthcare services and medical supplies to communities worldwide.',
  },
  {
    icon: 'bi-people',
    title: 'Community',
    description: 'Building resilient communities through sustainable development and empowerment.',
  },
  {
    icon: 'bi-globe',
    title: 'Sustainability',
    description: 'Promoting environmental stewardship and sustainable practices for future generations.',
  },
]

export default function MissionSection() {
  return (
    <section className="mission-section" style={{
      padding: 'clamp(60px, 12vw, 120px) 0',
      position: 'relative',
    }}>
      <Container>
        <div className="mission-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(24px, 6vw, 60px)',
          alignItems: 'start',
        }}>
          <div className="mission-sticky" style={{ position: 'sticky', top: '120px' }}>
            <ScrollReveal>
              <SectionHeading align="left" eyebrow="Our Mission" title="Empowering Communities" subtitle="At NGO, we believe every community deserves the opportunity to thrive. Our mission is to create lasting change through education, healthcare access, and community-driven development." />
            </ScrollReveal>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.1} direction="right">
                <GlassCard style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'rgba(0, 229, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <i className={`bi ${pillar.icon}`} style={{ fontSize: '1.5rem', color: 'var(--aurora-cyan)' }}></i>
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        marginBottom: '8px',
                      }}>{pillar.title}</h3>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                      }}>{pillar.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
