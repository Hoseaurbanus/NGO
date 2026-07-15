import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'

export default function Terms() {
  return (
    <>
      <Helmet><title>Terms of Service - [Your Organization Name]</title></Helmet>
      <AuroraBackground intensity="light">
        <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <KineticText text="Terms of Service" tag="h1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)' }} />
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: '60px 0 120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>1. Acceptance of Terms</h2>
          <p>By accessing and using the [Your Organization Name] website, you accept and agree to be bound by these Terms of Service.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>2. Use of Website</h2>
          <p>You may use our website for lawful purposes only. You agree not to use the site in any way that could damage, disable, or impair the site.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>3. Donations</h2>
          <p>All donations are final and non-refundable unless otherwise required by law. [Your Organization Name] reserves the right to decline any donation.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>4. Intellectual Property</h2>
          <p>All content on this website, including text, graphics, logos, and images, is the property of [Your Organization Name] and is protected by copyright laws.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>5. Limitation of Liability</h2>
          <p>[Your Organization Name] shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>6. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
          <p style={{ marginTop: '32px', fontSize: '0.85rem' }}>Last updated: July 2026</p>
        </div>
      </section>
    </>
  )
}
