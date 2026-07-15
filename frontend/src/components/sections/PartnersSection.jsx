import ScrollReveal from '@components/ui/ScrollReveal'

const partners = [
  { name: 'African Union', logo: 'AU' },
  { name: 'African Development Bank', logo: 'AfDB' },
  { name: 'UNICEF Africa', logo: 'UNICEF' },
  { name: 'WHO Africa', logo: 'WHO' },
  { name: 'Ford Foundation Africa', logo: 'FF' },
  { name: 'Mastercard Foundation', logo: 'MCF' },
  { name: 'Tony Elumelu Foundation', logo: 'TEF' },
  { name: 'Gates Foundation', logo: 'GF' },
]

export default function PartnersSection() {
  return (
    <section className="partners-section" style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--aurora-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Our Partners
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}>
              Trusted by leading organizations across Africa
            </h2>
          </div>
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
      </div>
    </section>
  )
}
