import { Link } from 'react-router-dom'
import ScrollReveal from '@components/ui/ScrollReveal'
import Container from '@components/ui/Container'
import SectionHeading from '@components/ui/SectionHeading'
import { ROUTES } from '@constants'
import { formatDate } from '@utils/helpers'

const events = [
  {
    title: 'Global Education Summit 2026',
    date: '2026-09-15',
    location: 'City, Country',
    image: '',
    category: 'Conference',
  },
  {
    title: 'Community Health Workshop',
    date: '2026-08-20',
    location: 'City, Country',
    image: '',
    category: 'Workshop',
  },
  {
    title: 'Annual Fundraising Gala',
    date: '2026-10-05',
    location: 'City, Country',
    image: '',
    category: 'Gala',
  },
]

export default function EventsSection() {
  return (
    <section className="events-section" style={{ padding: '120px 0' }}>
      <Container>
        <ScrollReveal>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <SectionHeading align="left" eyebrow="Upcoming Events" title="Join Our Events" style={{ marginBottom: 'var(--space-4)' }} />
            <Link to={ROUTES.EVENTS} style={{
              color: 'var(--aurora-cyan)',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              View All Events <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </ScrollReveal>

        <div className="events-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: '24px',
        }}>
          {events.map((event, i) => (
            <ScrollReveal key={event.title} delay={i * 0.1}>
              <Link to={`${ROUTES.EVENTS}/${event.title.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ overflow: 'hidden' }}>
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, var(--bg-surface), transparent 60%)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(0, 229, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--aurora-cyan)',
                    }}>
                      {event.category}
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                    }}>
                      <i className="bi bi-calendar3"></i> {formatDate(event.date)}
                      <span style={{ margin: '0 4px' }}>|</span>
                      <i className="bi bi-geo-alt"></i> {event.location}
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      marginBottom: '12px',
                    }}>{event.title}</h3>
                    <span style={{
                      color: 'var(--aurora-cyan)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      Register Now <i className="bi bi-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
