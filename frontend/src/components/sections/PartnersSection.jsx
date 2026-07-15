import ScrollReveal from '@components/ui/ScrollReveal'
import Container from '@components/ui/Container'
import SectionHeading from '@components/ui/SectionHeading'

const partners = [
  { name: 'Foundation A', logo: 'FA' },
  { name: 'Organization B', logo: 'OB' },
  { name: 'Institute C', logo: 'IC' },
  { name: 'Alliance D', logo: 'AD' },
  { name: 'Foundation E', logo: 'FE' },
  { name: 'Group F', logo: 'GF' },
  { name: 'Partnership G', logo: 'PG' },
  { name: 'Coalition H', logo: 'CH' },
]

export default function PartnersSection() {
  return (
    <section className="partners-section" style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <Container>
        <ScrollReveal>
          <SectionHeading align="center" eyebrow="Our Partners" title="Trusted by leading organizations worldwide" />
        </ScrollReveal>

        <div className="partners-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
          gap: '16px',
        }}>
          {partners.map((partner) => (
            <div
              key={partner.name}
              style={{
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                opacity: 0.7,
                transition: 'opacity 0.3s',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em',
              }}>
                {partner.logo}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
