import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import GlassCard from '@components/ui/GlassCard'

const timeline = [
  { year: '20XX', title: 'Founded', desc: 'NGO was established with a vision to create lasting change in communities worldwide.' },
  { year: '20XX', title: 'Regional Expansion', desc: 'Expanded operations to new regions, launching education and healthcare programs.' },
  { year: '20XX', title: 'Program Growth', desc: 'Launched new programs and partnerships, reaching more communities.' },
  { year: '20XX', title: 'Digital Innovation', desc: 'Introduced technology-driven solutions to expand our reach.' },
  { year: '20XX', title: 'Global Reach', desc: 'Expanded to multiple countries with comprehensive programs.' },
  { year: '20XX', title: 'Milestone Achievement', desc: 'Reached significant impact milestones across all programs.' },
]

const team = [
  { name: 'Jane Doe', role: 'Executive Director', image: '' },
  { name: 'John Smith', role: 'Head of Programs', image: '' },
  { name: 'Jane Wilson', role: 'Director of Operations', image: '' },
  { name: 'John Brown', role: 'Finance Director', image: '' },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - NGO</title>
        <meta name="description" content="Learn about NGO's mission, vision, and the team behind our impact." />
      </Helmet>

      <AuroraBackground intensity="light">
        <div className="page-hero-inner" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
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
              Since 20XX, NGO has been at the forefront of community development — empowering communities, transforming lives, and redefining what impact means.
            </p>
          </div>
        </div>
      </AuroraBackground>

      <section className="content-section" style={{ padding: '100px 0' }}>
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
              <GradientText tag="h2" gradient="aurora" style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-display)',
                marginBottom: '16px',
              }}>Empowering Communities</GradientText>
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
              <GradientText tag="h2" gradient="violet" style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-display)',
                marginBottom: '16px',
              }}>A Prosperous World</GradientText>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                We envision a world where access to education, healthcare, and opportunity is not determined by geography or circumstance. A world where every community can build its own sustainable future.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="content-section" style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <GradientText tag="h2" gradient="aurora" style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-display)',
              }}>Our Journey</GradientText>
            </div>
          </ScrollReveal>
          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 0.1}>
              <div style={{
                display: 'flex',
                gap: '24px',
                marginBottom: '40px',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--aurora-cyan)',
                  minWidth: '80px',
                }}>{item.year}</div>
                <div style={{
                  width: '2px',
                  background: 'var(--glass-border)',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--aurora-cyan)',
                    position: 'absolute',
                    top: '4px',
                    left: '-5px',
                  }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '4px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="content-section" style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <GradientText tag="h2" gradient="aurora" style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-display)',
              }}>Our Leadership</GradientText>
            </div>
          </ScrollReveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '24px',
          }}>
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <GlassCard style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundImage: `url(${member.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '0 auto 16px',
                    border: '3px solid var(--aurora-cyan)',
                  }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '4px' }}>{member.name}</h3>
                  <p style={{ color: 'var(--aurora-cyan)', fontSize: '0.85rem' }}>{member.role}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
