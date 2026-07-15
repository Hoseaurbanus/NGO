import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'

const stories = [
  {
    quote: "This program gave my child the chance to attend school for the first time.",
    name: 'Name S.',
    location: 'City, Country',
    image: '',
  },
  {
    quote: "The healthcare program changed our community. Our children are healthier than ever.",
    name: 'Name S.',
    location: 'City, Country',
    image: '',
  },
  {
    quote: "Through the community empowerment program, I started my own business.",
    name: 'Name S.',
    location: 'City, Country',
    image: '',
  },
]

export default function StoriesSection() {
  return (
    <section className="stories-section" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
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
              Stories of Change
            </div>
            <GradientText tag="h2" gradient="aurora" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-display)',
            }}>
              Real People, Real Impact
            </GradientText>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '32px',
        }}>
          {stories.map((story, i) => (
            <ScrollReveal key={story.name} delay={i * 0.15}>
              <div className="glass-card" style={{
                padding: '32px',
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  fontSize: '4rem',
                  fontFamily: 'Georgia, serif',
                  color: 'var(--aurora-cyan)',
                  opacity: 0.2,
                  lineHeight: 1,
                }}>&ldquo;</div>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '24px',
                  flex: 1,
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {story.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundImage: `url(${story.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '2px solid var(--aurora-cyan)',
                  }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{story.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{story.location}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
