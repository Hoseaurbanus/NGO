import { Link } from 'react-router-dom'
import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import { ROUTES } from '@constants'
import { formatDate } from '@utils/helpers'

const events = [
  {
    title: 'Pan-African Education Summit 2026',
    date: '2026-09-15',
    location: 'Lagos, Nigeria',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
    category: 'Conference',
  },
  {
    title: 'Community Health Workshop',
    date: '2026-08-20',
    location: 'Nairobi, Kenya',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600',
    category: 'Workshop',
  },
  {
    title: 'Annual Fundraising Gala',
    date: '2026-10-05',
    location: 'Accra, Ghana',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600',
    category: 'Gala',
  },
]

export default function EventsSection() {
  return (
    <section className="events-section" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <ScrollReveal>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--aurora-cyan)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Upcoming Events
              </div>
              <GradientText tag="h2" gradient="aurora" style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'var(--font-display)',
              }}>
                Join Our Events
              </GradientText>
            </div>
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
      </div>
    </section>
  )
}
