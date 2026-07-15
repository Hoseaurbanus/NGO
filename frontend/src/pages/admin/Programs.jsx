import { useState } from 'react'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'

const initialPrograms = [
  { id: 1, title: 'Education for All', status: 'active', students: '--' },
  { id: 2, title: 'Healthcare Access', status: 'active', students: '--' },
  { id: 3, title: 'Clean Water Initiative', status: 'active', students: '--' },
  { id: 4, title: 'Community Empowerment', status: 'active', students: '--' },
  { id: 5, title: 'Emergency Relief', status: 'active', students: '--' },
  { id: 6, title: 'Environmental Action', status: 'inactive', students: '--' },
]

export default function AdminPrograms() {
  const [search, setSearch] = useState('')
  const filtered = initialPrograms.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Programs</h2>
        <MagneticButton size="sm"><i className="bi bi-plus-lg" style={{ marginRight: '6px' }}></i>Add Program</MagneticButton>
      </div>
      <input placeholder="Search programs..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.9rem', outline: 'none', marginBottom: '20px' }} />
      <GlassCard style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              {['Title', 'Impact', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '12px', fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{p.students}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, background: p.status === 'active' ? 'rgba(0,230,118,0.1)' : 'rgba(255,82,82,0.1)', color: p.status === 'active' ? 'var(--aurora-emerald)' : 'var(--danger)' }}>{p.status}</span>
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
