import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import AuroraBackground from '@components/ui/AuroraBackground'
import KineticText from '@components/ui/KineticText'
import GlassCard from '@components/ui/GlassCard'

const faqs = [
  { q: 'How can I donate to SmugFlex?', a: 'You can donate through our secure online donation page, via bank transfer, or by check. All donations are tax-deductible and you\'ll receive an instant receipt.' },
  { q: 'How is my donation used?', a: 'On average, 85% of every dollar goes directly to programs. The remainder covers essential admin and fundraising costs. We publish annual transparency reports.' },
  { q: 'Can I volunteer remotely?', a: 'Yes! We have remote volunteering opportunities in teaching, translation, design, tech, and more. Apply through our volunteer page.' },
  { q: 'Where does SmugFlex operate?', a: 'We currently operate in 18 countries across Africa, Asia, Latin America, and the Middle East.' },
  { q: 'How can my company partner with SmugFlex?', a: 'We offer corporate partnerships, sponsorship opportunities, and employee engagement programs. Contact our partnerships team for details.' },
  { q: 'Is SmugFlex a registered nonprofit?', a: 'Yes, SmugFlex is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law.' },
  { q: 'How can I start a fundraiser?', a: 'Visit our donation page and click "Start a Fundraising Campaign." You can create a personal campaign page and share it with your network.' },
  { q: 'Do you accept in-kind donations?', a: 'Yes, we accept in-kind donations including supplies, equipment, and professional services. Contact us for specific needs.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [search, setSearch] = useState('')
  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Helmet><title>FAQ - SmugFlex</title><meta name="description" content="Frequently asked questions about SmugFlex, donations, volunteering, and partnerships." /></Helmet>
      <AuroraBackground intensity="light">
        <div className="page-hero-inner" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', padding: 'clamp(80px, 15vw, 120px) 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--aurora-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>FAQ</div>
            <KineticText text="Frequently Asked Questions" tag="h1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', marginBottom: '20px' }} />
          </div>
        </div>
      </AuroraBackground>
      <section className="content-section" style={{ padding: '60px 0 120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <input placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '16px 20px', borderRadius: 'var(--radius-full)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '1rem', outline: 'none', marginBottom: '32px' }} aria-label="Search questions" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                <i className="bi bi-search" style={{ fontSize: '2rem', marginBottom: '12px', display: 'block', color: 'var(--text-muted)' }}></i>
                <p>No questions match your search. Try different keywords.</p>
              </div>
            )}
            {filtered.map((f, i) => (
              <GlassCard key={i} style={{ padding: 0, overflow: 'hidden' }}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} style={{ width: '100%', padding: '20px 24px', background: 'none', border: 'none', color: 'white', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600 }}>
                  {f.q}
                  <i className={`bi bi-chevron-${open === i ? 'up' : 'down'}`} style={{ color: 'var(--aurora-cyan)', transition: 'transform 0.3s', transform: open === i ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0, marginLeft: '12px' }}></i>
                </button>
                <div role="region" style={{ maxHeight: open === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.3s var(--ease-smooth)' }}>
                  <p style={{ padding: '0 24px 20px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>{f.a}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
