import { useState, useEffect } from 'react'
import useInView from './useInView'
import { getGuestbook, addGuestbookEntry, getVisitorCount, trackVisit } from '../lib/supabase'

const AVATARS = ['🧑‍💻','👩‍💻','🐧','🦊','🚀','⚡','🌟','🎯','🔥','💡','🦄','🐳']
const VISITOR_KEY = 'portfolio_visitor_id'

function getVisitorId() {
  let id = localStorage.getItem(VISITOR_KEY)
  if (!id) { id = 'v_' + Math.random().toString(36).slice(2,10); localStorage.setItem(VISITOR_KEY, id) }
  return id
}

export default function Guestbook() {
  const [ref, vis] = useInView()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [visitorCount, setVisitorCount] = useState(0)
  const [form, setForm] = useState({ name: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const visitorId = getVisitorId()
    // Track visit + load data in parallel
    Promise.all([
      getGuestbook(),
      getVisitorCount(),
      trackVisit(visitorId),
    ]).then(([entries, count]) => {
      setEntries(entries)
      setVisitorCount(count)
    }).catch(console.error)
    .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) { setError('Both fields are required.'); return }
    if (form.message.length > 200) { setError('Keep it under 200 characters.'); return }
    setError('')
    setSubmitting(true)
    try {
      const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)]
      const [newEntry] = await addGuestbookEntry({ name: form.name.trim(), message: form.message.trim(), avatar })
      setEntries(prev => [newEntry, ...prev])
      setForm({ name: '', message: '' })
      setSubmitted(true)
    } catch { setError('Failed to post — please try again.') }
    finally { setSubmitting(false) }
  }

  const timeAgo = (ts) => {
    const diff = (Date.now() - new Date(ts).getTime()) / 1000
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`
    return `${Math.floor(diff/86400)}d ago`
  }

  return (
    <section id="guestbook" ref={ref}>
      <div className="section-label">07 — guestbook</div>
      <h2><span style={{color:'var(--accent)'}}>$</span> cat guestbook.log</h2>

      {/* Visitor counter */}
      <div style={{
        display:'inline-flex',alignItems:'center',gap:'0.8rem',
        background:'var(--bg-card)',border:'1px solid var(--border)',
        padding:'0.7rem 1.2rem',marginBottom:'2rem',marginTop:'0.5rem',
      }}>
        <span style={{fontSize:18}}>👁</span>
        <div>
          <span style={{fontFamily:'var(--font-display)',fontSize:'1.4rem',fontWeight:800,color:'var(--accent)'}}>
            {visitorCount.toLocaleString()}
          </span>
          <span style={{fontSize:12,color:'var(--text-muted)',marginLeft:'0.5rem'}}>unique visitors</span>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2rem',alignItems:'start'}} className="gb-grid">
        {/* Form */}
        <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',padding:'1.5rem',opacity:vis?1:0,transition:'opacity 0.6s ease'}}>
          <div style={{fontSize:11,color:'var(--accent)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'1.2rem'}}>
            {submitted ? '✓ signed — thanks!' : '$ sign guestbook'}
          </div>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              {[{label:'name',key:'name',type:'text',placeholder:'your name or handle',max:40},
                {label:'message',key:'message',type:'textarea',placeholder:'say something...',max:200}
              ].map(({label,key,type,placeholder,max}) => (
                <div key={key}>
                  <div style={{fontSize:11,color:'var(--text-muted)',marginBottom:'0.4rem',letterSpacing:'0.08em'}}>
                    <span style={{color:'var(--accent)'}}>--</span>{label}
                    {key==='message' && <span style={{color:'var(--text-muted)',marginLeft:'0.4rem'}}>({form.message.length}/200)</span>}
                  </div>
                  {type === 'textarea' ? (
                    <textarea value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                      placeholder={placeholder} rows={3} maxLength={max}
                      style={{width:'100%',padding:'0.6rem 0.9rem',background:'var(--bg-surface)',border:'1px solid var(--border)',color:'var(--text-primary)',fontFamily:'var(--font-mono)',fontSize:12,outline:'none',resize:'vertical'}}
                      onFocus={e=>e.target.style.borderColor='var(--accent)'}
                      onBlur={e=>e.target.style.borderColor='var(--border)'}/>
                  ) : (
                    <input type={type} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                      placeholder={placeholder} maxLength={max}
                      style={{width:'100%',padding:'0.6rem 0.9rem',background:'var(--bg-surface)',border:'1px solid var(--border)',color:'var(--text-primary)',fontFamily:'var(--font-mono)',fontSize:12,outline:'none'}}
                      onFocus={e=>e.target.style.borderColor='var(--accent)'}
                      onBlur={e=>e.target.style.borderColor='var(--border)'}/>
                  )}
                </div>
              ))}
              {error && <div style={{fontSize:11,color:'var(--red)'}}>{error}</div>}
              <button type="submit" disabled={submitting} style={{
                padding:'0.65rem 1.5rem',alignSelf:'flex-start',
                background:submitting?'var(--border)':'var(--accent)',
                color:submitting?'var(--text-muted)':'#000',
                border:'none',fontFamily:'var(--font-mono)',
                fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',transition:'all 0.2s',
              }}>{submitting?'posting...':'sign ✍'}</button>
            </form>
          ) : (
            <div style={{textAlign:'center',padding:'2rem 1rem'}}>
              <div style={{fontSize:40,marginBottom:'0.8rem'}}>🎉</div>
              <div style={{fontSize:13,color:'var(--text-secondary)'}}>Your message is live — everyone can see it!</div>
            </div>
          )}
        </div>

        {/* Feed */}
        <div style={{display:'flex',flexDirection:'column',gap:'0.8rem',maxHeight:420,overflowY:'auto',scrollbarWidth:'thin',scrollbarColor:'var(--border) transparent',paddingRight:'0.3rem'}}>
          {loading && <div style={{fontSize:12,color:'var(--text-muted)',padding:'1rem'}}>loading entries...</div>}
          {!loading && entries.length === 0 && <div style={{fontSize:12,color:'var(--text-muted)',padding:'1rem'}}>No entries yet — be the first to sign!</div>}
          {entries.map((entry,i) => (
            <div key={entry.id} style={{
              background:'var(--bg-card)',border:'1px solid var(--border)',padding:'0.9rem 1rem',
              opacity:vis?1:0,transform:vis?'none':'translateY(10px)',
              transition:`opacity 0.5s ease ${i*0.06}s,transform 0.5s ease ${i*0.06}s`,
            }}>
              <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.4rem'}}>
                <span style={{fontSize:18}}>{entry.avatar||'🧑‍💻'}</span>
                <span style={{fontSize:12,fontWeight:600,color:'var(--text-primary)'}}>{entry.name}</span>
                <span style={{marginLeft:'auto',fontSize:10,color:'var(--text-muted)'}}>{timeAgo(entry.created_at)}</span>
              </div>
              <div style={{fontSize:12,color:'var(--text-secondary)',lineHeight:1.6}}>{entry.message}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.gb-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
