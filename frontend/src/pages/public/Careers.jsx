import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'

const jobs = [
  { title: 'Program Manager - Education', department: 'Programs', location: 'City, Country', type: 'Full-time', posted: '2026-07-01' },
  { title: 'Field Coordinator', department: 'Operations', location: 'City, Country', type: 'Full-time', posted: '2026-06-28' },
  { title: 'Data Analyst', department: 'Technology', location: 'Remote', type: 'Full-time', posted: '2026-06-25' },
  { title: 'Communications Specialist', department: 'Marketing', location: 'City, Country', type: 'Full-time', posted: '2026-06-20' },
  { title: 'Grant Writer', department: 'Fundraising', location: 'Remote', type: 'Contract', posted: '2026-06-15' },
  { title: 'Volunteer Coordinator', department: 'Volunteers', location: 'City, Country', type: 'Full-time', posted: '2026-06-10' },
]

export default function Careers() {
  return (
    <>
      <Helmet><title>Careers - [Your Organization Name]</title><meta name="description" content="Join [Your Organization Name] and build a career that makes a real difference." /></Helmet>
      <AuroraBackground intensity="light">
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Careers</div>
            <KineticText text="Build a Career That Matters" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem' }}>Join our global team and make a real impact while building your career.</p>
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {jobs.map((job, i) => (
              <ScrollReveal key={job.title} delay={i * 0.08}>
                <GlassCard style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '8px' }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="bi bi-building" style={{ marginRight: '4px' }}></i>{job.department}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="bi bi-geo-alt" style={{ marginRight: '4px' }}></i>{job.location}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="bi bi-clock" style={{ marginRight: '4px' }}></i>{job.type}</span>
                    </div>
                  </div>
                  <MagneticButton size="sm">Apply</MagneticButton>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
