import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'

const certificates = [
  { title: 'Community Health Workshop', date: '2026-07-10', type: 'Participation', id: 'CERT-2026-001' },
  { title: 'Volunteer Training Module 1', date: '2026-06-15', type: 'Completion', id: 'CERT-2026-002' },
  { title: 'First Aid Certification', date: '2026-05-20', type: 'Certification', id: 'CERT-2026-003' },
  { title: 'Education Program Support', date: '2026-04-01', type: 'Appreciation', id: 'CERT-2026-004' },
]

export default function PortalCertificates() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '8px' }}>Certificates</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Your earned certificates and achievements.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {certificates.map((c, i) => (
          <GlassCard key={i} style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--gradient-aurora)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,215,64,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-award" style={{ color: 'var(--aurora-amber)', fontSize: '1.25rem' }}></i>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{c.id}</div>
                <div style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(0,229,255,0.1)', fontSize: '0.65rem', color: 'var(--aurora-cyan)', display: 'inline-block' }}>{c.type}</div>
              </div>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '8px' }}>{c.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>Issued: {c.date}</p>
            <MagneticButton size="sm" variant="secondary">
              <i className="bi bi-download" style={{ marginRight: '6px' }}></i>Download
            </MagneticButton>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
