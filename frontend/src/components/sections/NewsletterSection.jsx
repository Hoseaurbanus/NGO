import { useState } from 'react'
import AuroraBackground from '@components/ui/AuroraBackground'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import ScrollReveal from '@components/ui/ScrollReveal'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <AuroraBackground intensity="light">
      <section style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <GlassCard style={{ padding: '48px', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(0, 229, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <i className="bi bi-envelope" style={{ fontSize: '1.5rem', color: 'var(--aurora-cyan)' }}></i>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                marginBottom: '12px',
              }}>
                Stay Updated
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                marginBottom: '28px',
              }}>
                Get the latest news, impact stories, and updates from NGO delivered to your inbox.
              </p>

              {subscribed ? (
                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 230, 118, 0.1)',
                  border: '1px solid rgba(0, 230, 118, 0.2)',
                  color: 'var(--aurora-emerald)',
                }}>
                  <i className="bi bi-check-circle-fill" style={{ marginRight: '8px' }}></i>
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      minWidth: '200px',
                      padding: '14px 20px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--glass-border)',
                      background: 'var(--glass-bg)',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                  <MagneticButton type="submit">
                    Subscribe
                  </MagneticButton>
                </form>
              )}

              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                marginTop: '16px',
              }}>
                No spam, ever. Unsubscribe anytime.
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </AuroraBackground>
  )
}
