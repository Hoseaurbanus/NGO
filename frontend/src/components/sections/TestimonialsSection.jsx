import { useState } from 'react'
import ScrollReveal from '@components/ui/ScrollReveal'
import Container from '@components/ui/Container'
import SectionHeading from '@components/ui/SectionHeading'
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
      <Container>
        <ScrollReveal>
          <SectionHeading align="center" eyebrow="Testimonials" title="What People Say" />
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
      </Container>
    </section>
  )
}
