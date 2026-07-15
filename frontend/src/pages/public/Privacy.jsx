import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'

export default function Privacy() {
  return (
    <>
      <Helmet><title>Privacy Policy - [Your Organization Name]</title></Helmet>
      <AuroraBackground intensity="light">
        <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <KineticText text="Privacy Policy" tag="h1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)' }} />
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: '60px 0 120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>1. Information We Collect</h2>
          <p>We collect personal information you provide directly, such as name, email, phone number, and payment information when you donate, volunteer, or contact us.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>2. How We Use Your Information</h2>
          <p>We use your information to process donations, communicate with you about our programs, send newsletters (with your consent), and improve our services.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>3. Data Protection</h2>
          <p>We implement industry-standard security measures to protect your personal information. We do not sell or share your data with third parties for marketing purposes.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>4. Cookies</h2>
          <p>Our website uses essential cookies to ensure functionality. We may use analytics cookies to understand how visitors interact with our site.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@yourorg.org to exercise these rights.</p>
          <h2 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '32px 0 12px' }}>6. Contact</h2>
          <p>For privacy-related inquiries, contact us at privacy@yourorg.org or write to: [Your Organization Name] Privacy Team, 123 Main Street, City, Country.</p>
          <p style={{ marginTop: '32px', fontSize: '0.85rem' }}>Last updated: July 2026</p>
        </div>
      </section>
    </>
  )
}
