import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Hero = ({ setActiveSection }) => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('about');
    }
  };

  return (
    <section id="home" className="min-h-screen relative flex">
      {/* Yellow Background Shape */}
      <div className="yellow-shape"></div>
      
      {/* Left Side - Portrait Image */}
      <div className="portrait-container w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
            alt="Rahul Dhakad"
            className="portrait-image"
          />
        </motion.div>
      </div>

      {/* Right Side - Content */}
      <div className="content-section w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg"
        >
          {/* Yellow line */}
          <div className="w-16 h-1 bg-tunis-yellow mb-4"></div>
          
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="tunis-heading mb-4"
          >
            I'M RAHUL DHAKAD.
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="tunis-subheading mb-8"
          >
            FULL STACK DEVELOPER | AI & ML ENTHUSIAST
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-white text-lg leading-relaxed mb-8"
          >
            I'm an AI-ML student at Newton School of Technology with strong expertise in Data Structures & Algorithms and Python programming. I'm passionate about web development, artificial intelligence, and building creative solutions that make a difference.
          </motion.p>

          {/* More About Me Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            onClick={scrollToAbout}
            className="tunis-button flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>MORE ABOUT ME</span>
            <div className="arrow-button group-hover:translate-x-1 transition-transform duration-300">
              <FaArrowRight className="text-sm" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
