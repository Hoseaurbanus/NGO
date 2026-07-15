import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'

const stories = [
  {
    quote: "SmugFlex gave my daughter the chance to attend school for the first time. Now she dreams of becoming a doctor.",
    name: 'Amara K.',
    location: 'Freetown, Sierra Leone',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
  },
  {
    quote: "The healthcare program saved my village. We now have clean water and regular medical checkups. Our children are healthier than ever.",
    name: 'Wanjiku M.',
    location: 'Nakuru, Kenya',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    quote: "Through their community empowerment program, I started my own business and now employ five people in my community.",
    name: 'Adaeze O.',
    location: 'Lagos, Nigeria',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
]

export default function StoriesSection() {
  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
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
