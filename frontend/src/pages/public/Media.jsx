import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'

const categories = [
  { name: 'Photos', icon: 'bi-camera', count: 250 },
  { name: 'Videos', icon: 'bi-play-circle', count: 45 },
  { name: 'Annual Reports', icon: 'bi-file-earmark-pdf', count: 12 },
  { name: 'Brochures', icon: 'bi-journal-richtext', count: 24 },
  { name: 'Newsletters', icon: 'bi-envelope-paper', count: 36 },
]

const photos = [
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400', caption: 'Education program launch' },
  { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400', caption: 'Healthcare outreach' },
  { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400', caption: 'Community workshop' },
  { src: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400', caption: 'Clean water project' },
  { src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400', caption: 'Emergency relief' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', caption: 'Environmental action' },
  { src: 'https://images.unsplash.com/photo-1497486751825-112ba8d25d1d?w=400', caption: 'School building' },
  { src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400', caption: 'Youth program' },
]

export default function Media() {
  return (
    <>
      <Helmet><title>Media - SmugFlex</title><meta name="description" content="Photos, videos, reports, and resources from SmugFlex." /></Helmet>
      <AuroraBackground intensity="light">
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Media</div>
            <KineticText text="Media Library" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem' }}>Photos, videos, annual reports, and downloadable resources.</p>
          </div>
        </div>
      </AuroraBackground>
      <section style={{ padding: '60px 0 120px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '60px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
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
