import React from 'react';
import { motion } from 'framer-motion';

const SkillBar = ({ skill, level, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-tunis-yellow text-xl" />}
          <span className="text-tunis-text font-medium">{skill}</span>
        </div>
        <span className="text-tunis-yellow font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-tunis-gray-light rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-tunis-yellow to-tunis-yellow-light rounded-full shadow-neon-yellow"
        />
      </div>
    </motion.div>
  );
};

export default SkillBar;

