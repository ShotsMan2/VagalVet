import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import Hizmetler from './pages/Hizmetler'
import Ekibimiz from './pages/Ekibimiz'
import Galeri from './pages/Galeri'
import Iletisim from './pages/Iletisim'
import Randevu from './pages/Randevu'
import Blog from './pages/Blog'
import AdminDashboard from './pages/AdminDashboard'
import ClientPortal from './pages/ClientPortal'
import KVKK from './pages/KVKK'
import Gizlilik from './pages/Gizlilik'
import './App.css'

// Scroll to top on page change
// Removed duplicated imports

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
      <Toaster position="bottom-right" theme="dark" richColors />
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
            <Route path="/hasta-sorgu" element={<ClientPortal />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/kvkk" element={<KVKK />} />
            <Route path="/gizlilik" element={<Gizlilik />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  )
}

export default App
