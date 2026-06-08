import { useState } from 'react'
import useInView from './useInView'
import SkillBars from './SkillBars'
import TypingGame from './TypingGame'

const roadmapStages = [
  { title:'Stage 1 — Foundations',    items:'Linux • Git • Networking • Bash • Python Automation', active: true  },
  { title:'Stage 2 — Containers',     items:'Docker • Container Networking • Compose • Image Optimization', active: false },
  { title:'Stage 3 — Orchestration',  items:'Kubernetes • Helm • Deployments • Services • Ingress', active: false },
  { title:'Stage 4 — Infrastructure', items:'Terraform • Cloud Infrastructure • Infrastructure as Code', active: false },
  { title:'Stage 5 — Reliability',    items:'Prometheus • Grafana • Alerting • SLOs • Incident Response', active: false },
]

function RoadmapCard({ title, items, active, delay }) {
  const [hov, setHov] = useState(false)
  const [ref, vis] = useInView()
  return (
    <div
      ref={ref}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:'var(--bg-card)',
        border:`1px solid ${active ? 'var(--accent)' : hov ? 'var(--border-glow)' : 'var(--border)'}`,
        padding:'1.5rem', transition:'all 0.2s',
        position:'relative', overflow:'hidden',
        transform: hov ? 'translateY(-2px)' : 'none',
        opacity: vis ? 1 : 0,
        animation: vis ? `fadeUp 0.5s ease ${delay}s forwards` : 'none',
      }}
    >
      {active && (
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:2,
          background:'var(--accent)',
          boxShadow:'0 0 10px var(--accent)',
        }}/>
      )}
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.8rem' }}>
        <div style={{
          fontSize:11, fontWeight:600, color: active ? 'var(--accent)' : 'var(--text-secondary)',
          letterSpacing:'0.15em', textTransform:'uppercase',
        }}>{title}</div>
        {active && <span style={{fontSize:9,padding:'2px 6px',background:'var(--accent-glow)',border:'1px solid var(--accent)',color:'var(--accent)',letterSpacing:'0.1em'}}>ACTIVE</span>}
      </div>
      <div style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.8}}>{items}</div>
    </div>
  )
}

export default function Skills() {
  return (
    <>
      {/* Skills with progress bars */}
      <section id="skills">
        <div className="section-label">02 — proficiency</div>
        <h2><span style={{color:'var(--accent)'}}>$</span> htop skills</h2>
        <div style={{ marginTop:'3rem' }}>
          <SkillBars />
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap">
        <div className="section-label">03 — roadmap</div>
        <h2><span style={{color:'var(--accent)'}}>$</span> cat roadmap.md</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'1.5rem',marginTop:'3rem'}}>
          {roadmapStages.map((s,i) => (
            <RoadmapCard key={s.title} {...s} delay={i*0.1}/>
          ))}
        </div>
      </section>

      {/* Typing Game */}
      <section id="game">
        <div className="section-label">04 — mini game</div>
        <h2><span style={{color:'var(--accent)'}}>$</span> ./typing-challenge</h2>
        <p style={{color:'var(--text-secondary)',fontSize:13,marginBottom:'2rem',marginTop:'0.5rem'}}>
          Think you type fast? Prove it with real DevOps commands.
        </p>
        <TypingGame />
      </section>
    </>
  )
}
