import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import { useAuth } from '@contexts/AuthContext'
import { ROUTES } from '@constants'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
  const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.95rem', outline: 'none' }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    setError('')
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      navigate(ROUTES.PORTAL)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Register - SmugFlex</title></Helmet>
      <AuroraBackground intensity="normal">
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
          <GlassCard glow style={{ padding: '40px', width: '100%', maxWidth: '440px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'white' }}>SF</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>Create Account</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join the SmugFlex community</p>
            </div>
            {error && <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.2)', color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '16px' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <input placeholder="Full Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ ...inputStyle, marginBottom: '16px' }} />
              <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ ...inputStyle, marginBottom: '16px' }} />
              <input type="password" placeholder="Password" required minLength={8} value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ ...inputStyle, marginBottom: '16px' }} />
              <input type="password" placeholder="Confirm Password" required value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} style={{ ...inputStyle, marginBottom: '24px' }} />
              <MagneticButton style={{ width: '100%' }} disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</MagneticButton>
            </form>
            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Already have an account? <Link to={ROUTES.LOGIN} style={{ color: 'var(--aurora-cyan)' }}>Sign In</Link>
            </p>
          </GlassCard>
        </div>
      </AuroraBackground>
    </>
  )
}
