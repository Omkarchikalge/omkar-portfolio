import { useState } from 'react'
import useInView from './useInView'

const learningPath = [
  {
    logo: '/logos/Linux.svg',
    name: 'Linux & Platform Engineering Journey',
    provider: 'Currently Building Foundations'
  },
  {
    logo: '/logos/Docker.svg',
    name: 'Docker & Containers',
    provider: 'Actively Learning'
  },
  {
    logo: '/logos/Kubernetes.svg',
    name: 'Kubernetes',
    provider: 'Next Focus Area'
  },
  {
    logo: '/logos/HashiCorp Terraform.svg',
    name: 'Terraform & IaC',
    provider: 'Planned Learning Path'
  },
]

function CertCard({ logo, name, provider }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
        padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem',
        transition: 'border-color 0.2s, background 0.2s'
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <img
          src={logo}
          alt={name}
          draggable="false"
          style={{
            width: 30,
            height: 30,
            objectFit: 'contain',
            filter: hov
              ? 'drop-shadow(0 0 6px rgba(0,212,170,0.45))'
              : 'none',
            transition: 'filter 0.2s ease',
          }}
        />
      </div>
      <div>
        <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{provider}</div>
      </div>
    </div>
  )
}

export default function About() {
  const [ref1, v1] = useInView()
  const [ref2, v2] = useInView()

  return (
    <section id="about">
      <div className="section-label">01 — about</div>
      <h2>Building cloud-native systems<br />and platform foundations.</h2>

      <div style={{ display: 'grid', gap: '3rem', marginTop: '3rem', alignItems: 'start', gridTemplateColumns: '1fr 1fr' }} className="about-grid">

        <div ref={ref1} className={`fade-in${v1 ? ' visible' : ''}`}>
          {[
            <><strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Omkar Chikalge</strong> is an engineering student focused on <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Platform Engineering</strong>, <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Site Reliability Engineering</strong>, Linux, and cloud-native infrastructure.</>,
            <>My journey is centered on building a strong foundation in Linux, Docker, Kubernetes, Terraform, networking, and automation while contributing to open-source projects and developing hands-on technical solutions.</>,
            <>I'm particularly interested in developer experience, infrastructure automation, observability, and reliability engineering. Great platforms enable developers to move faster, build confidently, and operate systems more efficiently.</>,
            <>Currently gaining practical experience through personal infrastructure labs, open-source contributions, research work, and cloud-native projects as I work toward becoming a Platform Engineer and Site Reliability Engineer.</>
          ].map((p, i) => (
            <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1rem', fontSize: '13.5px' }}>{p}</p>
          ))}
        </div>

        <div ref={ref2} className={`fade-in${v2 ? ' visible' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {learningPath.map((item, i) => (
            <CertCard key={i} {...item} />
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
