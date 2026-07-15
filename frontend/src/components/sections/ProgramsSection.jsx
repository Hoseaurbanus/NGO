import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '@components/ui/ScrollReveal'
import Container from '@components/ui/Container'
import SectionHeading from '@components/ui/SectionHeading'
import GlassCard from '@components/ui/GlassCard'
import { ROUTES } from '@constants'

const programs = [
  {
    title: 'Education for All',
    description: 'Building schools, training teachers, and providing learning materials to communities worldwide.',
    image: '',
    icon: 'bi-book',
    color: '#536DFE',
  },
  {
    title: 'Healthcare Access',
    description: 'Delivering medical services, vaccinations, and health education to underserved populations.',
    image: '',
    icon: 'bi-heart-pulse',
    color: '#00E676',
  },
  {
    title: 'Clean Water Initiative',
    description: 'Installing water purification systems and wells in water-scarce regions worldwide.',
    image: '',
    icon: 'bi-droplet',
    color: '#00E5FF',
  },
  {
    title: 'Community Empowerment',
    description: 'Providing vocational training, micro-loans, and entrepreneurship support worldwide.',
    image: '',
    icon: 'bi-people',
    color: '#FFD740',
  },
  {
    title: 'Emergency Relief',
    description: 'Rapid response to natural disasters with food, shelter, and medical aid worldwide.',
    image: '',
    icon: 'bi-lightning',
    color: '#FF5252',
  },
  {
    title: 'Environmental Action',
    description: 'Reforestation, conservation, and sustainable agriculture programs worldwide.',
    image: '',
    icon: 'bi-tree',
    color: '#00E676',
  },
]

export default function ProgramsSection() {
  const scrollRef = useRef(null)

  return (
    <section className="programs-section" style={{ padding: '120px 0', overflow: 'hidden' }}>
      <Container>
        <ScrollReveal>
          <SectionHeading align="center" eyebrow="What We Do" title="Our Programs" subtitle="Six core programs driving meaningful change in communities worldwide." />
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
      </Container>
    </section>
  )
}
