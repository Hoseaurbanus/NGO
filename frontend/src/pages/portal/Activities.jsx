import GlassCard from '@components/ui/GlassCard'

const activities = [
  { action: 'Donated to a campaign', date: '2026-07-14 14:30', icon: 'bi-heart', color: '#00E676', type: 'Donation' },
  { action: 'Registered for an event', date: '2026-07-12 09:15', icon: 'bi-calendar3', color: '#00E5FF', type: 'Event' },
  { action: 'Volunteered at a workshop', date: '2026-07-10 08:00', icon: 'bi-people', color: '#536DFE', type: 'Volunteer' },
  { action: 'Downloaded a report', date: '2026-07-08 16:45', icon: 'bi-download', color: '#FFD740', type: 'Download' },
  { action: 'Completed training module', date: '2026-07-05 11:20', icon: 'bi-check-circle', color: '#00E676', type: 'Training' },
  { action: 'Subscribed to newsletter', date: '2026-07-01 10:00', icon: 'bi-envelope', color: '#7C4DFF', type: 'Newsletter' },
  { action: 'Donated to a campaign', date: '2026-06-20 13:10', icon: 'bi-heart', color: '#00E676', type: 'Donation' },
  { action: 'Attended an event', date: '2026-06-05 19:00', icon: 'bi-calendar-event', color: '#00E5FF', type: 'Event' },
]

const typeColors = { Donation: '#00E676', Event: '#00E5FF', Volunteer: '#536DFE', Download: '#FFD740', Training: '#00E676', Newsletter: '#7C4DFF' }

export default function PortalActivities() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '8px' }}>Activity History</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>A complete timeline of your interactions with NGO.</p>
      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        <div style={{ position: 'absolute', left: '11px', top: '8px', bottom: '8px', width: '2px', background: 'var(--glass-border)' }} />
        {activities.map((a, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: '24px', paddingLeft: '24px' }}>
            <div style={{ position: 'absolute', left: '-13px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: typeColors[a.type], border: '2px solid var(--bg-primary)' }} />
            <GlassCard style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{a.action}</div>
                <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', background: `${typeColors[a.type]}15`, fontSize: '0.65rem', color: typeColors[a.type], flexShrink: 0, marginLeft: '8px' }}>{a.type}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.date}</div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  )
}
