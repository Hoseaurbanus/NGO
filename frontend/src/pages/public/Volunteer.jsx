import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import ScrollReveal from '@components/ui/ScrollReveal'

export default function Volunteer() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', skills: '', availability: '', experience: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }
  const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '1rem', outline: 'none', fontFamily: 'var(--font-body)' }

  return (
    <>
      <Helmet><title>Volunteer - NGO</title><meta name="description" content="Join our global community of volunteers and make a real difference." /></Helmet>
      <AuroraBackground intensity="light">
        <div className="page-hero-inner" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: 'clamp(80px, 15vw, 120px) 24px clamp(60px, 10vw, 80px)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Get Involved</div>
            <KineticText text="Become a Volunteer" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>Join volunteers worldwide making a tangible impact in communities.</p>
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: 'clamp(60px, 10vw, 80px) 0 clamp(80px, 15vw, 120px)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <GlassCard style={{ padding: '40px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,230,118,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <i className="bi bi-check-lg" style={{ fontSize: '2rem', color: 'var(--aurora-emerald)' }}></i>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>Application Submitted!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>We'll review your application and get back to you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '24px' }}>Volunteer Application</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <input placeholder="Full Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
                    <input placeholder="Email *" required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
                  </div>
                  <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ ...inputStyle, marginBottom: '16px' }} />
                  <select value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} style={{ ...inputStyle, marginBottom: '16px', color: form.skills ? 'white' : 'var(--text-muted)' }}>
                    <option value="">Select Skills</option>
                    <option>Teaching</option><option>Healthcare</option><option>Engineering</option><option>IT/Technology</option><option>Languages</option><option>Management</option><option>Other</option>
                  </select>
                  <select value={form.availability} onChange={e => setForm({...form, availability: e.target.value})} style={{ ...inputStyle, marginBottom: '16px', color: form.availability ? 'white' : 'var(--text-muted)' }}>
                    <option value="">Availability</option>
                    <option>Full-time</option><option>Part-time</option><option>Weekends Only</option><option>Remote Only</option>
                  </select>
                  <textarea placeholder="Tell us about your experience..." rows={4} value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} style={{ ...inputStyle, marginBottom: '24px', resize: 'vertical' }} />
                  <MagneticButton style={{ width: '100%' }}>Submit Application</MagneticButton>
                </form>
              )}
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
