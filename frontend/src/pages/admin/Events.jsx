import { useState } from 'react'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'
import { formatDate } from '@utils/helpers'

const initialEvents = [
  { id: 1, title: 'Global Education Summit 2026', date: '2026-09-15', location: 'New York', status: 'upcoming', attendees: 250 },
  { id: 2, title: 'Community Health Workshop', date: '2026-08-20', location: 'Nairobi', status: 'upcoming', attendees: 80 },
  { id: 3, title: 'Annual Fundraising Gala', date: '2026-10-05', location: 'London', status: 'upcoming', attendees: 500 },
  { id: 4, title: 'Clean Water Hackathon', date: '2026-11-12', location: 'Berlin', status: 'upcoming', attendees: 120 },
]

export default function AdminEvents() {
  const [search, setSearch] = useState('')
  const filtered = initialEvents.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Events</h2>
        <MagneticButton size="sm"><i className="bi bi-plus-lg" style={{ marginRight: '6px' }}></i>Add Event</MagneticButton>
      </div>
      <input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.9rem', outline: 'none', marginBottom: '20px' }} />
      <GlassCard style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              {['Title', 'Date', 'Location', 'Attendees', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr key={e.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '12px', fontWeight: 500 }}>{e.title}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{formatDate(e.date)}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{e.location}</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{e.attendees}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(0,229,255,0.1)', color: 'var(--aurora-cyan)' }}>{e.status}</span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--aurora-cyan)', cursor: 'pointer', marginRight: '8px' }}><i className="bi bi-pencil"></i></button>
                  <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}
