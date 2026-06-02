import { lazy, Suspense, memo } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CursorGlow from './components/ui/CursorGlow'

// Lazy-load all pages — each becomes its own chunk
// Users only download the JS for the page they visit
const Home = lazy(() => import('./pages/Home'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const CSharp = lazy(() => import('./pages/CSharp'))
const NanallyEngine = lazy(() => import('./pages/NanallyEngine'))
const Projects = lazy(() => import('./pages/Projects'))

// Minimal loading fallback — just keeps layout stable
// No spinner to avoid CLS and flashing
function PageLoader() {
  return <div className="min-h-screen" aria-hidden="true" />
}

// Memoized inner component — location changes but outer shell doesn't need to re-render
const AppContent = memo(function AppContent() {
  const location = useLocation()
  useLenis()

  return (
    <div className="noise min-h-screen bg-bg text-white font-sans">
      <CursorGlow />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/csharp" element={<CSharp />} />
            <Route path="/nanally-engine" element={<NanallyEngine />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  )
})

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}
