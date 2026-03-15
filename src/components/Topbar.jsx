import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Topbar.css';

const Topbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Home', icon: FiHome },
        { path: '/about', label: 'About', icon: FiUser },
        { path: '/projects', label: 'Projects', icon: FiBriefcase },
        { path: '/contact', label: 'Contact', icon: FiMail }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`Topbar ${isScrolled ? 'Scrolled' : ''}`}>
                <div className="TopbarContainer">
                    {/* Logo / Brand */}
                    <Link to="/" className="BrandLogo">
                        R<span className="AccentDot">.</span>D
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="DesktopNav">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        className={`TopNavLink ${active ? 'Active' : ''}`}
                                        aria-label={`Navigate to ${item.label}`}
                                    >
                                        <Icon className="NavIcon" />
                                        <span className="NavLabel">{item.label}</span>
                                        {active && (
                                            <motion.div
                                                layoutId="activeTabIndicator"
                                                className="ActiveIndicator"
                                            />
                                        )}
                                    </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="MobileMenuToggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="MobileNavOverlay"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="MobileNavList">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);

                                return (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`MobileNavLink ${active ? 'Active' : ''}`}
                                    >
                                        <Icon className="MobileNavIcon" />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Topbar;
