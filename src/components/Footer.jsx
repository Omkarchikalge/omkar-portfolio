export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '1.5rem 2.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      maxWidth: 1100, margin: '0 auto',
      fontSize: 11, color: 'var(--text-muted)',
      position: 'relative', zIndex: 1,
      flexWrap: 'wrap', gap: '0.5rem',
    }}>
      <span>© 2025 Omkar Chikalge · Platform Engineer in the making.</span>
      <span style={{ color: 'var(--accent)' }}>platform-engineer@pune ~</span>
    </footer>
  )
}
