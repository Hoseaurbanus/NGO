import { Link } from 'react-router-dom'
import ScrollReveal from '@components/ui/ScrollReveal'
import GradientText from '@components/ui/GradientText'
import { ROUTES } from '@constants'
import { formatDate } from '@utils/helpers'

const articles = [
  {
    title: '[Your Organization Name] Expands Programs to New Regions',
    excerpt: 'Our global education initiative reaches new milestones with expanded programs in new communities.',
    image: 'https://images.unsplash.com/photo-1497486751825-112ba8d25d1d?w=800',
    category: 'Education',
    date: '2026-07-10',
    featured: true,
  },
  {
    title: 'Annual Report 2025: A Year of Growth',
    excerpt: 'Our biggest year yet — significant milestones achieved across all programs.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
    category: 'Reports',
    date: '2026-06-28',
  },
  {
    title: 'Clean Water Initiative Reaches New Milestone',
    excerpt: 'Communities worldwide now have access to clean, safe drinking water.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400',
    category: 'Impact',
    date: '2026-06-15',
  },
  {
    title: 'New Healthcare Center Opens',
    excerpt: 'Serving patients annually in underserved communities around the world.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    category: 'Healthcare',
    date: '2026-05-20',
  },
]

export default function NewsSection() {
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <section className="news-section" style={{ padding: '120px 0', background: 'var(--bg-secondary)' }}>
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
                Latest News
              </div>
              <GradientText tag="h2" gradient="aurora" style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'var(--font-display)',
              }}>
                Stories & Updates
              </GradientText>
            </div>
            <Link to={ROUTES.BLOG} style={{
              color: 'var(--aurora-cyan)',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </ScrollReveal>

        <div className="news-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: '24px',
        }}>
          <ScrollReveal>
            <Link to={`${ROUTES.BLOG}/${featured.title.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ overflow: 'hidden', height: '100%' }}>
                <div style={{
                  height: '350px',
                  backgroundImage: `url(${featured.image})`,
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
                    {featured.category}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    marginBottom: '12px',
                  }}>{formatDate(featured.date)}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    marginBottom: '12px',
                  }}>{featured.title}</h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                  }}>{featured.excerpt}</p>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {rest.map((article, i) => (
              <ScrollReveal key={article.title} delay={i * 0.1}>
                <Link to={`${ROUTES.BLOG}/${article.title.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card news-sidebar-card" style={{
                    display: 'flex',
                    overflow: 'hidden',
                  }}>
                    <div className="news-sidebar-img" style={{
                      width: '140px',
                      flexShrink: 0,
                      backgroundImage: `url(${article.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    <div style={{ padding: '20px', flex: 1 }}>
                      <div style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0, 229, 255, 0.1)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--aurora-cyan)',
                        marginBottom: '8px',
                      }}>{article.category}</div>
                      <h4 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        marginBottom: '6px',
                      }}>{article.title}</h4>
                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                      }}>{article.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 576px) {
          .news-sidebar-card {
            flex-direction: column !important;
          }
          .news-sidebar-img {
            width: 100% !important;
            height: 160px !important;
          }
        }
      `}</style>
    </section>
  )
}
