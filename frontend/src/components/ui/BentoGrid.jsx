export default function BentoGrid({ children, className = '', cols = 3 }) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '16px',
        gridAutoFlow: 'dense',
      }}
    >
      {children}
    </div>
  )
}

export function BentoItem({ children, span = 1, rowSpan = 1, className = '' }) {
  return (
    <div
      className={`glass-card ${className}`}
      style={{
        gridColumn: `span ${span}`,
        gridRow: `span ${rowSpan}`,
        padding: '24px',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}
