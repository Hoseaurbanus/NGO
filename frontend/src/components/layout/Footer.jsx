import { Link } from 'react-router-dom'
import { ROUTES } from '@constants'
import AuroraDivider from '@components/ui/AuroraDivider'

const footerLinks = {
  'About': [
    { label: 'Our Story', path: ROUTES.ABOUT },
    { label: 'Mission & Vision', path: ROUTES.ABOUT },
  ],
  'Programs': [
    { label: 'Education', path: ROUTES.PROGRAMS },
    { label: 'Healthcare', path: ROUTES.PROGRAMS },
  ],
  'Get Involved': [
    { label: 'Donate', path: ROUTES.DONATE },
    { label: 'Volunteer', path: ROUTES.VOLUNTEER },
    { label: 'Events', path: ROUTES.EVENTS },
  ],
  'Resources': [
    { label: 'Blog', path: ROUTES.BLOG },
    { label: 'Contact', path: ROUTES.CONTACT },
  ],
}

export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Site footer" style={{ background: 'var(--bg-secondary)', paddingTop: '80px' }}>
      <AuroraDivider />
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '60px 24px 40px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '60px',
        }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
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
              }}>NG</div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'white',
              }}>NGO</span>
            </Link>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}>
              Making a Difference. A modern organization dedicated to creating meaningful change.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['twitter', 'facebook', 'instagram', 'linkedin', 'youtube'].map(social => (
                <a
                  key={social}
                  href={`https://${social}.com/yourorg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${social.charAt(0).toUpperCase() + social.slice(1)}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s',
                  }}
                >
                  <i className={`bi bi-${social}`} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>{title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map(link => (
                  <li key={link.label} style={{ marginBottom: '10px' }}>
                    <Link
                      to={link.path}
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <AuroraDivider />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '24px',
          gap: '16px',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} NGO. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to={ROUTES.PRIVACY} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to={ROUTES.TERMS} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
