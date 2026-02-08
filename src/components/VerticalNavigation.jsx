import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaHome, FaUser, FaBriefcase, FaEnvelope, FaComment } from 'react-icons/fa';

const VerticalNavigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', icon: FaHome, label: 'Home' },
    { id: 'about', icon: FaUser, label: 'About' },
    { id: 'skills', icon: FaLightbulb, label: 'Skills' },
    { id: 'projects', icon: FaBriefcase, label: 'Projects' },
    { id: 'contact', icon: FaEnvelope, label: 'Contact' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="vertical-nav"
    >
      {navItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
          className={`tunis-nav-icon ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => scrollToSection(item.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <item.icon className="text-lg" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VerticalNavigation;
