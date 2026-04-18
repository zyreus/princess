import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CuteBackground from './components/CuteBackground.jsx'
import { CustomCursor } from './components/CustomCursor.jsx'
import { CursorHoverProvider } from './context/CursorHoverProvider.jsx'
import BirthdayPage from './pages/BirthdayPage.jsx'
import SurpriseLetter from './pages/SurpriseLetter.jsx'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<BirthdayPage />} />
        <Route path="/letter" element={<SurpriseLetter />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CursorHoverProvider>
        <div className="relative min-h-screen overflow-x-hidden bg-[#0a0212] lg:cursor-none">
          <CuteBackground />
          <CustomCursor />
          <div className="relative z-[1]">
            <AnimatedRoutes />
          </div>
        </div>
      </CursorHoverProvider>
    </BrowserRouter>
  )
}
