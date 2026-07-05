import React, { useEffect, Suspense } from 'react'
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
import ClientPortal from './pages/ClientPortal'
import KVKK from './pages/KVKK'
import Gizlilik from './pages/Gizlilik'
import AdminLogin from './pages/AdminLogin'

// Admin Panel
import AdminLayout from './pages/admin/AdminLayout'
import DashboardOverview from './pages/admin/DashboardOverview'
import AppointmentManager from './pages/admin/AppointmentManager'
import PatientManager from './pages/admin/PatientManager'
import InventoryManager from './pages/admin/InventoryManager'
import FinanceManager from './pages/admin/FinanceManager'
import StaffManager from './pages/admin/StaffManager'
import MessageManager from './pages/admin/MessageManager'
import NewsletterManager from './pages/admin/NewsletterManager'
import SettingsManager from './pages/admin/SettingsManager'
import ContentManager from './pages/admin/ContentManager'
import BlogManager from './pages/admin/BlogManager'

// Context & Security
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'

import './App.css'

// Lazy Loading for Heavy Components
const Blog = React.lazy(() => import('./pages/Blog'))

// Loading Screen
const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-main)' }}>
    <div style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
)

import { HelmetProvider } from 'react-helmet-async'

// Scroll to top on page change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Toaster position="bottom-right" theme="dark" richColors />
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Suspense fallback={<LoadingScreen />}>
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
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    
                    <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
                      <Route index element={<DashboardOverview />} />
                      <Route path="randevular" element={<AppointmentManager />} />
                      <Route path="hastalar" element={<PatientManager />} />
                      <Route path="stok" element={<InventoryManager />} />
                      <Route path="finans" element={<FinanceManager />} />
                      <Route path="personel" element={<StaffManager />} />
                      <Route path="mesajlar" element={<MessageManager />} />
                      <Route path="bulten" element={<NewsletterManager />} />
                      <Route path="ayarlar" element={<SettingsManager />} />
                      <Route path="icerik" element={<ContentManager />} />
                      <Route path="blog" element={<BlogManager />} />
                    </Route>
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <Chatbot />
            </div>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

export default App
