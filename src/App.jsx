import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Hero3D from './components/Hero3D';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'framer-motion';
import './index.css';

const BackgroundEffects = () => {
  return (
    <div className="GlobalBackground">
      <div className="AccentBeam" />
    </div>
  );
};

const SiteFooter = () => {
  return (
    <footer className="SiteFooter">
      <div className="FooterContainer">
        <div className="FooterLogo">R<span style={{ color: 'var(--primary-accent)' }}>.</span>D</div>
        <p className="CopyrightText">DHAKAD © 2025 All rights reserved</p>
      </div>
      <div className="FooterGlow" />
    </footer>
  );
};

function AppContent() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    // Reset scroll to top on path change
    window.scrollTo(0, 0);

    // Ensure browser doesn't restore scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="AppContainer">
      <BackgroundEffects />
      <motion.div className="ProgressBar" style={{ scaleX }} />
      <Hero3D currentPath={location.pathname} />
      <Topbar />
      {isTransitioning && <div className="PageTransition"></div>}
      <main className="PageWrapper">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
