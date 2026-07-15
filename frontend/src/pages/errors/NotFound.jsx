import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import MagneticButton from '@components/ui/MagneticButton'
import { ROUTES } from '@constants'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 - [Your Organization Name]</title></Helmet>
      <AuroraBackground intensity="heavy">
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1, marginBottom: '16px', background: 'var(--gradient-aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '12px' }}>Page Not Found</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>The page you're looking for doesn't exist or has been moved.</p>
            <Link to={ROUTES.HOME}><MagneticButton>Go Home</MagneticButton></Link>
          </div>
        </div>
      </AuroraBackground>
    </>
  )
}
