import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import ScrollReveal from '@components/ui/ScrollReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  return (
    <>
      <Helmet><title>Contact - NGO</title><meta name="description" content="Get in touch with NGO. We'd love to hear from you." /></Helmet>
      <AuroraBackground intensity="light">
        <div className="page-hero-inner" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: 'clamp(80px, 15vw, 120px) 24px clamp(60px, 10vw, 80px)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Contact</div>
            <KineticText text="Let's Connect" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem' }}>Have a question, suggestion, or want to get involved? We'd love to hear from you.</p>
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: 'clamp(60px, 10vw, 96px) 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <GlassCard style={{ padding: 'clamp(24px, 5vw, 36px)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <i className="bi bi-check-circle" style={{ fontSize: '3rem', color: 'var(--aurora-emerald)', marginBottom: '16px', display: 'block' }}></i>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '20px' }}>Send a Message</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <input placeholder="Your Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '1rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                    <input placeholder="Email *" required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '1rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                  </div>
                  <input placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} style={{ marginBottom: '16px', width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '1rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                  <textarea placeholder="Your Message *" required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{ marginBottom: '24px', resize: 'vertical', width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '1rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                  <MagneticButton style={{ width: '100%' }}>Send Message</MagneticButton>
                </form>
              )}
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
