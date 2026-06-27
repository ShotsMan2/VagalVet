import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Hizmetler from './pages/Hizmetler'
import Ekibimiz from './pages/Ekibimiz'
import Galeri from './pages/Galeri'
import Iletisim from './pages/Iletisim'
import Randevu from './pages/Randevu'
import HastaSorgu from './pages/HastaSorgu'
import Blog from './pages/Blog'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

// Scroll to top on page change
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hizmetler" element={<Hizmetler />} />
            <Route path="/ekibimiz" element={<Ekibimiz />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/iletisim" element={<Iletisim />} />
            <Route path="/randevu" element={<Randevu />} />
            <Route path="/hasta-sorgu" element={<HastaSorgu />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
