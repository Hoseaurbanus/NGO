import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@constants'
import { useAuth } from '@contexts/AuthContext'
import GlassCard from '@components/ui/GlassCard'
import CountUp from '@components/ui/CountUp'
import AuroraBackground from '@components/ui/AuroraBackground'

const sidebarLinks = [
  { label: 'Dashboard', icon: 'bi-grid', path: ROUTES.ADMIN },
  { label: 'Programs', icon: 'bi-folder', path: ROUTES.ADMIN_PROGRAMS },
  { label: 'Projects', icon: 'bi-kanban', path: ROUTES.ADMIN_PROJECTS },
  { label: 'Events', icon: 'bi-calendar3', path: ROUTES.ADMIN_EVENTS },
  { label: 'News', icon: 'bi-newspaper', path: ROUTES.ADMIN_NEWS },
  { label: 'Donations', icon: 'bi-heart', path: ROUTES.ADMIN_DONATIONS },
  { label: 'Volunteers', icon: 'bi-people', path: ROUTES.ADMIN_VOLUNTEERS },
  { label: 'Campaigns', icon: 'bi-megaphone', path: ROUTES.ADMIN_CAMPAIGNS },
  { label: 'Gallery', icon: 'bi-images', path: ROUTES.ADMIN_GALLERY },
  { label: 'Careers', icon: 'bi-briefcase', path: ROUTES.ADMIN_CAREERS },
  { label: 'Messages', icon: 'bi-envelope', path: ROUTES.ADMIN_MESSAGES },
  { label: 'Users', icon: 'bi-person-gear', path: ROUTES.ADMIN_USERS },
  { label: 'Settings', icon: 'bi-gear', path: ROUTES.ADMIN_SETTINGS },
  { label: 'Activity Logs', icon: 'bi-clock-history', path: ROUTES.ADMIN_ACTIVITY_LOGS },
]

const statCards = [
  { label: 'Total Donations', value: 1200000, prefix: '$', icon: 'bi-heart', color: '#00E676' },
  { label: 'Active Volunteers', value: 5000, icon: 'bi-people', color: '#00E5FF' },
  { label: 'Programs', value: 45, icon: 'bi-folder', color: '#536DFE' },
  { label: 'Projects', value: 120, icon: 'bi-kanban', color: '#7C4DFF' },
  { label: 'Events This Month', value: 12, icon: 'bi-calendar3', color: '#FFD740' },
  { label: 'Messages', value: 234, icon: 'bi-envelope', color: '#FF5252' },
]

const recentDonations = [
  { name: 'Name S.', amount: 500, date: '2026-07-14', status: 'Completed' },
  { name: 'Name S.', amount: 250, date: '2026-07-14', status: 'Completed' },
  { name: 'Name S.', amount: 100, date: '2026-07-13', status: 'Pending' },
  { name: 'Name S.', amount: 1000, date: '2026-07-13', status: 'Completed' },
  { name: 'Name S.', amount: 75, date: '2026-07-12', status: 'Completed' },
]

const recentVolunteers = [
  { name: 'Name S.', status: 'Pending', date: '2026-07-14' },
  { name: 'Name S.', status: 'Approved', date: '2026-07-13' },
  { name: 'Name S.', status: 'Pending', date: '2026-07-12' },
  { name: 'Name S.', status: 'Approved', date: '2026-07-11' },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768)
  const location = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setSidebarOpen(false)
      else setSidebarOpen(true)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (window.innerWidth <= 768) setSidebarOpen(false)
  }, [location])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <aside style={{
        width: sidebarOpen ? '260px' : '72px',
        background: 'rgba(15, 22, 41, 0.95)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid var(--glass-border)',
        transition: 'width 0.3s var(--ease-smooth)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        overflow: 'hidden',
      }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--glass-border)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'white', flexShrink: 0 }}>SF</div>
          {sidebarOpen && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap' }}>[Your Organization Name]</span>}
        </div>

        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {sidebarLinks.map(link => (
            <Link key={link.path} to={link.path} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: location.pathname === link.path ? 'var(--aurora-cyan)' : 'var(--text-secondary)', background: location.pathname === link.path ? 'rgba(0,229,255,0.08)' : 'transparent', marginBottom: '2px', transition: 'all 0.2s', fontSize: '0.875rem', whiteSpace: 'nowrap',
            }}>
              <i className={`bi ${link.icon}`} style={{ fontSize: '1.1rem', width: '20px', textAlign: 'center' }}></i>
              {sidebarOpen && link.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
          <button onClick={logout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}>
            <i className="bi bi-box-arrow-left" style={{ fontSize: '1.1rem' }}></i>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: sidebarOpen ? '260px' : '72px', transition: 'margin-left 0.3s var(--ease-smooth)' }} className="admin-main">
        <header style={{ padding: '16px 32px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,14,26,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }} className="admin-header">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.25rem', cursor: 'pointer', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
            <i className={`bi bi-${sidebarOpen ? 'arrow-left' : 'list'}`}></i>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.1rem', cursor: 'pointer', position: 'relative' }}>
              <i className="bi bi-bell"></i>
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>{user?.name?.[0] || 'A'}</div>
              <span style={{ fontSize: '0.85rem' }}>{user?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        <div style={{ padding: '32px' }} className="admin-content">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '8px' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Welcome back, {user?.name || 'Admin'}. Here's what's happening.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px', marginBottom: '32px' }}>
            {statCards.map(card => (
              <GlassCard key={card.label} style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{card.label}</span>
                  <i className={`bi ${card.icon}`} style={{ color: card.color }}></i>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  <CountUp end={card.value} prefix={card.prefix || ''} />
                </div>
              </GlassCard>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '24px' }}>
            <GlassCard style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '16px' }}>Recent Donations</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      {['Name', 'Amount', 'Date', 'Status'].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonations.map((d, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                        <td style={{ padding: '12px', fontSize: '0.875rem' }}>{d.name}</td>
                        <td style={{ padding: '12px', fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--aurora-emerald)' }}>${d.amount}</td>
                        <td style={{ padding: '12px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{d.date}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, background: d.status === 'Completed' ? 'rgba(0,230,118,0.1)' : 'rgba(255,215,64,0.1)', color: d.status === 'Completed' ? 'var(--aurora-emerald)' : 'var(--aurora-amber)' }}>{d.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>

            <GlassCard style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '16px' }}>Recent Volunteers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentVolunteers.map((v, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--glass-bg)' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{v.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.date}</div>
                    </div>
                    <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, background: v.status === 'Approved' ? 'rgba(0,230,118,0.1)' : 'rgba(255,215,64,0.1)', color: v.status === 'Approved' ? 'var(--aurora-emerald)' : 'var(--aurora-amber)' }}>{v.status}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-main { margin-left: 0 !important; }
          .admin-header { padding: 12px 16px !important; }
          .admin-content { padding: 16px !important; }
        }
      `}</style>
    </div>
  )
}
