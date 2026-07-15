import { Link } from 'react-router-dom'
import { ROUTES } from '@constants'
import AuroraDivider from '@components/ui/AuroraDivider'

const quickLinks = [
  { label: 'About', path: ROUTES.ABOUT },
  { label: 'Programs', path: ROUTES.PROGRAMS },
  { label: 'Donate', path: ROUTES.DONATE },
  { label: 'Volunteer', path: ROUTES.VOLUNTEER },
  { label: 'Contact', path: ROUTES.CONTACT },
  { label: 'Blog', path: ROUTES.BLOG },
]

export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Site footer" style={{ background: 'var(--bg-secondary)', paddingTop: '60px' }}>
      <AuroraDivider />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '40px 24px 32px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--gradient-aurora)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '14px',
                color: 'white',
              }}>NG</div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'white',
              }}>NGO</span>
            </Link>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              marginBottom: '16px',
            }}>
              Making a difference through community development worldwide.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
                <a
                  key={social}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.charAt(0).toUpperCase() + social.slice(1)}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s var(--ease-smooth)',
                  }}
                >
                  <i className={`bi bi-${social}`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px 24px' }}>
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="link-underline"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      display: 'block',
                      padding: '6px 0',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AuroraDivider />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          gap: '12px',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} NGO. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to={ROUTES.PRIVACY} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to={ROUTES.TERMS} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
