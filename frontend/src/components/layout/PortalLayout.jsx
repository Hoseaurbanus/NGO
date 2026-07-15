import { useState, useEffect, useCallback } from 'react'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth > 992 : true
  )
  const location = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 992)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
    document.body.style.overflow = ''
  }, [])

  const openSidebar = useCallback(() => {
    setSidebarOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    closeSidebar()
  }, [location.pathname, closeSidebar])

  useEffect(() => {
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && sidebarOpen) closeSidebar()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen, closeSidebar])

  return (
    <div className="portal-layout">
      <div
        className={`portal-backdrop${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside
        className={`portal-sidebar${sidebarOpen ? ' open' : ''}`}
        aria-label="Portal navigation"
      >
        <div className="portal-sidebar-header">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'white', flexShrink: 0 }}>NG</div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'white', whiteSpace: 'nowrap' }}>NGO</span>
          </Link>
          {!isDesktop && (
            <button onClick={closeSidebar} className="portal-sidebar-btn" aria-label="Close sidebar">
              <i className="bi bi-x-lg" style={{ fontSize: '1.25rem' }}></i>
            </button>
          )}
        </div>

        <div className="portal-sidebar-user">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1rem', flexShrink: 0 }}>
              {user?.name?.[0] || 'U'}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'User'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role || 'volunteer'}</div>
            </div>
          </div>
        </div>

        <nav className="portal-sidebar-nav" aria-label="Portal navigation">
          {portalLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`portal-sidebar-link${location.pathname === link.path ? ' active' : ''}`}
            >
              <i className={`bi ${link.icon}`} style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center', flexShrink: 0 }}></i>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="portal-sidebar-footer">
          <Link to="/" className="portal-sidebar-link">
            <i className="bi bi-house" style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}></i>
            Back to Site
          </Link>
          <button onClick={logout} className="portal-sidebar-link" style={{ width: '100%', border: 'none', background: 'none', fontFamily: 'inherit', color: 'inherit', fontSize: 'inherit' }}>
            <i className="bi bi-box-arrow-left" style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}></i>
            Logout
          </button>
        </div>
      </aside>

      <main className="portal-main">
        <header className="portal-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!isDesktop && (
              <button onClick={openSidebar} className="portal-sidebar-btn" aria-label="Open sidebar">
                <i className="bi bi-list" style={{ fontSize: '1.25rem' }}></i>
              </button>
            )}
          </div>
          <div className="portal-header-actions">
            <button className="portal-sidebar-btn" style={{ position: 'relative' }}>
              <i className="bi bi-bell" style={{ fontSize: '1.1rem' }}></i>
              <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></span>
            </button>
          </div>
        </header>
        <div className="portal-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
