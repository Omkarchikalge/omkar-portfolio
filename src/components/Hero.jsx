import { useState } from 'react'
import useInView from './useInView'
import Terminal from './Terminal'

export default function Hero({ soundEnabled }) {

  return (
    <section id="hero" style={{
      minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',
      paddingTop:'5rem',maxWidth:1100,margin:'0 auto',padding:'5rem 2.5rem 4rem',
      position:'relative',zIndex:1
    }}>
      <div style={{display:'grid',gridTemplateColumns:'1.2fr 340px',gap:'1rem',alignItems:'start'}} className="hero-layout">
        <div>
          {/* Eyebrow */}
          <div style={{
            fontSize:12,color:'var(--accent)',letterSpacing:'0.2em',textTransform:'uppercase',
            marginBottom:'1.5rem',display:'flex',alignItems:'center',gap:'0.75rem'
          }}>
            <span style={{animation:'blink 1.2s step-end infinite',fontSize:8}}>▶</span>
            available for opportunities
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily:'var(--font-display)',
            fontSize:'clamp(3.5rem, 9vw, 7rem)',fontWeight:800,lineHeight:0.95,
            letterSpacing:'-0.02em',color:'var(--text-primary)',marginBottom:'1rem'
          }}>
            <span style={{color:'var(--accent)'}}>O</span>mkar<br/><span style={{color:'var(--accent)'}}>C</span>hikalge
          </h1>

          <div style={{
            fontFamily:'var(--font-display)',fontSize:'clamp(1.1rem,2.5vw,1.6rem)',
            fontWeight:500,color:'var(--text-secondary)',marginBottom:'2rem'
          }}>
            Aspiring Platform Engineer &amp; Site Reliability Engineer
          </div>

          {/* Interactive Terminal */}
          <div style={{maxWidth:580,marginBottom:'2rem'}}>
            <Terminal soundEnabled={soundEnabled} />
          </div>

          {/* CTA */}
          <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
            <a href="#projects" style={{
              display:'inline-flex',alignItems:'center',gap:'0.5rem',
              padding:'0.8rem 1.8rem',background:'var(--accent)',color:'#000',
              fontFamily:'var(--font-mono)',fontSize:12,fontWeight:600,
              letterSpacing:'0.1em',textTransform:'uppercase',textDecoration:'none',
              transition:'all 0.2s',border:'none'
            }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow='0 0 30px var(--accent-glow-strong)'}
            onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}
            >view projects ↓</a>
            <a href="#contact" style={{
              display:'inline-flex',alignItems:'center',gap:'0.5rem',
              padding:'0.8rem 1.8rem',border:'1px solid var(--border-glow)',
              color:'var(--text-secondary)',fontFamily:'var(--font-mono)',
              fontSize:12,letterSpacing:'0.1em',textTransform:'uppercase',textDecoration:'none',
              transition:'all 0.2s'
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';e.currentTarget.style.background='var(--accent-glow)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-glow)';e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.background='transparent'}}
            >get in touch →</a>
          </div>

          {/* Stats */}
          <div style={{
            display:'flex',gap:'3rem',marginTop:'4rem',
            paddingTop:'2rem',borderTop:'1px solid var(--border)',flexWrap:'wrap'
          }}>
            {[['3+','Technical Projects'],['1','Research Publication'],['OSS','Open Source Contributor']].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:'var(--font-display)',fontSize:'2rem',fontWeight:800,color:'var(--accent)',lineHeight:1}}>{n}</div>
                <div style={{fontSize:11,color:'var(--text-muted)',letterSpacing:'0.1em',textTransform:'uppercase',marginTop:'0.3rem'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait side */}
        <div style={{ paddingTop: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-right">
            <img
              src="/omkar.jpg"
              alt="Omkar Chikalge"
              style={{
                width: 650,
                height: 600,
                marginLeft: '7rem', borderRadius: 16, objectFit: 'cover',
                display: 'block',
                filter: 'drop-shadow(0 0 16px var(--accent))',
              }}
            />
          </div>
      </div>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:900px){
          .hero-layout{grid-template-columns:1fr!important}
          .hero-right{order:-1;padding-top:0!important;margin-bottom:2rem}
        }
      `}</style>
    </section>
  )
}
