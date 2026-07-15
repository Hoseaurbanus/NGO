import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import { useAuth } from '@contexts/AuthContext'
import { ROUTES } from '@constants'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      navigate(user.role === 'super_admin' || user.role === 'admin' ? ROUTES.ADMIN : ROUTES.PORTAL)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Login - SmugFlex</title></Helmet>
      <AuroraBackground intensity="normal">
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
          <div style={{ width: '100%', maxWidth: '460px' }}>
            <GlassCard glow style={{ padding: '40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'var(--gradient-aurora)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'white' }}>SF</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '8px', fontWeight: 700 }}>Welcome Back</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sign in to your SmugFlex account</p>
              </div>

              {error && (
                <div style={{
                  padding: '12px 16px', borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.2)',
                  color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <i className="bi bi-exclamation-circle"></i> {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-envelope" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      aria-label="Email address"
                      style={{ width: '100%', padding: '14px 16px 14px 42px' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-lock" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      aria-label="Password"
                      style={{ width: '100%', padding: '14px 48px 14px 42px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      style={{
                        position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                        padding: '4px', fontSize: '1rem',
                      }}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--aurora-cyan)' }}
                    />
                    Remember me
                  </label>
                  <Link to={ROUTES.FORGOT_PASSWORD} style={{ color: 'var(--aurora-cyan)', fontSize: '0.85rem', fontWeight: 500 }}>
                    Forgot password?
                  </Link>
                </div>

                <MagneticButton style={{ width: '100%', padding: '16px' }} disabled={loading}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <i className="bi bi-arrow-repeat" style={{ animation: 'spin-slow 1s linear infinite' }}></i>
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </MagneticButton>
              </form>

              <div style={{ marginTop: '28px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Don't have an account? <Link to={ROUTES.REGISTER} style={{ color: 'var(--aurora-cyan)', fontWeight: 600 }}>Sign Up</Link>
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </AuroraBackground>
    </>
  )
}
