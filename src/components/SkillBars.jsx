import { useRef, useEffect, useState } from 'react'

const SKILL_GROUPS = [
  {
    title: 'Foundation',
    icon: '🐧',
    skills: [
      { name: 'Linux (Ubuntu/WSL2)', level: 65, color: '#f59e0b' },
      { name: 'Git & GitHub', level: 72, color: '#00d4aa' },
      { name: 'Bash Scripting', level: 55, color: '#3b82f6' },
      { name: 'Networking Fundamentals', level: 48, color: '#a855f7' },
    ],
  },
  {
    title: 'Programming',
    icon: '💻',
    skills: [
      { name: 'Python', level: 68, color: '#3b82f6' },
      { name: 'JavaScript', level: 55, color: '#f59e0b' },
      { name: 'YAML / JSON', level: 70, color: '#00d4aa' },
    ],
  },
  {
    title: 'Cloud & DevOps (Learning)',
    icon: '☁️',
    skills: [
      { name: 'Docker', level: 40, color: '#3b82f6' },
      { name: 'Kubernetes', level: 20, color: '#00d4aa' },
      { name: 'Terraform', level: 18, color: '#a855f7' },
      { name: 'CI/CD (GitHub Actions)', level: 35, color: '#f59e0b' },
    ],
  },
]

function SkillBar({ name, level, color, animate }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setWidth(level), 120)
      return () => clearTimeout(timeout)
    }
  }, [animate, level])

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: 11, color, fontWeight: 600 }}>{animate ? width : 0}%</span>
          <span style={{
            fontSize: 9, padding: '2px 6px',
            border: `1px solid ${color}44`,
            color: color, letterSpacing: '0.08em',
          }}>
            {level >= 60 ? 'COMFORTABLE' : level >= 35 ? 'LEARNING' : 'BEGINNER'}
          </span>
        </div>
      </div>
      {/* Track */}
      <div style={{
        height: 6, background: 'var(--border)',
        borderRadius: 3, overflow: 'hidden', position: 'relative',
      }}>
        {/* Fill */}
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 3,
          transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: `0 0 8px ${color}66`,
        }} />
        {/* Shimmer */}
        {animate && (
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${width}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease infinite',
            borderRadius: 3,
          }} />
        )}
      </div>
    </div>
  )
}

function SkillGroup({ title, icon, skills, animate }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      padding: '1.5rem',
      transition: 'border-color 0.3s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-glow)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        fontSize: 11, fontWeight: 600, color: 'var(--accent)',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        marginBottom: '1.2rem',
      }}>
        <span style={{ fontSize: 18 }}>{icon}</span> {title}
      </div>
      {skills.map(s => <SkillBar key={s.name} {...s} animate={animate} />)}
    </div>
  )
}

export default function SkillBars() {
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimate(true); obs.disconnect() }
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Self-assessed proficiency — honest about where I am in my learning journey.
        </div>
        <button
          onClick={() => { setAnimate(false); setTimeout(() => setAnimate(true), 50) }}
          style={{
            fontSize: 11, padding: '4px 12px',
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >↺ replay</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {SKILL_GROUPS.map((g, i) => (
          <SkillGroup key={g.title} {...g} animate={animate} />
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0 }
          100% { background-position: 200% 0 }
        }
      `}</style>
    </div>
  )
}
