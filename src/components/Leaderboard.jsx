import { useState, useEffect } from 'react'
import { getLeaderboard } from '../lib/supabase'

const RANKS = [
  { min:0,   label:'Script Kiddie',    color:'#ef4444' },
  { min:30,  label:'Junior DevOps',    color:'#f59e0b' },
  { min:50,  label:'SRE Apprentice',   color:'#3b82f6' },
  { min:70,  label:'Platform Engineer',color:'#a855f7' },
  { min:90,  label:'Cloud Architect',  color:'#00d4aa' },
  { min:110, label:'10x Engineer',     color:'#ffd700' },
]
function getRank(wpm) {
  return [...RANKS].reverse().find(r => wpm >= r.min) || RANKS[0]
}

const MEDALS = ['🥇','🥈','🥉']

export default function Leaderboard({ newEntry }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLeaderboard().then(setEntries).catch(console.error).finally(() => setLoading(false))
  }, [])

  // Refresh when a new score is submitted
  useEffect(() => {
    if (newEntry) {
      getLeaderboard().then(setEntries).catch(console.error)
    }
  }, [newEntry])

  if (loading) return <div style={{fontSize:12,color:'var(--text-muted)',padding:'1rem'}}>loading leaderboard...</div>
  if (!entries.length) return <div style={{fontSize:12,color:'var(--text-muted)',padding:'1rem'}}>No scores yet — be the first!</div>

  return (
    <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',overflow:'hidden'}}>
      <div style={{
        background:'var(--bg-surface)',borderBottom:'1px solid var(--border)',
        padding:'0.7rem 1rem',fontSize:11,color:'var(--accent)',
        letterSpacing:'0.15em',textTransform:'uppercase',
        display:'flex',justifyContent:'space-between',
      }}>
        <span>🏆 Global Leaderboard</span>
        <span style={{color:'var(--text-muted)'}}>top 10</span>
      </div>
      {entries.map((e, i) => {
        const rank = getRank(e.wpm)
        return (
          <div key={e.id} style={{
            display:'flex',alignItems:'center',gap:'0.8rem',
            padding:'0.7rem 1rem',
            borderBottom: i < entries.length-1 ? '1px solid var(--border)' : 'none',
            background: i === 0 ? 'rgba(255,215,0,0.04)' : 'transparent',
          }}>
            <span style={{fontSize:16,width:24,textAlign:'center',flexShrink:0}}>
              {MEDALS[i] || `${i+1}`}
            </span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:'var(--text-primary)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{e.name}</div>
              <div style={{fontSize:10,color:rank.color}}>{rank.label}</div>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontSize:'1rem',fontWeight:800,color:rank.color,lineHeight:1}}>{e.wpm}</div>
              <div style={{fontSize:10,color:'var(--text-muted)'}}>WPM</div>
            </div>
            <div style={{textAlign:'right',flexShrink:0,minWidth:40}}>
              <div style={{fontSize:11,color:'var(--text-secondary)'}}>{e.accuracy}%</div>
              <div style={{fontSize:10,color:'var(--text-muted)'}}>acc</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
