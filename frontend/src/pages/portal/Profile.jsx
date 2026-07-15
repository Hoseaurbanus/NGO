import { useState } from 'react'
import { useAuth } from '@contexts/AuthContext'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'

export default function PortalProfile() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [saved, setSaved] = useState(false)
  const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.95rem', outline: 'none' }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({ ...user, ...form })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '32px' }}>My Profile</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '32px' }}>
        <GlassCard style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--gradient-aurora)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2.5rem', fontWeight: 700 }}>{user?.name?.[0] || 'U'}</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '4px' }}>{user?.name || 'User'}</h3>
          <p style={{ color: 'var(--aurora-cyan)', fontSize: '0.85rem', textTransform: 'capitalize', marginBottom: '8px' }}>{user?.role || 'volunteer'}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{user?.email}</p>
        </GlassCard>

        <GlassCard style={{ padding: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '20px' }}>Edit Profile</h3>
          {saved && <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', color: 'var(--aurora-emerald)', fontSize: '0.85rem', marginBottom: '16px' }}><i className="bi bi-check-circle-fill" style={{ marginRight: '8px' }}></i>Profile updated!</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Full Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Email</label>
              <input type="email" value={form.email} disabled style={{ ...inputStyle, opacity: 0.6 }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Phone</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+1 (555) 000-0000" style={inputStyle} />
            </div>
            <MagneticButton>Save Changes</MagneticButton>
          </form>
        </GlassCard>
      </div>
    </div>
  )
}
