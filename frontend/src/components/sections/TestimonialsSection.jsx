import { useState } from 'react'
import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import GlassCard from '@components/ui/GlassCard'

const testimonials = [
  {
    quote: "This organization is making a real difference in our community.",
    name: 'Name S.',
    role: 'Community Leader',
    image: '',
    rating: 5,
  },
  {
    quote: "Working with this team has been an incredible experience. Their commitment to impact is unmatched.",
    name: 'Name S.',
    role: 'Program Coordinator',
    image: '',
    rating: 5,
  },
  {
    quote: "The programs here changed lives. We are forever grateful for their dedication.",
    name: 'Name S.',
    role: 'Volunteer',
    image: '',
    rating: 5,
  },
  {
    quote: "As a partner, we've seen firsthand how this organization delivers on their promises.",
    name: 'Name S.',
    role: 'Partner Organization',
    image: '',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="testimonials-section" style={{ padding: '120px 0' }}>
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
              Testimonials
            </div>
            <GradientText tag="h2" gradient="aurora" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-display)',
            }}>
              What People Say
            </GradientText>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px',
        }}>
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <GlassCard style={{
                padding: '32px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <i key={j} className="bi bi-star-fill" style={{ color: 'var(--aurora-amber)', fontSize: '0.85rem' }}></i>
                  ))}
                </div>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  flex: 1,
                  marginBottom: '20px',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundImage: `url(${t.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '2px solid var(--aurora-cyan)',
                  }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
