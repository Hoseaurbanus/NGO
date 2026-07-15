import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'
import GlassCard from '@components/ui/GlassCard'
import { formatDate } from '@utils/helpers'

const posts = [
  { title: '[Your Organization Name] Expands Programs to New Regions', excerpt: 'Our education initiative reaches new milestones in communities worldwide.', image: 'https://images.unsplash.com/photo-1497486751825-112ba8d25d1d?w=800', category: 'Education', date: '2026-07-10', author: 'Jane Doe', featured: true },
  { title: 'Annual Report 2025: A Year of Growth', excerpt: 'Our biggest year yet — significant milestones achieved across all programs.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400', category: 'Reports', date: '2026-06-28', author: 'John Smith' },
  { title: 'Clean Water Initiative Reaches New Milestone', excerpt: 'Communities worldwide now have access to clean water.', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400', category: 'Impact', date: '2026-06-15', author: 'Jane Wilson' },
  { title: 'New Healthcare Center Opens', excerpt: 'Serving patients annually in underserved communities.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', category: 'Healthcare', date: '2026-05-20', author: 'Jane Doe' },
  { title: 'Volunteer Spotlight: Meet Our Changemakers', excerpt: 'Stories from our incredible global volunteer network.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400', category: 'Volunteers', date: '2026-05-01', author: 'John Brown' },
  { title: 'Reforestation Program Hits Major Milestone', excerpt: 'Our environmental program achieves a significant goal.', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', category: 'Environment', date: '2026-04-15', author: 'John Smith' },
]

const catColors = { Education: '#536DFE', Reports: '#7C4DFF', Impact: '#00E676', Healthcare: '#00E5FF', Volunteers: '#FFD740', Environment: '#00E676' }

export default function Blog() {
  const featured = posts[0]
  const rest = posts.slice(1)
  return (
    <>
      <Helmet><title>Blog - [Your Organization Name]</title><meta name="description" content="Latest news, stories, and updates from [Your Organization Name]." /></Helmet>
      <AuroraBackground intensity="light">
        <div className="page-hero-inner" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Blog</div>
            <KineticText text="Stories & Updates" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>News, impact stories, and insights from our community.</p>
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <ScrollReveal>
            <GlassCard style={{ overflow: 'hidden', marginBottom: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))' }}>
                <div style={{ height: 'clamp(250px, 40vw, 400px)', backgroundImage: `url(${featured.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: `${catColors[featured.category]}22`, fontSize: '0.75rem', fontWeight: 600, color: catColors[featured.category], marginBottom: '16px', alignSelf: 'flex-start' }}>{featured.category}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '12px' }}>{featured.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>{featured.excerpt}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>{formatDate(featured.date)}</span>
                    <span>By {featured.author}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '24px' }}>
            {rest.map((post, i) => (
              <ScrollReveal key={post.title} delay={i * 0.1}>
                <GlassCard style={{ overflow: 'hidden' }}>
                  <div style={{ height: '200px', backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 60%)' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', padding: '4px 12px', borderRadius: 'var(--radius-full)', background: `${catColors[post.category]}22`, fontSize: '0.7rem', fontWeight: 600, color: catColors[post.category] }}>{post.category}</div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: '8px' }}>{post.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{post.excerpt}</p>
                    <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDate(post.date)} · {post.author}</div>
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
