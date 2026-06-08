import { useState } from 'react'
import useInView from './useInView'

const tagStyles = {
  platform: { bg:'var(--accent-glow)', color:'var(--accent)', border:'1px solid rgba(0,212,170,0.3)' },
  infra:    { bg:'var(--blue-dim)',    color:'var(--blue)',   border:'1px solid rgba(59,130,246,0.3)' },
  sre:      { bg:'var(--amber-dim)',   color:'var(--amber)',  border:'1px solid rgba(245,158,11,0.3)' },
  automation:{ bg:'var(--purple-dim)', color:'var(--purple)', border:'1px solid rgba(168,85,247,0.3)' },
}

const pods = [
  { name:'gesture-model', status:'running', info:'3 replicas', color:'#22c55e' },
  { name:'mediapipe-api', status:'running', info:'2 replicas', color:'#22c55e' },
  { name:'lstm-inference', status:'running', info:'1 replica', color:'#22c55e' },
  { name:'data-pipeline', status:'pending', info:'scaling', color:'var(--amber)' },
  { name:'tensorboard', status:'running', info:'monitoring', color:'var(--blue)' },
  { name:'legacy-model-v1', status:'deprecated', info:'EOL', color:'var(--red)' },
]

const projects = [
  {
    id:1, featured:true, tag:'platform', tagLabel:'Automation',
    title:'Grab-N-Drop Gesture Recognized file transfer system',
    desc:'Developed a browser-based touchless file transfer platform using MediaPipe, LSTM/GRU gesture recognition, WebRTC, WebSockets, and React.js, enabling real-time cross-device file sharing through Grab and Drop hand gestures with on-device AI inference, end-to-end privacy, and zero specialized hardware requirements.',
    stack:['React.js', 'MediaPipe', 'Python', 'LSTM/GRU', 'WebRTC', 'WebSockets', 'Node.js', 'Redis', 'Tailwind CSS', 'Three.js'],
    github:'https://github.com/Omkarchikalge/grab-n-drop',
  },
  {
    id:2, tag:'infra', tagLabel:'Research',
    title:'ICRAES 2026 Research Publication',
    desc:'Research paper titled "Comparative Review of Mixed Reality and Virtual Reality: Concepts, Systems, and Applications" presented at the 2nd International Conference on Recent Advances in Engineering and Sciences (ICRAES-2K26), analyzing XR architectures, interaction models, applications, and future trends.',
    stack:['Research','MR','VR','XR','ICRAES'],
    github:'public\\VR_MR_Paper.pdf',
  },
  {
    id:3, tag:'sre', tagLabel:'Infrastructure',
    title:'Platform Engineering Lab',
    desc:'Personal infrastructure learning environment built on Ubuntu WSL2. Hands-on practice with Linux administration, Git workflows, Docker containerization, and local Kubernetes clusters.',
    stack:['Linux','Docker','Kubernetes','WSL2','Git'],
    github:'In progress - will share setup scripts and documentation soon!',
  },
  {
    id:4, tag:'automation', tagLabel:'Open Source',
    title:'Open Source Contribution Journey',
    desc:'Contributing to open-source projects while learning pull requests, issue triage, and navigating large codebases. Currently exploring CNCF ecosystem projects and DevOps tooling.',
    stack:['Git','GitHub','Open Source','CNCF'],
    github:'Coming soon - will share contribution highlights and guides on my GitHub profile!',
  },
  {
    id:5, tag:'sre', tagLabel:'platform',
    title:'Autonomous Hackathon Idea Generator',
    desc:"Built an AI-powered multi-agent system using CrewAI and LangChain that autonomously researches, generates, evaluates, and prototypes hackathon ideas with automated pitch deck creation and feasibility analysis. Designed the system architecture, implemented agent workflows, and integrated with external APIs for data retrieval and presentation.",
    stack:['Python', 'CrewAI', 'LangChain', 'FastAPI', 'Streamlit', 'Claude/OpenAI API', 'SerpAPI', 'GitHub API', 'PostgreSQL/MongoDB', 'Docker.'],
    github:'https://github.com/Omkarchikalge/hackathon-ai-agent',
  },
  {
    id:6, tag:'automation', tagLabel:'AIML',
    title:'Ken AI - AI Search Engine ',
    desc:" Built a full-stack AI-powered search engine inspired by Perplexity AI with real-time streaming answers, source citations, and multi-turn conversation support. Designed the system architecture, implemented the backend with FastAPI and integrated large language models (LLMs) for natural language understanding and response generation. Developed a React frontend with a sleek UI/UX for seamless user interaction.",
    stack:['React', 'Node.js', 'Express', 'Supabase', 'Ollama (LLaMA 3)', 'Tavily Search API', 'Server-Sent Events (SSE)', 'Tailwind CSS'],
    github:'https://github.com/Omkarchikalge/ken-ai',
  },
]

