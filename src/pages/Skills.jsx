import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import SkillBar from '../components/SkillBar';
import {
  FiCode,
  FiDatabase,
  FiLayers,
  FiSmartphone,
  FiCloud,
  FiSettings,
} from 'react-icons/fi';

const Skills = () => {
  const frontendSkills = [
    { skill: 'React', level: 95, icon: FiCode },
    { skill: 'Next.js', level: 90, icon: FiCode },
    { skill: 'TypeScript', level: 85, icon: FiCode },
    { skill: 'Tailwind CSS', level: 95, icon: FiLayers },
    { skill: 'JavaScript', level: 98, icon: FiCode },
    { skill: 'HTML/CSS', level: 100, icon: FiLayers },
  ];

  const backendSkills = [
    { skill: 'Node.js', level: 90, icon: FiDatabase },
    { skill: 'Express', level: 88, icon: FiDatabase },
    { skill: 'MongoDB', level: 85, icon: FiDatabase },
    { skill: 'PostgreSQL', level: 80, icon: FiDatabase },
    { skill: 'REST APIs', level: 92, icon: FiDatabase },
    { skill: 'GraphQL', level: 75, icon: FiDatabase },
  ];

  const otherSkills = [
    { skill: 'React Native', level: 85, icon: FiSmartphone },
    { skill: 'AWS', level: 80, icon: FiCloud },
    { skill: 'Docker', level: 75, icon: FiSettings },
    { skill: 'Git', level: 95, icon: FiSettings },
    { skill: 'Figma', level: 70, icon: FiLayers },
    { skill: 'CI/CD', level: 75, icon: FiSettings },
  ];

  const skillCategories = [
    { title: 'Frontend', skills: frontendSkills, color: 'from-tunis-yellow to-tunis-yellow-light' },
    { title: 'Backend', skills: backendSkills, color: 'from-neon-blue to-blue-400' },
    { title: 'Tools & Others', skills: otherSkills, color: 'from-neon-green to-green-400' },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <SectionTitle
          title="My Skills"
          subtitle="Technologies I work with"
        />

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="p-8 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20"
            >
              <h3 className="text-2xl font-bold text-tunis-yellow mb-6 flex items-center gap-3">
                <div className={`w-1 h-8 bg-gradient-to-b ${category.color} rounded`} />
                {category.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                  <SkillBar key={index} {...skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Always Learning',
              description: 'Continuously updating my skills with the latest technologies',
            },
            {
              title: 'Problem Solver',
              description: 'Expert at finding creative solutions to complex challenges',
            },
            {
              title: 'Team Player',
              description: 'Collaborate effectively with designers and developers',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 text-center"
            >
              <h4 className="text-xl font-bold text-tunis-yellow mb-3">
                {item.title}
              </h4>
              <p className="text-tunis-text-dark">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;

