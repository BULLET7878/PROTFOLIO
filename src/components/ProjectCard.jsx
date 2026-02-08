import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 hover:border-tunis-yellow/50 transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-tunis-gray to-tunis-gray-light overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {project.icon}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-tunis-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs bg-tunis-yellow/20 text-tunis-yellow rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-tunis-yellow mb-2">
          {project.title}
        </h3>
        <p className="text-tunis-text-dark mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-tunis-gray-light text-tunis-text hover:text-tunis-yellow hover:bg-tunis-yellow/20 transition-colors"
            >
              <FiGithub size={20} />
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-tunis-gray-light text-tunis-text hover:text-tunis-yellow hover:bg-tunis-yellow/20 transition-colors"
            >
              <FiExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-tunis-yellow/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
};

export default ProjectCard;

