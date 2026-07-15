import { useState } from 'react'
import GlassCard from '@components/ui/GlassCard'

const notifications = [
  { title: 'Donation Confirmed', message: 'Your donation has been confirmed.', time: '2 hours ago', read: false, icon: 'bi-heart', color: '#00E676' },
  { title: 'Event Registration', message: 'You\'re registered for an upcoming event.', time: '1 day ago', read: false, icon: 'bi-calendar3', color: '#00E5FF' },
  { title: 'Volunteer Application Approved', message: 'Your volunteer application has been approved!', time: '3 days ago', read: true, icon: 'bi-check-circle', color: '#00E676' },
  { title: 'New Newsletter', message: 'Latest newsletter is now available.', time: '5 days ago', read: true, icon: 'bi-envelope', color: '#536DFE' },
  { title: 'Certificate Ready', message: 'Your certificate is ready to download.', time: '1 week ago', read: true, icon: 'bi-award', color: '#FFD740' },
]

export default function PortalNotifications() {
  const [items, setItems] = useState(notifications)

  const markAllRead = () => setItems(items.map(n => ({ ...n, read: true })))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem' }}>Notifications</h1>
        <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--aurora-cyan)', cursor: 'pointer', fontSize: '0.875rem' }}>Mark all as read</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((n, i) => (
          <GlassCard key={i} style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', opacity: n.read ? 0.7 : 1, borderLeft: n.read ? undefined : `3px solid ${n.color}` }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${n.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className={`bi ${n.icon}`} style={{ color: n.color }}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>{n.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{n.message}</div>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{n.time}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
