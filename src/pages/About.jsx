import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { FiAward, FiTarget, FiHeart } from 'react-icons/fi';

const About = () => {
  const stats = [
    { number: '7+', label: 'Projects Completed', icon: FiAward },
    { number: '2+', label: 'Years Experience', icon: FiTarget },
    { number: '100%', label: 'Client Satisfaction', icon: FiHeart },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Started Journey',
      description: 'Began my career as a web developer',
    },
    {
      year: '2021',
      title: 'First Major Project',
      description: 'Launched my first commercial application',
    },
    {
      year: '2022',
      title: 'Expanded Skills',
      description: 'Learned modern frameworks and tools',
    },
    {
      year: '2023',
      title: 'Team Lead',
      description: 'Led a team of developers on multiple projects',
    },
    {
      year: '2024',
      title: 'Current',
      description: 'Building innovative solutions and mentoring others',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <SectionTitle title="About Me" subtitle="Get to know me better" />

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              <div className="w-full h-96 rounded-xl bg-gradient-to-br from-tunis-yellow/20 to-neon-blue/20 backdrop-blur-xl border border-tunis-yellow/20 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-tunis-yellow rounded-full flex items-center justify-center text-tunis-dark text-2xl font-bold"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                ✨
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-lg bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20"
                  >
                    <Icon className="text-tunis-yellow text-2xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-tunis-yellow mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-tunis-text-dark">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20">
              <h3 className="text-2xl font-bold text-tunis-yellow mb-4">
                Who I Am
              </h3>
              <p className="text-tunis-text-dark leading-relaxed mb-4">
                I'm a passionate full-stack developer with a love for creating
                beautiful, functional, and user-friendly web applications. With
                years of experience in modern web technologies, I bring ideas to
                life through code.
              </p>
              <p className="text-tunis-text-dark leading-relaxed">
                My journey in web development started with a curiosity about how
                websites work, and it has evolved into a career where I get to
                solve complex problems and create amazing digital experiences
                every day.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20">
              <h3 className="text-2xl font-bold text-tunis-yellow mb-4">
                What I Do
              </h3>
              <ul className="space-y-3">
                {[
                  'Frontend Development with React & Next.js',
                  'Backend Development with Node.js & Express',
                  'UI/UX Design & Prototyping',
                  'Mobile App Development',
                  'Cloud Deployment & DevOps',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-tunis-text-dark"
                  >
                    <span className="text-tunis-yellow">▸</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-tunis-yellow mb-8 text-center">
            My Journey
          </h3>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-tunis-yellow/30" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 md:text-right">
                    {index % 2 === 0 && (
                      <div className="p-6 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20">
                        <div className="text-tunis-yellow font-bold mb-2">
                          {item.year}
                        </div>
                        <h4 className="text-xl font-semibold text-tunis-text mb-2">
                          {item.title}
                        </h4>
                        <p className="text-tunis-text-dark">{item.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="relative z-10 w-16 h-16 rounded-full bg-tunis-yellow flex items-center justify-center text-tunis-dark font-bold text-lg">
                    {item.year.slice(-2)}
                  </div>
                  <div className="flex-1 md:text-left">
                    {index % 2 !== 0 && (
                      <div className="p-6 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20">
                        <div className="text-tunis-yellow font-bold mb-2">
                          {item.year}
                        </div>
                        <h4 className="text-xl font-semibold text-tunis-text mb-2">
                          {item.title}
                        </h4>
                        <p className="text-tunis-text-dark">{item.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

