import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiMail,
  FiMessageCircle 
} from 'react-icons/fi';

const FloatingNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/about', icon: FiUser, label: 'About' },
    { path: '/portfolio', icon: FiBriefcase, label: 'Portfolio' },
    { path: '/contact', icon: FiMail, label: 'Contact' },
    { path: '/contact', icon: FiMessageCircle, label: 'Message' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Link key={index} to={item.path}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-tunis-yellow text-tunis-dark border-2 border-tunis-yellow shadow-neon-yellow'
                  : 'bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 text-white hover:bg-tunis-yellow/20 hover:border-tunis-yellow/50'
              }`}
              aria-label={item.label}
            >
              <Icon size={20} />
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default FloatingNavigation;

