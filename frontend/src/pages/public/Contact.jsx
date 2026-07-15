import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import ScrollReveal from '@components/ui/ScrollReveal'

const contactInfo = [
  { icon: 'bi-geo-alt', label: 'Address', value: '123 Impact Avenue, New York, NY 10001' },
  { icon: 'bi-telephone', label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: 'bi-envelope', label: 'Email', value: 'info@smugflex.org' },
  { icon: 'bi-clock', label: 'Hours', value: 'Mon-Fri 9:00 AM - 6:00 PM EST' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }

  return (
    <>
      <Helmet><title>Contact - SmugFlex</title><meta name="description" content="Get in touch with SmugFlex. We'd love to hear from you." /></Helmet>
      <AuroraBackground intensity="light">
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Contact</div>
            <KineticText text="Let's Connect" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem' }}>Have a question, suggestion, or want to get involved? We'd love to hear from you.</p>
          </div>
        </div>
      </AuroraBackground>
      <section style={{ padding: '60px 0 120px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px' }}>
            <ScrollReveal>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '24px' }}>Get in Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                {contactInfo.map(c => (
                  <div key={c.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,229,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={`bi ${c.icon}`} style={{ color: 'var(--aurora-cyan)' }}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{c.label}</div>
                      <div style={{ fontSize: '0.95rem' }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['twitter', 'facebook', 'instagram', 'linkedin'].map(s => (
                  <a key={s} href="#" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.3s' }}>
                    <i className={`bi bi-${s}`}></i>
                  </a>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <GlassCard style={{ padding: '36px' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <i className="bi bi-check-circle" style={{ fontSize: '3rem', color: 'var(--aurora-emerald)', marginBottom: '16px', display: 'block' }}></i>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '8px' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '20px' }}>Send a Message</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <input placeholder="Your Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
                      <input placeholder="Email *" required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
                    </div>
                    <input placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={{ ...inputStyle, marginBottom: '16px' }} />
                    <textarea placeholder="Your Message *" required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ ...inputStyle, marginBottom: '24px', resize: 'vertical' }} />
                    <MagneticButton style={{ width: '100%' }}>Send Message</MagneticButton>
                  </form>
                )}
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
