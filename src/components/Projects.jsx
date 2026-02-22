import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../data/projects';
import '../styles/Projects.css';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="ModalOverlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          className="ModalContent"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="CloseBtn"
          >
            ✕
          </button>

          <div className="ModalGrid">
            <div className="ModalImageSide">
              <img src={project.image} alt={project.title} className="FullViewImage" />
            </div>
            <div className="ModalInfoSide">
              <h2 className="ModalTitle">
                {project.title}
              </h2>

              <div className="DetailList">
                <div className="DetailRow">
                  <span className="DetailLabel">Project :</span>
                  <span className="DetailValue">{project.category}</span>
                </div>
                <div className="DetailRow">
                  <span className="DetailLabel">Tech :</span>
                  <span className="DetailValue">{project.technologies.join(', ')}</span>
                </div>
              </div>

              <p className="DetailDesc">
                {project.description}
              </p>

              <div className="LinkButtonGroup">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="LiveLink"
                >
                  View Live
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="CodeLink"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="PortfolioPage">
      <div className="PortfolioContainer">

        {/* Header Section */}
        <div className="PortfolioHeader">
          <h2 className="BackgroundTitle">
            WORKS
          </h2>
          <h1 className="MainTitle">
            MY <span className="BlueAccent">PROJECTS</span>
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="GridWrapper">
          <motion.div
            layout
            className="ProjectGrid"
          >
            <AnimatePresence mode='popLayout'>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="ProjectCardItem"
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="CardMediaBox"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="CardImage"
                    />

                    {/* Overlay */}
                    <div className="CardOverlay">
                      <div className="OverlayContent">
                        <span className="ViewProjectBtn">
                          VIEW PROJECT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Centered Name Below Card */}
                  <div className="CardFooter">
                    <h3 className="CardTitle" onClick={() => setSelectedProject(project)}>
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
