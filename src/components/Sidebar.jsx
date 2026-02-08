import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiBriefcase, FiMail } from 'react-icons/fi';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/about', label: 'Profile', icon: FiUser },
    { path: '/projects', label: 'Work', icon: FiBriefcase },
    { path: '/contact', label: 'Contact', icon: FiMail }
  ];

  const isActive = (path) => {
    if (path === '/about') {
      return location.pathname === '/about';
    }
    return location.pathname === path;
  };

  return (
    <aside className="menu">
      <nav className="items">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const hover = hoveredItem === index;
          
          return (
            <div
              key={index}
              className="item"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={item.path}
                className={`btn ${active ? 'active' : ''} ${hover ? 'hover' : ''}`}
              >
                <Icon className="icon" />
                <span className="text">{item.label}</span>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
