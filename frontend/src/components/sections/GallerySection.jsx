import { useState } from 'react'
import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'

const images = [
  { src: '', category: 'Education' },
  { src: '', category: 'Healthcare' },
  { src: '', category: 'Community' },
  { src: '', category: 'Water' },
  { src: '', category: 'Relief' },
  { src: '', category: 'Environment' },
  { src: '', category: 'Education' },
  { src: '', category: 'Community' },
]

const categories = ['All', 'Education', 'Healthcare', 'Community', 'Water', 'Relief', 'Environment']

export default function GallerySection() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? images : images.filter(img => img.category === filter)

  return (
    <section style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--aurora-cyan)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Gallery
            </div>
            <GradientText tag="h2" gradient="aurora" style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-display)',
              marginBottom: '24px',
            }}>
              Moments of Impact
            </GradientText>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid ${filter === cat ? 'var(--aurora-cyan)' : 'var(--glass-border)'}`,
                    background: filter === cat ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                    color: filter === cat ? 'var(--aurora-cyan)' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map((img, i) => (
            <ScrollReveal key={img.src + img.category} delay={i * 0.05}>
              <div className="glass-card" style={{
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                aspectRatio: '4/3',
              }}>
                <img
                  src={img.src}
                  alt={img.category}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s var(--ease-smooth)',
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: 'linear-gradient(to top, rgba(10,14,26,0.9), transparent)',
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--aurora-cyan)',
                  }}>{img.category}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
