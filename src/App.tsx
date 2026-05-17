import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CursorGlow from './components/ui/CursorGlow'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import CSharp from './pages/CSharp'
import NanallyEngine from './pages/NanallyEngine'
import Projects from './pages/Projects'

function AppContent() {
  const location = useLocation()
  useLenis()

  return (
    <div className="noise min-h-screen bg-bg text-white font-sans">
      <CursorGlow />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/csharp" element={<CSharp />} />
          <Route path="/nanally-engine" element={<NanallyEngine />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}
