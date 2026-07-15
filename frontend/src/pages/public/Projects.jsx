import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'
import GlassCard from '@components/ui/GlassCard'

const projects = [
  { title: 'Rural School Network', status: 'Ongoing', budget: '$250,000', location: 'Nepal', image: 'https://images.unsplash.com/photo-1497486751825-112ba8d25d1d?w=600', partner: 'UNICEF', progress: 72 },
  { title: 'Clean Water for Nairobi', status: 'Completed', budget: '$180,000', location: 'Kenya', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600', partner: 'WHO', progress: 100 },
  { title: 'Mobile Health Clinics', status: 'Ongoing', budget: '$320,000', location: 'Sierra Leone', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', partner: 'Red Cross', progress: 45 },
  { title: 'Women Empowerment Hub', status: 'Upcoming', budget: '$150,000', location: 'Jordan', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600', partner: 'UN Women', progress: 0 },
  { title: 'Reforestation Drive', status: 'Ongoing', budget: '$200,000', location: 'Brazil', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600', partner: 'WWF', progress: 60 },
  { title: 'Digital Literacy Program', status: 'Completed', budget: '$120,000', location: 'India', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600', partner: 'Google.org', progress: 100 },
]

const statusColors = { Ongoing: '#00E5FF', Completed: '#00E676', Upcoming: '#FFD740' }

export default function Projects() {
  return (
    <>
      <Helmet><title>Projects - SmugFlex</title><meta name="description" content="Explore our ongoing, completed, and upcoming projects across the globe." /></Helmet>
      <AuroraBackground intensity="light">
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Our Projects</div>
            <KineticText text="Projects That Change Lives" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>From education to environment, see how we're making a difference on the ground.</p>
          </div>
        </div>
      </AuroraBackground>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '24px' }}>
            {projects.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <GlassCard style={{ overflow: 'hidden' }}>
                  <div style={{ height: '200px', backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 60%)' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: `${statusColors[p.status]}22`, backdropFilter: 'blur(8px)', fontSize: '0.75rem', fontWeight: 600, color: statusColors[p.status] }}>{p.status}</div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '12px' }}>{p.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="bi bi-geo-alt" style={{ marginRight: '4px' }}></i>{p.location}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="bi bi-currency-dollar" style={{ marginRight: '4px' }}></i>{p.budget}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="bi bi-building" style={{ marginRight: '4px' }}></i>{p.partner}</span>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                        <span style={{ color: 'var(--aurora-cyan)', fontFamily: 'var(--font-mono)' }}>{p.progress}%</span>
                      </div>
                      <div style={{ height: '4px', borderRadius: '2px', background: 'var(--glass-border)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${p.progress}%`, background: 'var(--gradient-aurora)', borderRadius: '2px', transition: 'width 1s ease' }} />
                      </div>
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
