import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { HistoryPage } from './pages/HistoryPage'
import { TemplePage } from './pages/TemplePage'
import { ExplorePage } from './pages/ExplorePage'
import { ArtPage } from './pages/ArtPage'
import { WorshipPage } from './pages/WorshipPage'
import { ThanjavurPage } from './pages/ThanjavurPage'
import { TributePage } from './pages/TributePage'
import { ScrollToTop } from './components/ScrollToTop'
import { ThemeToggle } from './components/ThemeToggle'
import { ImageReveal } from './components/ImageReveal'
import { ImageLightboxProvider } from './components/ImageLightbox'

function ScrollAndBodyMode() {
  const { pathname } = useLocation()

  useEffect(() => {
    const isFrame = pathname === '/'
    document.body.style.overflow = isFrame ? 'hidden' : 'visible'
    document.documentElement.classList.toggle('is-scroll-page', !isFrame)
    window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
      document.documentElement.classList.remove('is-scroll-page')
    }
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ImageLightboxProvider>
        <ScrollAndBodyMode />
        <ScrollToTop />
        <ThemeToggle />
        <ImageReveal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/the-temple" element={<TemplePage />} />
          <Route
            path="/the-temple/chapters"
            element={<Navigate to="/the-temple" replace />}
          />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/worship" element={<WorshipPage />} />
          <Route path="/thanjavur" element={<ThanjavurPage />} />
          <Route path="/tribute" element={<TributePage />} />
        </Routes>
      </ImageLightboxProvider>
    </BrowserRouter>
  )
}
