import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram,
  FiMail 
} from 'react-icons/fi';

const FloatingSocial = () => {
  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com', label: 'GitHub', color: 'text-gray-400 hover:text-white' },
    { icon: FiLinkedin, url: 'https://linkedin.com', label: 'LinkedIn', color: 'text-blue-400 hover:text-blue-300' },
    { icon: FiTwitter, url: 'https://twitter.com', label: 'Twitter', color: 'text-sky-400 hover:text-sky-300' },
    { icon: FiInstagram, url: 'https://instagram.com', label: 'Instagram', color: 'text-pink-400 hover:text-pink-300' },
    { icon: FiMail, url: 'mailto:contact@example.com', label: 'Email', color: 'text-tunis-yellow hover:text-tunis-yellow-light' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            whileHover={{ scale: 1.2, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 ${social.color} transition-all shadow-lg hover:shadow-neon-yellow`}
            aria-label={social.label}
          >
            <Icon size={20} />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default FloatingSocial;

