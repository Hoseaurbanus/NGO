import GlassCard from '@components/ui/GlassCard'
import { formatCurrency, formatDate } from '@utils/helpers'

const donations = [
  { id: 1, amount: 100, campaign: 'Education Fund', date: '2026-07-14', status: 'Completed', method: 'Online' },
  { id: 2, amount: 250, campaign: 'Clean Water Initiative', date: '2026-06-20', status: 'Completed', method: 'Bank Transfer' },
  { id: 3, amount: 50, campaign: 'Emergency Relief', date: '2026-05-15', status: 'Completed', method: 'Online' },
  { id: 4, amount: 500, campaign: 'Annual Fundraising', date: '2026-04-10', status: 'Completed', method: 'Check' },
  { id: 5, amount: 75, campaign: 'Healthcare Access', date: '2026-03-05', status: 'Completed', method: 'Online' },
]

const statusColors = { Completed: '#00E676', Pending: '#FFD740', Failed: '#FF5252' }

export default function PortalDonations() {
  const total = donations.reduce((sum, d) => sum + d.amount, 0)

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '8px' }}>My Donations</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Track your generous contributions.</p>

      <GlassCard style={{ padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Donated</div>
        <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, fontFamily: 'var(--font-mono)', background: 'var(--gradient-aurora)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{formatCurrency(total)}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{donations.length} donations</div>
      </GlassCard>

      <GlassCard style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '16px' }}>Donation History</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                {['Campaign', 'Amount', 'Date', 'Method', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '12px', fontSize: '0.875rem' }}>{d.campaign}</td>
                  <td style={{ padding: '12px', fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--aurora-emerald)' }}>{formatCurrency(d.amount)}</td>
                  <td style={{ padding: '12px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{formatDate(d.date)}</td>
                  <td style={{ padding: '12px', fontSize: '0.85rem' }}>{d.method}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 600, background: `${statusColors[d.status]}15`, color: statusColors[d.status] }}>{d.status}</span>
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
