import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - NGO</title>
        <meta name="description" content="Learn about NGO's mission, vision, and the impact we create." />
      </Helmet>

      <AuroraBackground intensity="light">
        <div className="page-hero-inner" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: 'clamp(80px, 15vw, 120px) 24px clamp(60px, 10vw, 80px)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--aurora-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>About Us</div>
            <KineticText text="Empowering Communities Worldwide" tag="h1" style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontFamily: 'var(--font-display)',
              marginBottom: '20px',
            }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>
              NGO has been at the forefront of community development — empowering communities, transforming lives, and redefining what impact means.
            </p>
          </div>
        </div>
      </AuroraBackground>

      <section className="content-section" style={{ padding: 'clamp(60px, 10vw, 80px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}>
            <ScrollReveal>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--aurora-cyan)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>Our Mission</div>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Empowering Communities</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                We believe every community deserves the opportunity to thrive. Through education, healthcare, and sustainable development, we create lasting change that transforms lives.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Our approach is community-driven, ensuring that every program is designed with the people it serves, not just for them. We work alongside communities to build a better future.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--aurora-cyan)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>Our Vision</div>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>A Prosperous World</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                We envision a world where access to education, healthcare, and opportunity is not determined by geography or circumstance. A world where every community can build its own sustainable future.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
