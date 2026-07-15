import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import GlassCard from '@components/ui/GlassCard'
import { ROUTES } from '@constants'

const programs = [
  {
    title: 'Education for All',
    description: 'Building schools, training teachers, and providing learning materials to communities worldwide.',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600',
    icon: 'bi-book',
    color: '#536DFE',
  },
  {
    title: 'Healthcare Access',
    description: 'Delivering medical services, vaccinations, and health education to underserved populations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    icon: 'bi-heart-pulse',
    color: '#00E676',
  },
  {
    title: 'Clean Water Initiative',
    description: 'Installing water purification systems and wells in water-scarce regions worldwide.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600',
    icon: 'bi-droplet',
    color: '#00E5FF',
  },
  {
    title: 'Community Empowerment',
    description: 'Providing vocational training, micro-loans, and entrepreneurship support worldwide.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
    icon: 'bi-people',
    color: '#FFD740',
  },
  {
    title: 'Emergency Relief',
    description: 'Rapid response to natural disasters with food, shelter, and medical aid worldwide.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600',
    icon: 'bi-lightning',
    color: '#FF5252',
  },
  {
    title: 'Environmental Action',
    description: 'Reforestation, conservation, and sustainable agriculture programs worldwide.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600',
    icon: 'bi-tree',
    color: '#00E676',
  },
]

export default function ProgramsSection() {
  const scrollRef = useRef(null)

  return (
    <section className="programs-section" style={{ padding: '120px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--aurora-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              What We Do
            </div>
            <GradientText tag="h2" gradient="aurora" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-display)',
              marginBottom: '16px',
            }}>
              Our Programs
            </GradientText>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Six core programs driving meaningful change in communities worldwide.
            </p>
          </div>
        </ScrollReveal>

        <div ref={scrollRef} className="programs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: '24px',
        }}>
          {programs.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.1}>
              <Link to={ROUTES.PROGRAMS} style={{ textDecoration: 'none' }}>
                <GlassCard style={{
                  padding: 0,
                  overflow: 'hidden',
                  height: '100%',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${program.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, var(--bg-surface), transparent 60%)`,
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `${program.color}22`,
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <i className={`bi ${program.icon}`} style={{ color: program.color, fontSize: '1.25rem' }}></i>
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      marginBottom: '8px',
                    }}>{program.title}</h3>
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                    }}>{program.description}</p>
                    <span style={{
                      color: 'var(--aurora-cyan)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      Learn More <i className="bi bi-arrow-right"></i>
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
