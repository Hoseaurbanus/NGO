import GradientText from './GradientText'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', gradient = false, className = '', style, titleAs = 'h2' }) {
  const TitleTag = titleAs
  return (
    <div className={`section-heading ${align === 'center' ? 'is-center' : 'is-left'} ${className}`} style={{ marginBottom: 'var(--space-12)', ...style }}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {gradient ? (
        <GradientText tag={titleAs} gradient="aurora" className="section-title section-title--gradient">{title}</GradientText>
      ) : (
        <TitleTag className="section-title">{title}</TitleTag>
      )}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
