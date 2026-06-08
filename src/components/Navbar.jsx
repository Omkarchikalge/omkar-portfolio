import { useState, useEffect } from 'react'

const links = ['about','skills','game','projects','location','guestbook','contact']

export default function Navbar({ dark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:900,
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'1.2rem 3rem',
      background: scrolled ? 'rgba(8,11,15,0.95)' : 'rgba(8,11,15,0.85)',
      backdropFilter:'blur(20px)',
      borderBottom:'1px solid var(--border)',
      transition:'background 0.3s'
    }}>
      <div style={{fontFamily:'var(--font-mono)',fontSize:13,color:'var(--accent)',letterSpacing:'0.05em'}}>
        <span style={{color:'var(--text-muted)'}}>~/</span>omkar<span style={{color:'var(--text-muted)'}}>@sre</span>
      </div>

      {/* Desktop links */}
      <ul style={{display:'flex',gap:'2rem',listStyle:'none',margin:0,padding:0}} className="nav-desktop">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`} style={{
              fontSize:12,color:'var(--text-secondary)',textDecoration:'none',
              letterSpacing:'0.1em',textTransform:'uppercase',transition:'color 0.2s',
              position:'relative'
            }}
            onMouseEnter={e => e.target.style.color='var(--accent)'}
            onMouseLeave={e => e.target.style.color='var(--text-secondary)'}
            >{l}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" style={{
        fontSize:12,padding:'0.5rem 1.2rem',border:'1px solid var(--accent)',
        color:'var(--accent)',textDecoration:'none',letterSpacing:'0.08em',
        textTransform:'uppercase',transition:'all 0.2s',fontFamily:'var(--font-mono)'
      }}
      onMouseEnter={e=>{e.currentTarget.style.background='var(--accent-glow)';e.currentTarget.style.boxShadow='0 0 20px var(--accent-glow-strong)'}}
      onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.boxShadow='none'}}
      >hire me ↗</a>

      <style>{`
        @media(max-width:768px){.nav-desktop{display:none!important}}
      `}</style>
    </nav>
  )
}
