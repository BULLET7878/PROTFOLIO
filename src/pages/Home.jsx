import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiSettings } from 'react-icons/fi';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-tunis-dark">
      {/* Settings Icon - Far Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-full bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 text-tunis-yellow hover:bg-tunis-yellow/20 transition-all"
        >
          <FiSettings size={24} />
        </motion.button>
      </motion.div>

      {/* Left Column - Portrait */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-screen lg:min-h-screen py-20 lg:py-0">
        {/* Yellow Accent Shape */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="absolute top-0 left-0 w-[60%] h-[60vh] bg-tunis-yellow z-10"
          style={{
            clipPath: 'polygon(0 0, 70% 0, 85% 100%, 0 100%)',
            borderRadius: '0 0 100px 0',
          }}
        />

        {/* Portrait Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-20 w-[300px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[500px] lg:h-[600px]"
        >
          <div className="w-full h-full rounded-3xl overflow-hidden bg-tunis-gray-light border-4 border-tunis-yellow/30 shadow-2xl">
            <img
              src="/profile-photo.jpg"
              alt="Rahul Dhakad"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Column - Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 lg:px-16 py-20 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Yellow Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="h-1 bg-tunis-yellow mb-6"
          />

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-tunis-yellow mb-4 leading-tight"
          >
            I'M{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              RAHUL DHAKAD
            </motion.span>
            .
          </motion.h1>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8"
          >
            FULL STACK DEVELOPER
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl text-tunis-text-dark mb-10 leading-relaxed"
          >
            I'm a passionate full-stack developer focused on crafting clean & user-friendly
            experiences. I am passionate about building excellent software that improves
            the lives of those around me.
          </motion.p>

          {/* CTA Button */}
          <Link to="/about">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 px-8 py-4 border-2 border-tunis-yellow text-tunis-yellow font-semibold text-lg hover:bg-tunis-yellow hover:text-tunis-dark transition-all duration-300"
            >
              MORE ABOUT ME
              <motion.span
                className="w-10 h-10 rounded-full bg-tunis-yellow text-tunis-dark flex items-center justify-center"
                whileHover={{ rotate: 45 }}
              >
                <FiArrowRight size={20} />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
