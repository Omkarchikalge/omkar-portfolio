import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ mx:0, my:0, rx:0, ry:0 })

  useEffect(() => {
    const onMove = e => { pos.current.mx = e.clientX; pos.current.my = e.clientY }
    document.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      const p = pos.current
      if (dotRef.current) { dotRef.current.style.left = p.mx+'px'; dotRef.current.style.top = p.my+'px' }
      p.rx += (p.mx - p.rx) * 0.15
      p.ry += (p.my - p.ry) * 0.15
      if (ringRef.current) { ringRef.current.style.left = p.rx+'px'; ringRef.current.style.top = p.ry+'px' }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const grow = () => {
      if (ringRef.current) { ringRef.current.style.width='50px'; ringRef.current.style.height='50px'; ringRef.current.style.opacity='0.8' }
    }
    const shrink = () => {
      if (ringRef.current) { ringRef.current.style.width='32px'; ringRef.current.style.height='32px'; ringRef.current.style.opacity='0.5' }
    }
    const targets = document.querySelectorAll('a,button,.project-card,.skill-category,.cert-card')
    targets.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        width:6,height:6,background:'var(--accent)',borderRadius:'50%',
        position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9999,
        transform:'translate(-50%,-50%)',transition:'transform 0.05s'
      }}/>
      <div ref={ringRef} style={{
        width:32,height:32,border:'1px solid var(--accent)',borderRadius:'50%',
        position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9998,
        transform:'translate(-50%,-50%)',
        transition:'transform 0.12s ease, width 0.2s, height 0.2s, opacity 0.2s',
        opacity:0.5
      }}/>
    </>
  )
}
