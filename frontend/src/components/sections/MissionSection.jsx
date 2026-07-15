import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import GlassCard from '@components/ui/GlassCard'

const pillars = [
  {
    icon: 'bi-book',
    title: 'Education',
    description: 'Providing quality education and learning resources to underserved African communities.',
  },
  {
    icon: 'bi-heart-pulse',
    title: 'Healthcare',
    description: 'Delivering essential healthcare services and medical supplies across the continent.',
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
    <section style={{
      padding: '120px 0',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <ScrollReveal>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--aurora-cyan)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Our Mission
              </div>
              <GradientText tag="h2" gradient="aurora" style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'var(--font-display)',
                marginBottom: '20px',
              }}>
                Empowering African Communities
              </GradientText>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}>
                At SmugFlex, we believe every African community deserves the opportunity to thrive. Our mission is to create lasting change through education, healthcare access, and community-driven development.
              </p>
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
      </div>
    </section>
  )
}
