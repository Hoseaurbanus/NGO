import { Link } from 'react-router-dom'
import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import CountUp from '@components/ui/CountUp'
import { ROUTES } from '@constants'

const benefits = [
  { icon: 'bi-heart-fill', title: 'Make an Impact', desc: 'Directly contribute to community transformation' },
  { icon: 'bi-people-fill', title: 'Join a Global Team', desc: 'Connect with 5,000+ volunteers worldwide' },
  { icon: 'bi-award', title: 'Earn Certificates', desc: 'Receive recognition for your contributions' },
  { icon: 'bi-calendar-check', title: 'Flexible Schedule', desc: 'Volunteer on your own time, remotely or in-person' },
]

export default function VolunteerSection() {
  return (
    <section className="volunteer-section" style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div className="volunteer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>
          <ScrollReveal direction="left">
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--aurora-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Get Involved
            </div>
            <GradientText tag="h2" gradient="aurora" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-display)',
              marginBottom: '20px',
            }}>
              Become a Volunteer
            </GradientText>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}>
              Join our global community of changemakers. Whether you have a few hours or a few months, your skills and passion can make a real difference in African communities.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}>
              {benefits.map((b, i) => (
                <div key={b.title} style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(0, 229, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <i className={`bi ${b.icon}`} style={{ color: 'var(--aurora-cyan)', fontSize: '1rem' }}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>{b.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to={ROUTES.VOLUNTEER}>
                <MagneticButton>
                  Join as Volunteer <i className="bi bi-arrow-right" style={{ marginLeft: '6px' }}></i>
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '16px',
            }}>
              <GlassCard style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                  <CountUp end={5000} suffix="+" />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Active Volunteers</div>
              </GlassCard>
              <GlassCard style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                  <CountUp end={120000} suffix="+" />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Hours Contributed</div>
              </GlassCard>
              <GlassCard style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                  <CountUp end={18} />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Countries</div>
              </GlassCard>
              <GlassCard style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                  <CountUp end={98} suffix="%" />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Satisfaction Rate</div>
              </GlassCard>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
