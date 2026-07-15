import { useState } from 'react'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    site_name: 'SmugFlex',
    site_tagline: 'Impact. Redefined.',
    site_email: 'info@smugflex.org',
    site_phone: '+1 (555) 123-4567',
    site_address: '123 Impact Avenue, New York, NY 10001',
    currency: 'USD',
    donation_goal: '500000',
  })
  const [saved, setSaved] = useState(false)
  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.9rem', outline: 'none' }

  const handleSubmit = (e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000) }

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '24px' }}>Website Settings</h2>
      {saved && <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', color: 'var(--aurora-emerald)', fontSize: '0.85rem', marginBottom: '16px' }}><i className="bi bi-check-circle-fill" style={{ marginRight: '8px' }}></i>Settings saved!</div>}
      <form onSubmit={handleSubmit}>
        <GlassCard style={{ padding: '32px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px' }}>General</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Site Name</label><input value={settings.site_name} onChange={e => setSettings({...settings, site_name: e.target.value})} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Tagline</label><input value={settings.site_tagline} onChange={e => setSettings({...settings, site_tagline: e.target.value})} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Email</label><input type="email" value={settings.site_email} onChange={e => setSettings({...settings, site_email: e.target.value})} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Phone</label><input value={settings.site_phone} onChange={e => setSettings({...settings, site_phone: e.target.value})} style={inputStyle} /></div>
          </div>
          <div style={{ marginTop: '16px' }}><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Address</label><input value={settings.site_address} onChange={e => setSettings({...settings, site_address: e.target.value})} style={inputStyle} /></div>
        </GlassCard>
        <GlassCard style={{ padding: '32px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '20px' }}>Donations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Currency</label><input value={settings.currency} onChange={e => setSettings({...settings, currency: e.target.value})} style={inputStyle} /></div>
            <div><label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Donation Goal ($)</label><input type="number" value={settings.donation_goal} onChange={e => setSettings({...settings, donation_goal: e.target.value})} style={inputStyle} /></div>
          </div>
        </GlassCard>
        <MagneticButton>Save Settings</MagneticButton>
      </form>
    </div>
  )
}
