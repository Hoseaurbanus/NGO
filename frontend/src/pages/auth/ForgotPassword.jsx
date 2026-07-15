import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import { ROUTES } from '@constants'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <>
      <Helmet><title>Forgot Password - NGO</title></Helmet>
      <AuroraBackground intensity="normal">
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
          <GlassCard glow style={{ padding: '40px', width: '100%', maxWidth: '440px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'white' }}>SF</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>Forgot Password?</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Enter your email and we'll send you a reset link.</p>
            </div>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <i className="bi bi-check-circle" style={{ fontSize: '3rem', color: 'var(--aurora-emerald)', marginBottom: '16px', display: 'block' }}></i>
                <p style={{ color: 'var(--text-secondary)' }}>Check your email for the reset link.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.95rem', outline: 'none', marginBottom: '24px' }} />
                <MagneticButton style={{ width: '100%' }}>Send Reset Link</MagneticButton>
              </form>
            )}
            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Link to={ROUTES.LOGIN} style={{ color: 'var(--aurora-cyan)' }}>Back to Login</Link>
            </p>
          </GlassCard>
        </div>
      </AuroraBackground>
    </>
  )
}