function ProjectCard({ project }) {
  const [hov, setHov] = useState(false)
  const [ref, vis] = useInView()
  const ts = tagStyles[project.tag] || tagStyles.platform

  if (project.featured) {
    return (
      <div
        ref={ref}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{
          gridColumn:'1 / -1',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem',
          alignItems:'center',background:'var(--bg-card)',
          border:`1px solid ${hov?'var(--accent)':'var(--border)'}`,
          padding:'1.8rem',transition:'all 0.3s',position:'relative',overflow:'hidden',
          transform: hov?'translateY(-3px)':'none',
          opacity: vis?1:0, animation: vis?'fadeUp 0.6s ease forwards':'none'
        }}
        className="featured-card"
      >
        <div style={{
          position:'absolute',inset:0,
          background:'linear-gradient(135deg,var(--accent-glow) 0%,transparent 60%)',
          opacity: hov?1:0, transition:'opacity 0.3s', pointerEvents:'none'
        }}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem'}}>
            <span style={{fontSize:10,padding:'3px 8px',letterSpacing:'0.15em',textTransform:'uppercase',...ts}}>{project.tagLabel}</span>
            <a href={project.github} style={{color:'var(--text-muted)',textDecoration:'none',fontSize:16,transition:'color 0.2s'}}
               onMouseEnter={e=>e.target.style.color='var(--accent)'}
               onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>↗</a>
          </div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'1.4rem',fontWeight:700,color:'var(--text-primary)',marginBottom:'0.6rem'}}>{project.title}</div>
          <div style={{fontSize:12.5,color:'var(--text-secondary)',lineHeight:1.7,marginBottom:'1.2rem'}}>{project.desc}</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem'}}>
            {project.stack.map(s=>(
              <span key={s} style={{fontSize:10,padding:'3px 8px',background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',color:'var(--text-muted)'}}>{s}</span>
            ))}
          </div>
        </div>
        {/* Pod visual */}
        <div style={{
          background:'var(--bg-surface)',border:'1px solid var(--border)',
          borderRadius:4,padding:'1.2rem',fontSize:11,color:'var(--text-muted)',
          fontFamily:'var(--font-mono)',lineHeight:2,position:'relative',zIndex:1
        }}>
          {pods.map(p=>(
            <div key={p.name} style={{display:'flex',alignItems:'center',gap:'0.6rem',marginBottom:2}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:p.color,boxShadow:`0 0 6px ${p.color}`,flexShrink:0}}/>
              <span>{p.name}</span>
              <span style={{marginLeft:'auto',color:'var(--text-secondary)'}}>{p.info}</span>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){.featured-card{grid-template-columns:1fr!important}}`}</style>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:'var(--bg-card)',
        border:`1px solid ${hov?'var(--accent)':'var(--border)'}`,
        padding:'1.8rem',transition:'all 0.3s',position:'relative',overflow:'hidden',
        transform: hov?'translateY(-3px)':'none',
        opacity: vis?1:0, animation: vis?'fadeUp 0.6s ease forwards':'none'
      }}
    >
      <div style={{
        position:'absolute',inset:0,
        background:'linear-gradient(135deg,var(--accent-glow) 0%,transparent 60%)',
        opacity: hov?1:0,transition:'opacity 0.3s',pointerEvents:'none'
      }}/>
      <div style={{position:'relative',zIndex:1}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem'}}>
          <span style={{fontSize:10,padding:'3px 8px',letterSpacing:'0.15em',textTransform:'uppercase',...ts}}>{project.tagLabel}</span>
          <a href={project.github} style={{color:'var(--text-muted)',textDecoration:'none',fontSize:16,transition:'color 0.2s'}}
             onMouseEnter={e=>e.target.style.color='var(--accent)'}
             onMouseLeave={e=>e.target.style.color='var(--text-muted)'}>↗</a>
        </div>
        <div style={{fontFamily:'var(--font-display)',fontSize:'1.1rem',fontWeight:700,color:'var(--text-primary)',marginBottom:'0.6rem'}}>{project.title}</div>
        <div style={{fontSize:12.5,color:'var(--text-secondary)',lineHeight:1.7,marginBottom:'1.2rem'}}>{project.desc}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem'}}>
          {project.stack.map(s=>(
            <span key={s} style={{fontSize:10,padding:'3px 8px',background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',color:'var(--text-muted)'}}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-label">05 — projects</div>
      <h2><span style={{color:'var(--accent)'}}>$</span> ls projects</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginTop:'3rem'}} className="projects-grid">
        {projects.map(p => <ProjectCard key={p.id} project={p}/>)}
      </div>
      <style>{`@media(max-width:768px){.projects-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
