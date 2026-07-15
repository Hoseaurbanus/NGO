import { useState } from 'react'
import GlassCard from '@components/ui/GlassCard'
import MagneticButton from '@components/ui/MagneticButton'

const initialUsers = [
  { id: 1, name: 'Name S.', email: 'name1@yourorg.org', role: 'super_admin', status: 'active' },
  { id: 2, name: 'Name S.', email: 'name2@yourorg.org', role: 'admin', status: 'active' },
  { id: 3, name: 'Name S.', email: 'name3@yourorg.org', role: 'program_manager', status: 'active' },
  { id: 4, name: 'Name S.', email: 'name4@yourorg.org', role: 'editor', status: 'active' },
  { id: 5, name: 'Name S.', email: 'name5@example.com', role: 'volunteer', status: 'active' },
  { id: 6, name: 'Name S.', email: 'name6@example.com', role: 'member', status: 'inactive' },
]

const roleColors = { super_admin: '#FF5252', admin: '#7C4DFF', program_manager: '#536DFE', editor: '#00E5FF', volunteer: '#00E676', member: '#FFD740' }

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const filtered = initialUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Users</h2>
        <MagneticButton size="sm"><i className="bi bi-plus-lg" style={{ marginRight: '6px' }}></i>Add User</MagneticButton>
      </div>
      <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', fontSize: '0.9rem', outline: 'none', marginBottom: '20px' }} />
      <GlassCard style={{ padding: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              {['Name', 'Email', 'Role', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '12px', fontWeight: 500 }}>{u.name}</td>
                <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{u.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, background: `${roleColors[u.role]}15`, color: roleColors[u.role], textTransform: 'replace', capitalize: 'all' }}>{u.role.replace('_', ' ')}</span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, background: u.status === 'active' ? 'rgba(0,230,118,0.1)' : 'rgba(255,82,82,0.1)', color: u.status === 'active' ? 'var(--aurora-emerald)' : 'var(--danger)' }}>{u.status}</span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--aurora-cyan)', cursor: 'pointer', marginRight: '8px' }}><i className="bi bi-pencil"></i></button>
                  <button style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><i className="bi bi-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </GlassCard>
    </div>
  )
}
