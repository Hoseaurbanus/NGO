import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'
import GlassCard from '@components/ui/GlassCard'

const programs = [
  { title: 'Education for All', desc: 'Building schools, training teachers, and providing learning materials to underserved communities worldwide.', icon: 'bi-book', image: 'https://images.unsplash.com/photo-1497486751825-112ba8d25d1d?w=600', color: '#536DFE', stats: '80K+ students served' },
  { title: 'Healthcare Access', desc: 'Delivering medical services, vaccinations, and health education to underserved populations.', icon: 'bi-heart-pulse', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', color: '#00E676', stats: '50K+ patients treated' },
  { title: 'Clean Water Initiative', desc: 'Installing water purification systems and wells in water-scarce regions.', icon: 'bi-droplet', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600', color: '#00E5FF', stats: '100+ villages served' },
  { title: 'Community Empowerment', desc: 'Providing vocational training, micro-loans, and entrepreneurship support.', icon: 'bi-people', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600', color: '#FFD740', stats: '15K+ entrepreneurs' },
  { title: 'Emergency Relief', desc: 'Rapid response to natural disasters with food, shelter, and medical aid.', icon: 'bi-lightning', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600', color: '#FF5252', stats: '25+ deployments' },
  { title: 'Environmental Action', desc: 'Reforestation, conservation, and sustainable agriculture programs.', icon: 'bi-tree', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', color: '#00E676', stats: '500K trees planted' },
]

export default function Programs() {
  return (
    <>
      <Helmet>
        <title>Programs - SmugFlex</title>
        <meta name="description" content="Explore SmugFlex's six core programs driving meaningful change across communities worldwide." />
      </Helmet>

      <AuroraBackground intensity="light">
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Our Programs</div>
            <KineticText text="Six Pillars of Change" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>
              Each program is designed to create sustainable, community-driven impact across the globe.
            </p>
          </div>
        </div>
      </AuroraBackground>

      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
            {programs.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <GlassCard style={{ overflow: 'hidden', height: '100%' }}>
                  <div style={{ height: '220px', backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 60%)' }} />
                    <div style={{ position: 'absolute', top: '16px', right: '16px', width: '48px', height: '48px', borderRadius: '12px', background: `${p.color}22`, backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={`bi ${p.icon}`} style={{ color: p.color, fontSize: '1.25rem' }}></i>
                    </div>
                  </div>
                  <div style={{ padding: '28px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '8px' }}>{p.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>{p.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)' }}>{p.stats}</span>
                      <span style={{ color: 'var(--aurora-cyan)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Learn More <i className="bi bi-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
