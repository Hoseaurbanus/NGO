import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import ScrollReveal from '@components/ui/ScrollReveal'

const amounts = [25, 50, 100, 250, 500, 1000]
const impacts = { 25: 'Supports a small initiative', 50: 'Provides essential supplies', 100: 'Funds a local program', 250: 'Sponsors a training', 500: 'Supports a major project', 1000: 'Funds comprehensive work' }

export default function Donate() {
  const [selected, setSelected] = useState(100)
  const [custom, setCustom] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  return (
    <>
      <Helmet><title>Donate - NGO</title><meta name="description" content="Your donation changes lives. Support NGO's mission to transform communities worldwide." /></Helmet>
      <AuroraBackground intensity="normal">
        <div className="page-hero-inner" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: 'clamp(80px, 15vw, 120px) 24px clamp(60px, 10vw, 80px)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Make a Difference</div>
            <KineticText text="Your Generosity Changes Lives" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>Every dollar you give directly impacts communities. Choose an amount to see your impact.</p>
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: 'clamp(48px, 8vw, 80px) 0 clamp(48px, 8vw, 80px)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <GlassCard glow style={{ padding: 'clamp(24px, 5vw, 48px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))', gap: '12px', marginBottom: '24px' }}>
                {amounts.map(a => (
                  <button key={a} onClick={() => { setSelected(a); setIsCustom(false) }} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: `2px solid ${selected === a && !isCustom ? 'var(--aurora-cyan)' : 'var(--glass-border)'}`, background: selected === a && !isCustom ? 'rgba(0,229,255,0.1)' : 'var(--glass-bg)', color: 'white', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>${a}</button>
                ))}
              </div>
              <input type="number" placeholder="Custom amount ($)" value={custom} onChange={e => { setCustom(e.target.value); setIsCustom(true) }} onFocus={() => setIsCustom(true)} style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-md)', border: `2px solid ${isCustom ? 'var(--aurora-cyan)' : 'var(--glass-border)'}`, background: 'var(--glass-bg)', color: 'white', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', textAlign: 'center', outline: 'none', marginBottom: '20px' }} />
              {!isCustom && impacts[selected] && (
                <div style={{ padding: '12px 20px', borderRadius: 'var(--radius-md)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', marginBottom: '24px', fontSize: '0.9rem', color: 'var(--aurora-emerald)' }}>
                  <i className="bi bi-check-circle-fill" style={{ marginRight: '8px' }}></i>{impacts[selected]}
                </div>
              )}
              <MagneticButton size="lg" style={{ width: '100%' }}>
                <i className="bi bi-heart-fill" style={{ marginRight: '8px' }}></i>Donate ${isCustom ? custom || '0' : selected}
              </MagneticButton>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))', gap: '16px', marginTop: '32px' }}>
                {[{ icon: 'bi-shield-check', label: 'Secure Payment' }, { icon: 'bi-receipt', label: 'Instant Receipt' }, { icon: 'bi-clock-history', label: 'Recurring Options' }].map(f => (
                  <div key={f.label} style={{ textAlign: 'center' }}>
                    <i className={`bi ${f.icon}`} style={{ fontSize: '1.25rem', color: 'var(--aurora-cyan)', marginBottom: '8px', display: 'block' }}></i>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
