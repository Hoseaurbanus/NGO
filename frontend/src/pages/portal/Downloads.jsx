import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'

const downloads = [
  { name: 'Annual Report 2025', type: 'PDF', size: '4.2 MB', date: '2026-06-28', icon: 'bi-file-earmark-pdf' },
  { name: 'Education Program Brochure', type: 'PDF', size: '2.1 MB', date: '2026-05-15', icon: 'bi-file-earmark-pdf' },
  { name: 'Volunteer Handbook', type: 'PDF', size: '1.8 MB', date: '2026-04-10', icon: 'bi-file-earmark-pdf' },
  { name: 'Impact Infographic 2025', type: 'PNG', size: '3.5 MB', date: '2026-03-20', icon: 'bi-file-earmark-image' },
  { name: 'Quarterly Newsletter Q1', type: 'PDF', size: '1.2 MB', date: '2026-03-01', icon: 'bi-file-earmark-pdf' },
  { name: 'Tax Receipt 2025', type: 'PDF', size: '0.3 MB', date: '2026-01-31', icon: 'bi-file-earmark-pdf' },
]

export default function PortalDownloads() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '8px' }}>Downloads</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Reports, brochures, and documents available for download.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {downloads.map((d, i) => (
          <GlassCard key={i} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: d.type === 'PDF' ? 'rgba(255,82,82,0.1)' : 'rgba(0,229,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className={`bi ${d.icon}`} style={{ color: d.type === 'PDF' ? '#FF5252' : 'var(--aurora-cyan)' }}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{d.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d.type} · {d.size} · {d.date}</div>
            </div>
            <MagneticButton size="sm" variant="ghost">
              <i className="bi bi-download"></i>
            </MagneticButton>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
