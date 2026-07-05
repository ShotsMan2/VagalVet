import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from '../pages/Home';
import Hizmetler from '../pages/Hizmetler';
import Ekibimiz from '../pages/Ekibimiz';
import Galeri from '../pages/Galeri';
import Iletisim from '../pages/Iletisim';
import Randevu from '../pages/Randevu';
import ClientPortal from '../pages/ClientPortal';
import KVKK from '../pages/KVKK';
import Gizlilik from '../pages/Gizlilik';
import AdminLogin from '../pages/AdminLogin';

// Admin Panel
import AdminLayout from '../pages/admin/AdminLayout';
import DashboardOverview from '../pages/admin/DashboardOverview';
import AppointmentManager from '../pages/admin/AppointmentManager';
import PatientManager from '../pages/admin/PatientManager';
import InventoryManager from '../pages/admin/InventoryManager';
import FinanceManager from '../pages/admin/FinanceManager';
import StaffManager from '../pages/admin/StaffManager';
import MessageManager from '../pages/admin/MessageManager';
import NewsletterManager from '../pages/admin/NewsletterManager';
import SettingsManager from '../pages/admin/SettingsManager';
import ContentManager from '../pages/admin/ContentManager';
import BlogManager from '../pages/admin/BlogManager';

import ProtectedRoute from './ProtectedRoute';

// Lazy Loading for Heavy Components
const Blog = React.lazy(() => import('../pages/Blog'));

// Loading Screen
const LoadingScreen = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-main)' }}>
    <div style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
);

// Page Wrapper for Animations
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/hizmetler" element={<PageWrapper><Hizmetler /></PageWrapper>} />
          <Route path="/ekibimiz" element={<PageWrapper><Ekibimiz /></PageWrapper>} />
          <Route path="/galeri" element={<PageWrapper><Galeri /></PageWrapper>} />
          <Route path="/iletisim" element={<PageWrapper><Iletisim /></PageWrapper>} />
          <Route path="/randevu" element={<PageWrapper><Randevu /></PageWrapper>} />
          <Route path="/hasta-sorgu" element={<PageWrapper><ClientPortal /></PageWrapper>} />
          <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="/kvkk" element={<PageWrapper><KVKK /></PageWrapper>} />
          <Route path="/gizlilik" element={<PageWrapper><Gizlilik /></PageWrapper>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<PageWrapper><AdminLogin /></PageWrapper>} />
          
          {/* Admin Layout wraps its own children, so we animate the layout */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><PageWrapper><AdminLayout /></PageWrapper></ProtectedRoute>}>
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
      </AnimatePresence>
    </Suspense>
  );
};

export default AnimatedRoutes;
