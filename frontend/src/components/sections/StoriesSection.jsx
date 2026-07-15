import ScrollReveal from '@components/ui/ScrollReveal'
import Container from '@components/ui/Container'
import SectionHeading from '@components/ui/SectionHeading'

export default function StoriesSection() {
  return (
    <section className="stories-section" style={{ padding: 'clamp(60px, 10vw, 96px) 0', background: 'var(--bg-secondary)' }}>
      <Container>
        <ScrollReveal>
          <SectionHeading align="center" eyebrow="Stories of Change" title="Real People, Real Impact" />
        </ScrollReveal>
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          color: 'var(--text-muted)',
          fontSize: '0.95rem',
        }}>
          <i className="bi bi-book" style={{ fontSize: '2rem', display: 'block', marginBottom: '16px', opacity: 0.4 }}></i>
          Stories coming soon.
        </div>
      </Container>
    </section>
  )
}
