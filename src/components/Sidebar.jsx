import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiMail, FiCode, FiAward } from 'react-icons/fi';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/about', label: 'About', icon: FiUser },
    { path: '/projects', label: 'Projects', icon: FiBriefcase },
    { path: '/contact', label: 'Contact', icon: FiMail }
  ];

  const isActive = (path) => {
    if (path === '/about') {
      return location.pathname === '/about';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`MobileToggle ${isOpen ? 'IsActive' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <div className="HamburgerIcon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Navigation Overlay for Mobile */}
      <div className={`NavOverlay ${isOpen ? 'IsVisible' : ''}`} onClick={() => setIsOpen(false)}></div>

      <aside className={`NavigationMenu ${isOpen ? 'MobileOpen' : ''}`}>
        <nav className="NavItemsList">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const hover = hoveredItem === index;

            return (
              <div
                key={index}
                className="NavItemWrapper"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`NavButton ${active ? 'ActivePage' : ''} ${hover ? 'IsHovered' : ''}`}
                >
                  <Icon className="NavIcon" />
                  <span className="NavLabel">{item.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
