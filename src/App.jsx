import { useState } from 'react'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GlobeSection from './components/GlobeSection'
import Guestbook from './components/Guestbook'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIChatbot from './components/AIChatbot'
import EasterEggs from './components/EasterEggs'
import Toolbar from './components/Toolbar'
import useTheme from './components/useTheme'

export default function App() {
  const [dark, setDark] = useTheme()
  const [soundEnabled, setSoundEnabled] = useState(false) // off by default

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <EasterEggs soundEnabled={soundEnabled} />
      <Navbar dark={dark} />
      <Toolbar dark={dark} setDark={setDark} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
      <main>
        <Hero soundEnabled={soundEnabled} />
        <About />
        <Skills />
        <Projects />
        <GlobeSection />
        <Guestbook soundEnabled={soundEnabled} />
        <Contact />
      </main>
      <Footer />
      <AIChatbot soundEnabled={soundEnabled} />
    </>
  )
}
