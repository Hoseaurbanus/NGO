import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import { useAuth } from '@contexts/AuthContext'
import { ROUTES } from '@constants'

const roles = [
  { value: 'volunteer', label: 'Volunteer', icon: 'bi-people' },
  { value: 'member', label: 'Community Member', icon: 'bi-person' },
]

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'volunteer' })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const passwordChecks = [
    { label: 'At least 8 characters', test: form.password.length >= 8 },
    { label: 'Contains a number', test: /\d/.test(form.password) },
    { label: 'Contains a letter', test: /[a-zA-Z]/.test(form.password) },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (!agreed) { setError('Please agree to the terms'); return }
    setError('')
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: form.role })
      navigate(ROUTES.PORTAL)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Register - NGO</title></Helmet>
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
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '8px', fontWeight: 700 }}>Create Account</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join the NGO community</p>
              </div>

              {error && (
                <div role="alert" style={{
                  padding: '12px 16px', borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.2)',
                  color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <i className="bi bi-exclamation-circle" aria-hidden="true"></i> {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-person" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                    <input
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      aria-label="Full name"
                      style={{ width: '100%', padding: '14px 16px 14px 42px' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-envelope" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      aria-label="Email address"
                      style={{ width: '100%', padding: '14px 16px 14px 42px' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>I want to</label>
                  <div role="radiogroup" aria-label="Select your role" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {roles.map(r => (
                      <button
                        key={r.value}
                        type="button"
                        role="radio"
                        aria-checked={form.role === r.value}
                        onClick={() => setForm({...form, role: r.value})}
                        style={{
                          padding: '12px', borderRadius: 'var(--radius-md)',
                          border: `2px solid ${form.role === r.value ? 'var(--aurora-cyan)' : 'var(--glass-border)'}`,
                          background: form.role === r.value ? 'rgba(0,229,255,0.08)' : 'var(--glass-bg)',
                          color: form.role === r.value ? 'var(--aurora-cyan)' : 'var(--text-secondary)',
                          cursor: 'pointer', transition: 'all 0.3s',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          fontSize: '0.85rem', fontFamily: 'var(--font-body)',
                        }}
                      >
                        <i className={`bi ${r.icon}`}></i> {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-lock" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={e => setForm({...form, password: e.target.value})}
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
                  {form.password && (
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {passwordChecks.map(check => (
                        <div key={check.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: check.test ? 'var(--aurora-emerald)' : 'var(--text-muted)' }}>
                          <i className={`bi ${check.test ? 'bi-check-circle-fill' : 'bi-circle'}`} style={{ fontSize: '0.65rem' }}></i>
                          {check.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <i className="bi bi-lock-fill" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem' }}></i>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      required
                      autoComplete="new-password"
                      value={form.confirm}
                      onChange={e => setForm({...form, confirm: e.target.value})}
                      aria-label="Confirm password"
                      style={{ width: '100%', padding: '14px 16px 14px 42px' }}
                    />
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: 'var(--aurora-cyan)', flexShrink: 0 }}
                  />
                  <span>I agree to the <Link to={ROUTES.TERMS} style={{ color: 'var(--aurora-cyan)' }}>Terms of Service</Link> and <Link to={ROUTES.PRIVACY} style={{ color: 'var(--aurora-cyan)' }}>Privacy Policy</Link></span>
                </label>

                <MagneticButton style={{ width: '100%', padding: '16px' }} disabled={loading}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <i className="bi bi-arrow-repeat" style={{ animation: 'spin-slow 1s linear infinite' }}></i>
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </MagneticButton>
              </form>

              <div style={{ marginTop: '28px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Already have an account? <Link to={ROUTES.LOGIN} style={{ color: 'var(--aurora-cyan)', fontWeight: 600 }}>Sign In</Link>
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </AuroraBackground>
    </>
  )
}
