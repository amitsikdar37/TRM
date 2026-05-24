import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { getTheme } from './data';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh ScrollTrigger on route change
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      const theme = await getTheme();
      if (theme) {
        const root = document.documentElement;
        if (theme.primary) root.style.setProperty('--primary', theme.primary);
        if (theme.onPrimary) root.style.setProperty('--on-primary', theme.onPrimary);
        if (theme.primaryContainer) root.style.setProperty('--primary-container', theme.primaryContainer);
        if (theme.onPrimaryContainer) root.style.setProperty('--on-primary-container', theme.onPrimaryContainer);
        if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
        if (theme.onSecondary) root.style.setProperty('--on-secondary', theme.onSecondary);
        if (theme.surface) root.style.setProperty('--surface', theme.surface);
        if (theme.onSurface) root.style.setProperty('--on-surface', theme.onSurface);
      }
      setThemeLoaded(true);
    }
    loadTheme();
  }, []);

  if (!themeLoaded) return null; // Avoid flashing old colors

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
