export default function Container({ children, className = '', style, as: Tag = 'div', ...props }) {
  return (
    <Tag className={`container-custom ${className}`} style={style} {...props}>
      {children}
    </Tag>
  )
}
