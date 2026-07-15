export default function AuroraDivider({ className = '' }) {
  return (
    <div className={className} style={{
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #536DFE, #00E5FF, #00E676, transparent)',
      borderRadius: '1px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
        animation: 'aurora-drift-1 3s linear infinite',
      }} />
    </div>
  )
}
