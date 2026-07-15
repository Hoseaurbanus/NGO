import { useAuth } from '@contexts/AuthContext'
import GlassCard from '@components/ui/GlassCard'
import CountUp from '@components/ui/CountUp'

const stats = [
  { label: 'Total Donations', value: 2750, prefix: '$', icon: 'bi-heart', color: '#00E676' },
  { label: 'Events Attended', value: 8, icon: 'bi-calendar3', color: '#00E5FF' },
  { label: 'Hours Volunteered', value: 120, icon: 'bi-clock', color: '#536DFE' },
  { label: 'Certificates', value: 4, icon: 'bi-award', color: '#FFD740' },
]

const recentActivity = [
  { action: 'Donated $100 to Education Fund', date: '2026-07-14', icon: 'bi-heart', color: '#00E676' },
  { action: 'Registered for Global Education Summit', date: '2026-07-12', icon: 'bi-calendar3', color: '#00E5FF' },
  { action: 'Volunteered at Community Health Workshop', date: '2026-07-10', icon: 'bi-people', color: '#536DFE' },
  { action: 'Downloaded Annual Report 2025', date: '2026-07-08', icon: 'bi-download', color: '#FFD740' },
  { action: 'Completed volunteer training module', date: '2026-07-05', icon: 'bi-check-circle', color: '#00E676' },
]

export default function PortalDashboard() {
  const { user } = useAuth()

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '4px' }}>Welcome back, {user?.name || 'User'}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Here's your activity overview.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {stats.map(s => (
          <GlassCard key={s.label} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</span>
              <i className={`bi ${s.icon}`} style={{ color: s.color }}></i>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              <CountUp end={s.value} prefix={s.prefix || ''} />
            </div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <GlassCard style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '16px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--glass-bg)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={`bi ${a.icon}`} style={{ color: a.color, fontSize: '0.9rem' }}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem' }}>{a.action}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '16px' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Make a Donation', icon: 'bi-heart', path: '/donate' },
              { label: 'Browse Events', icon: 'bi-calendar3', path: '/events' },
              { label: 'Volunteer Programs', icon: 'bi-people', path: '/volunteer' },
              { label: 'Download Reports', icon: 'bi-file-earmark-pdf', path: '/media' },
            ].map(action => (
              <a key={action.label} href={action.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--glass-bg)', textDecoration: 'none', color: 'var(--text-primary)', transition: 'all 0.2s', fontSize: '0.875rem' }}>
                <i className={`bi ${action.icon}`} style={{ color: 'var(--aurora-cyan)' }}></i>
                {action.label}
              </a>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
