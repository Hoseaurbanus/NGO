export default function GradientText({ children, gradient = 'aurora', className = '', tag: Tag = 'span', ...props }) {
  const gradients = {
    aurora: 'linear-gradient(135deg, #536DFE, #00E5FF)',
    violet: 'linear-gradient(135deg, #7C4DFF, #FF5252)',
    emerald: 'linear-gradient(135deg, #00E676, #00E5FF)',
    warm: 'linear-gradient(135deg, #FFD740, #FF5252)',
    full: 'linear-gradient(135deg, #536DFE, #00E5FF, #00E676, #FFD740)',
  }

  return (
    <Tag
      className={className}
      style={{
        background: gradients[gradient] || gradients.aurora,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}
