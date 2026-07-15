export default function BentoGrid({ children, className = '', minItemWidth = 280 }) {
  return (
    <div
      className={`bento-grid ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minItemWidth}px), 1fr))`,
        gap: '16px',
        gridAutoFlow: 'dense',
      }}
    >
      {children}
    </div>
  )
}

export function BentoItem({ children, className = '', ...styleProps }) {
  return (
    <div
      className={`bento-item glass-card ${className}`}
      style={{
        padding: '24px',
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...styleProps,
      }}
    >
      {children}
    </div>
  )
}