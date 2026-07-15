import { useState, useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { ROUTES } from '@constants'
import { useAuth } from '@contexts/AuthContext'

const portalLinks = [
  { label: 'Dashboard', icon: 'bi-grid', path: ROUTES.PORTAL },
  { label: 'Profile', icon: 'bi-person', path: ROUTES.PORTAL_PROFILE },
  { label: 'Notifications', icon: 'bi-bell', path: ROUTES.PORTAL_NOTIFICATIONS },
  { label: 'My Donations', icon: 'bi-heart', path: ROUTES.PORTAL_DONATIONS },
  { label: 'Certificates', icon: 'bi-award', path: ROUTES.PORTAL_CERTIFICATES },
  { label: 'Downloads', icon: 'bi-download', path: ROUTES.PORTAL_DOWNLOADS },
  { label: 'Activities', icon: 'bi-clock-history', path: ROUTES.PORTAL_ACTIVITIES },
]

export default function PortalLayout() {
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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'white', flexShrink: 0 }}>SF</div>
            {sidebarOpen && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'white', whiteSpace: 'nowrap' }}>NGO</span>}
          </Link>
        </div>

        <div style={{ padding: '16px 12px 8px', borderBottom: '1px solid var(--glass-border)' }}>
          {sidebarOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1rem', flexShrink: 0 }}>
                {user?.name?.[0] || 'U'}
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name || 'User'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role || 'volunteer'}</div>
              </div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {portalLinks.map(link => (
            <Link key={link.path} to={link.path} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 'var(--radius-md)', textDecoration: 'none',
              color: location.pathname === link.path ? 'var(--aurora-cyan)' : 'var(--text-secondary)',
              background: location.pathname === link.path ? 'rgba(0,229,255,0.08)' : 'transparent',
              marginBottom: '2px', transition: 'all 0.2s', fontSize: '0.875rem', whiteSpace: 'nowrap',
            }}>
              <i className={`bi ${link.icon}`} style={{ fontSize: '1.1rem', width: '20px', textAlign: 'center' }}></i>
              {sidebarOpen && link.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 8px', borderTop: '1px solid var(--glass-border)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '4px' }}>
            <i className="bi bi-house" style={{ fontSize: '1.1rem', width: '20px', textAlign: 'center' }}></i>
            {sidebarOpen && 'Back to Site'}
          </Link>
          <button onClick={logout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}>
            <i className="bi bi-box-arrow-left" style={{ fontSize: '1.1rem', width: '20px', textAlign: 'center' }}></i>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: sidebarOpen ? '260px' : '72px', transition: 'margin-left 0.3s var(--ease-smooth)', minHeight: '100vh' }} className="portal-main">
        <header style={{ padding: '16px 32px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,14,26,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }} className="portal-header">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.25rem', cursor: 'pointer', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
            <i className={`bi bi-${sidebarOpen ? 'arrow-left' : 'list'}`}></i>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.1rem', cursor: 'pointer', position: 'relative' }}>
              <i className="bi bi-bell"></i>
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></span>
            </button>
          </div>
        </header>
        <div style={{ padding: '32px' }} className="portal-content">
          <Outlet />
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .portal-main { margin-left: 0 !important; }
          .portal-header { padding: 12px 16px !important; }
          .portal-content { padding: 16px !important; }
        }
      `}</style>
    </div>
  )
}
