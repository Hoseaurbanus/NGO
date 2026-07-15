import { useState } from 'react'
import AuroraBackground from '@components/ui/AuroraBackground'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import ScrollReveal from '@components/ui/ScrollReveal'
import { formatCurrency } from '@utils/helpers'

const amounts = [25, 50, 100, 250, 500, 1000]
const impacts = {
  25: 'Supports a small initiative',
  50: 'Provides essential supplies',
  100: 'Funds a local program',
  250: 'Sponsors a training',
  500: 'Supports a major project',
  1000: 'Funds comprehensive work',
}

export default function DonationCTA() {
  const [selected, setSelected] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  const currentAmount = isCustom ? Number(customAmount) || 0 : selected

  return (
    <AuroraBackground intensity="normal">
      <section className="donation-section" style={{ padding: '120px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <GlassCard glow className="donation-card" style={{
              padding: '48px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'var(--gradient-aurora)',
              }} />

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--aurora-cyan)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Make a Difference
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                marginBottom: '12px',
              }}>
                Your Donation Changes Lives
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                marginBottom: '32px',
                maxWidth: '500px',
                margin: '0 auto 32px',
              }}>
                Every dollar you give directly impacts communities worldwide. Choose an amount to see your impact.
              </p>

              <div className="donation-amounts" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
                gap: '12px',
                marginBottom: '24px',
              }}>
                {amounts.map(amount => (
                  <button
                    key={amount}
                    onClick={() => { setSelected(amount); setIsCustom(false) }}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${selected === amount && !isCustom ? 'var(--aurora-cyan)' : 'var(--glass-border)'}`,
                      background: selected === amount && !isCustom ? 'rgba(0, 229, 255, 0.1)' : 'var(--glass-bg)',
                      color: 'white',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s var(--ease-smooth)',
                    }}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setIsCustom(true) }}
                  onFocus={() => setIsCustom(true)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${isCustom ? 'var(--aurora-cyan)' : 'var(--glass-border)'}`,
                    background: 'var(--glass-bg)',
                    color: 'white',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                />
              </div>

              {currentAmount > 0 && impacts[selected] && !isCustom && (
                <div style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 230, 118, 0.1)',
                  border: '1px solid rgba(0, 230, 118, 0.2)',
                  marginBottom: '24px',
                  fontSize: '0.9rem',
                  color: 'var(--aurora-emerald)',
                }}>
                  <i className="bi bi-check-circle-fill" style={{ marginRight: '8px' }}></i>
                  {impacts[selected]}
                </div>
              )}

              <MagneticButton size="lg">
                <i className="bi bi-heart-fill" style={{ marginRight: '8px' }}></i>
                Donate {currentAmount > 0 ? formatCurrency(currentAmount) : 'Now'}
              </MagneticButton>

              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                marginTop: '16px',
              }}>
                Secure payment · Tax deductible · Instant receipt
              </p>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </AuroraBackground>
  )
}
