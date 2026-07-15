import ScrollReveal from '@components/ui/ScrollReveal'
import Container from '@components/ui/Container'
import SectionHeading from '@components/ui/SectionHeading'

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" style={{ padding: 'clamp(60px, 10vw, 96px) 0' }}>
      <Container>
        <ScrollReveal>
          <SectionHeading align="center" eyebrow="Testimonials" title="What People Say" />
        </ScrollReveal>
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          color: 'var(--text-muted)',
          fontSize: '0.95rem',
        }}>
          <i className="bi bi-chat-quote" style={{ fontSize: '2rem', display: 'block', marginBottom: '16px', opacity: 0.4 }}></i>
          Testimonials coming soon.
        </div>
      </Container>
    </section>
  )
}
