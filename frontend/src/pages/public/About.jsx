import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import GlassCard from '@components/ui/GlassCard'

const timeline = [
  { year: '2010', title: 'Lagos Launch', desc: 'SmugFlex was founded in Lagos, Nigeria with a vision to transform African communities from within.' },
  { year: '2013', title: 'East Africa Expansion', desc: 'Expanded to Kenya and Tanzania, launching education programs in rural communities.' },
  { year: '2016', title: 'Southern Africa', desc: 'Opened operations in South Africa and Ghana, reaching 100,000 lives across 8 countries.' },
  { year: '2019', title: 'Digital Innovation', desc: 'Launched mobile learning platforms connecting 50,000 students in remote areas.' },
  { year: '2022', title: 'Pan-African Reach', desc: 'Expanded to 12 African nations with healthcare, education, and clean water programs.' },
  { year: '2025', title: '250K+ Lives Changed', desc: 'Surpassed 250,000 lives impacted across 12 African countries.' },
]

const team = [
  { name: 'Dr. Adaeze Nwosu', role: 'Executive Director', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
  { name: 'James Odhiambo', role: 'Head of Programs', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' },
  { name: 'Fatima Al-Rashid', role: 'Director of Operations', image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400' },
  { name: 'Kwame Mensah', role: 'Finance Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - SmugFlex</title>
        <meta name="description" content="Learn about SmugFlex's mission, vision, and the team behind our impact across Africa." />
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
            <KineticText text="Empowering Africa From Within" tag="h1" style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontFamily: 'var(--font-display)',
              marginBottom: '20px',
            }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>
              Since 2010, SmugFlex has been at the forefront of African development — empowering communities, transforming lives, and redefining what impact means across the continent.
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
              }}>Empowering African Communities</GradientText>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                We believe every African community deserves the opportunity to thrive. Through education, healthcare, and sustainable development, we create lasting change that transforms entire nations.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Our approach is community-driven, ensuring that every program is designed with the people it serves, not just for them. From Lagos to Nairobi, Accra to Cape Town, we are building a stronger Africa.
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
              }}>A Prosperous, United Africa</GradientText>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                We envision an Africa where access to education, healthcare, and opportunity is not determined by geography or circumstance. A continent where every community can build its own sustainable future.
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
