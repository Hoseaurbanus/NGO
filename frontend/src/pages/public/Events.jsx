import { Helmet } from 'react-helmet-async'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import ScrollReveal from '@components/ui/ScrollReveal'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import { formatDate } from '@utils/helpers'

const events = [
  { title: 'Pan-African Education Summit', date: '2026-09-15', location: 'Lagos, Nigeria', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600', category: 'Conference', desc: 'Leaders from 15 African nations discuss the future of education on the continent.' },
  { title: 'Community Health Workshop', date: '2026-08-20', location: 'Nairobi, Kenya', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600', category: 'Workshop', desc: 'Hands-on training for community health workers in East Africa.' },
  { title: 'Annual Fundraising Gala', date: '2026-10-05', location: 'Accra, Ghana', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600', category: 'Gala', desc: 'An evening of inspiration, African impact stories, and fundraising.' },
  { title: 'Clean Water Hackathon', date: '2026-11-12', location: 'Nairobi, Kenya', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600', category: 'Hackathon', desc: 'Tech solutions for water scarcity in African communities.' },
  { title: 'Volunteer Appreciation Day', date: '2026-12-01', location: 'Lagos, Nigeria', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600', category: 'Celebration', desc: 'Celebrating our incredible African volunteer network.' },
  { title: 'Youth Leadership Camp', date: '2027-01-15', location: 'Kigali, Rwanda', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600', category: 'Camp', desc: 'Empowering the next generation of African community leaders.' },
]

const catColors = { Conference: '#536DFE', Workshop: '#00E676', Gala: '#7C4DFF', Hackathon: '#00E5FF', Celebration: '#FFD740', Camp: '#FF5252' }

export default function Events() {
  return (
    <>
      <Helmet><title>Events - SmugFlex</title><meta name="description" content="Join SmugFlex events across Africa — conferences, workshops, galas, and community gatherings." /></Helmet>
      <AuroraBackground intensity="light">
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Events</div>
            <KineticText text="Join Our Events" tag="h1" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7 }}>Conferences, workshops, and community gatherings across Africa — connect with us.</p>
          </div>
        </div>
      </AuroraBackground>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '24px' }}>
            {events.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 0.1}>
                <GlassCard style={{ overflow: 'hidden' }}>
                  <div style={{ height: '200px', backgroundImage: `url(${e.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 60%)' }} />
                    <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: `${catColors[e.category]}22`, backdropFilter: 'blur(8px)', fontSize: '0.75rem', fontWeight: 600, color: catColors[e.category] }}>{e.category}</div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="bi bi-calendar3" style={{ marginRight: '4px' }}></i>{formatDate(e.date)}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><i className="bi bi-geo-alt" style={{ marginRight: '4px' }}></i>{e.location}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '8px' }}>{e.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>{e.desc}</p>
                    <MagneticButton size="sm">Register Now</MagneticButton>
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
