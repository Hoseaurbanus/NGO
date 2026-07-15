import { useState } from 'react'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'

const initialProjects = [
  { id: 1, title: 'Rural School Network', status: 'ongoing', progress: 72, location: 'Country 1' },
  { id: 2, title: 'Clean Water Initiative', status: 'completed', progress: 100, location: 'Country 2' },
  { id: 3, title: 'Mobile Health Clinics', status: 'ongoing', progress: 45, location: 'Country 3' },
  { id: 4, title: 'Women Empowerment Hub', status: 'upcoming', progress: 0, location: 'Country 4' },
  { id: 5, title: 'Reforestation Drive', status: 'ongoing', progress: 60, location: 'Country 5' },
]

const statusColors = { ongoing: '#00E5FF', completed: '#00E676', upcoming: '#FFD740' }

export default function AdminProjects() {
  const [search, setSearch] = useState('')
  const filtered = initialProjects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Projects</h2>
        <MagneticButton size="sm"><i className="bi bi-plus-lg" style={{ marginRight: '6px' }}></i>Add Project</MagneticButton>
      </div>
      <input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.9rem', outline: 'none', marginBottom: '20px' }} />
      <GlassCard style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              {['Title', 'Location', 'Progress', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '12px', fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{p.location}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'var(--glass-border)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${p.progress}%`, background: 'var(--gradient-aurora)', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--aurora-cyan)' }}>{p.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, background: `${statusColors[p.status]}15`, color: statusColors[p.status] }}>{p.status}</span>
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
