import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'

const categories = [
  { name: 'Photos', icon: 'bi-camera', count: 0 },
  { name: 'Videos', icon: 'bi-play-circle', count: 0 },
  { name: 'Annual Reports', icon: 'bi-file-earmark-pdf', count: 0 },
  { name: 'Brochures', icon: 'bi-journal-richtext', count: 0 },
  { name: 'Newsletters', icon: 'bi-envelope-paper', count: 0 },
]

const photos = [
  { src: '', caption: 'Education program launch' },
  { src: '', caption: 'Healthcare outreach' },
  { src: '', caption: 'Community workshop' },
  { src: '', caption: 'Clean water project' },
  { src: '', caption: 'Emergency relief' },
  { src: '', caption: 'Environmental action' },
  { src: '', caption: 'School building' },
  { src: '', caption: 'Youth program' },
]

export default function Media() {
  return (
    <>
      <Helmet><title>Media - NGO</title><meta name="description" content="Photos, videos, reports, and resources from NGO." /></Helmet>
      <AuroraBackground intensity="light">
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Media</div>
            <KineticText text="Media Library" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem' }}>Photos, videos, annual reports, and downloadable resources.</p>
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: '60px 0 120px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px', marginBottom: '60px' }}>
              {categories.map(c => (
                <div key={c.name} className="glass-card" style={{ padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
                  <i className={`bi ${c.icon}`} style={{ fontSize: '2rem', color: 'var(--aurora-cyan)', marginBottom: '12px', display: 'block' }}></i>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '4px' }}>{c.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.count} items</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '24px' }}>Photo Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: '16px' }}>
            {photos.map((p, i) => (
              <ScrollReveal key={p.src} delay={i * 0.05}>
                <div className="glass-card" style={{ overflow: 'hidden', cursor: 'pointer', aspectRatio: '4/3' }}>
                  <img src={p.src} alt={p.caption} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseOver={e => e.target.style.transform = 'scale(1.05)'} onMouseOut={e => e.target.style.transform = 'scale(1)'} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
