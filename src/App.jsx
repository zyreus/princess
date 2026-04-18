import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
        <div className="relative min-h-screen bg-[#0a0212] lg:cursor-none">
          <div className="pointer-events-none fixed -left-32 -top-32 h-96 w-96 rounded-full bg-violet-900/30 blur-[120px]" />
          <div className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-fuchsia-900/20 blur-[120px]" />
          <CustomCursor />
          <AnimatedRoutes />
        </div>
      </CursorHoverProvider>
    </BrowserRouter>
  )
}
