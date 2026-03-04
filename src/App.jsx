import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import FloatingParticles from './components/FloatingParticles';
import { motion, useScroll, useSpring } from 'framer-motion';
import './index.css';

const SectionScanlines = () => {
  return (
    <div className="GlobalScanlines">
      <div className="ScanlineBeam" />
    </div>
  );
};

const EliteFooter = () => {
  return (
    <footer className="EliteFooter">
      <div className="FooterContainer">
        <div className="FooterLogo">R<span style={{ color: 'var(--nexus-accent)' }}>.</span>D</div>
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
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="PortfolioRoot">
      <SectionScanlines />
      <div className="EliteGrain" />
      <motion.div className="ScrollProgressBar" style={{ scaleX }} />
      <FloatingParticles />
      <Topbar />
      {isTransitioning && <div className="SceneTransition"></div>}
      <main className="MainViewport">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <EliteFooter />
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
