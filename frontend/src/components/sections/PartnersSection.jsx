import ScrollReveal from '@components/ui/ScrollReveal'

const partners = [
  { name: 'United Nations', logo: 'UN' },
  { name: 'World Health Organization', logo: 'WHO' },
  { name: 'UNICEF', logo: 'UNICEF' },
  { name: 'Red Cross', logo: 'RC' },
  { name: 'World Bank', logo: 'WB' },
  { name: 'USAID', logo: 'USAID' },
  { name: 'European Union', logo: 'EU' },
  { name: 'Gates Foundation', logo: 'GF' },
]

export default function PartnersSection() {
  return (
    <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
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
              Trusted by leading organizations worldwide
            </h2>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          opacity: 0.6,
        }}>
          {partners.map((partner, i) => (
            <div
              key={partner.name}
              className="glass-card"
              style={{
                width: '140px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                cursor: 'default',
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
