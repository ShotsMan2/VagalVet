import React, { useEffect } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { HelmetProvider } from 'react-helmet-async'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import AnimatedRoutes from './components/AnimatedRoutes'

// Context & Security
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

import './App.css'

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
                <AnimatedRoutes />
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
