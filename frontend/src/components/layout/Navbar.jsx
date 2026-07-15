import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@constants'
import { useAuth } from '@contexts/AuthContext'
import MagneticButton from '@components/ui/MagneticButton'

const navLinks = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'About', path: ROUTES.ABOUT },
  { label: 'Programs', path: ROUTES.PROGRAMS },
  { label: 'Projects', path: ROUTES.PROJECTS },
  { label: 'Events', path: ROUTES.EVENTS },
  { label: 'Blog', path: ROUTES.BLOG },
  { label: 'Contact', path: ROUTES.CONTACT },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()
  const lastFocusedRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
    lastFocusedRef.current?.focus()
  }, [])

  useEffect(() => {
    if (mobileOpen) closeMobileMenu()
  }, [location, closeMobileMenu, mobileOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileOpen) closeMobileMenu()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileOpen, closeMobileMenu])

  const openMobileMenu = useCallback(() => {
    lastFocusedRef.current = document.activeElement
    setMobileOpen(true)
    document.body.style.overflow = 'hidden'
    setTimeout(() => mobileMenuRef.current?.focus(), 50)
  }, [])

  const handleMobileKeyDown = useCallback((e) => {
    if (!mobileOpen) return
    if (e.key === 'Escape') {
      e.preventDefault()
      closeMobileMenu()
    } else if (e.key === 'Tab') {
      const focusable = mobileMenuRef.current?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable?.length) {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
  }, [mobileOpen, closeMobileMenu])

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener('keydown', handleMobileKeyDown)
      return () => document.removeEventListener('keydown', handleMobileKeyDown)
    }
  }, [mobileOpen, handleMobileKeyDown])

  return (
    <>
      <nav role="navigation" aria-label="Main navigation">
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(10, 14, 26, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'all 0.4s var(--ease-smooth)',
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'var(--gradient-aurora)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '16px',
                color: 'white',
                flexShrink: 0,
              }}>NG</div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'white',
              }}>NGO</span>
            </Link>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}>
              <div className="desktop-nav" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
              }}>
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                    style={{
                      color: location.pathname === link.path ? 'var(--aurora-cyan)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      transition: 'color 0.3s',
                      position: 'relative',
                    }}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <span style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--gradient-aurora)',
                        borderRadius: '1px',
                      }} />
                    )}
                  </Link>
                ))}
              </div>

              <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link to={ROUTES.DONATE}>
                  <MagneticButton size="sm">Donate</MagneticButton>
                </Link>
                {user ? (
                  <Link to={user.role === 'super_admin' || user.role === 'admin' ? ROUTES.ADMIN : ROUTES.PORTAL}>
                    <MagneticButton size="sm" variant="secondary">Dashboard</MagneticButton>
                  </Link>
                ) : (
                  <Link to={ROUTES.LOGIN}>
                    <MagneticButton size="sm" variant="ghost">Login</MagneticButton>
                  </Link>
                )}
              </div>
            </div>

            <button
              className="mobile-menu-btn"
              onClick={openMobileMenu}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                zIndex: 1001,
                minWidth: '44px',
                minHeight: '44px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                width: '24px',
                height: '18px',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'white',
                  borderRadius: '1px',
                  top: '0',
                }} />
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '8px',
                  width: '100%',
                  height: '2px',
                  background: 'white',
                  borderRadius: '1px',
                }} />
                <span style={{
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'white',
                  borderRadius: '1px',
                  top: '16px',
                }} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="mobile-menu"
        tabIndex={-1}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1002,
          background: 'rgba(10, 14, 26, 0.98)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '80px 24px 24px',
          overflowY: 'auto',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'all 0.4s var(--ease-smooth)',
        }}
      >
        <button
          onClick={closeMobileMenu}
          className="mobile-close-btn"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close menu"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeMobileMenu}
            aria-current={location.pathname === link.path ? 'page' : undefined}
            style={{
              color: location.pathname === link.path ? 'var(--aurora-cyan)' : 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s var(--ease-smooth) ${i * 0.05}s`,
              minHeight: '56px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px', width: '100%', maxWidth: '400px' }}>
          <Link to={ROUTES.DONATE} onClick={closeMobileMenu}>
            <MagneticButton style={{ minHeight: '56px', width: '100%' }}>Donate Now</MagneticButton>
          </Link>
          <Link to={ROUTES.LOGIN} onClick={closeMobileMenu}>
            <MagneticButton variant="ghost" style={{ minHeight: '56px', width: '100%' }}>Login</MagneticButton>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 576px) {
          .mobile-menu a { font-size: 1.2rem !important; }
        }
      `}</style>
    </>
  )
}
