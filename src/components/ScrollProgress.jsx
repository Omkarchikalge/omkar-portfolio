import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const s = document.documentElement
      const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100
      if (ref.current) ref.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div ref={ref} style={{
      position:'fixed',top:0,left:0,height:2,background:'var(--accent)',
      zIndex:2000,width:'0%',transition:'width 0.1s',
      boxShadow:'0 0 10px var(--accent)'
    }}/>
  )
}
