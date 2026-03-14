import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useTransform, useMotionValue } from 'framer-motion';
import { LuExternalLink, LuGithub } from 'react-icons/lu';
import { projects } from '../data/projects';
import '../styles/Projects.css';
import '../styles/Home.css';
import TiltCard from './TiltCard';
import Hero3D from './Hero3D';


const PhotonPath = () => {
  return (
    <div className="PhotonLayer">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="PhotonPulse"
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      ))}
    </div>
  );
};

const KineticShape = ({ i, mouseX, mouseY }) => {
  return (
    <motion.div
      className="FloatingShape"
      style={{
        x: useTransform(mouseX, [0, window.innerWidth], [i * 20, i * -20]),
        y: useTransform(mouseY, [0, window.innerHeight], [i * 15, i * -15]),
      }}
      animate={{
        rotate: [0, 360],
        opacity: 0.1,
      }}
      transition={{
        duration: 20 + i * 5,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const KineticGeometry = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }
  }, [mouseX, mouseY]);

  return (
    <div className="KineticContainer">
      {[...Array(4)].map((_, i) => (
        <KineticShape key={i} i={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

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
          className="ModalContent GlassPanel"
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
              <div className="BrowserFrame">
                <div className="BrowserHeader">
                  <span className="Dot Red"></span>
                  <span className="Dot Yellow"></span>
                  <span className="Dot Green"></span>
                </div>
                <img
                  src={project.image}
                  alt={`${project.title} live view`}
                  className="FullViewImage"
                />
              </div>
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
                  className="LiveLink PremiumButton group clickable"
                  style={{ padding: '0.8rem 1.5rem' }}
                >
                  <span className="ButtonGlow"></span>
                  <span className="ButtonText">VIEW LIVE</span>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="CodeLink PremiumButton group clickable"
                  style={{ padding: '0.8rem 1.5rem', background: 'transparent' }}
                >
                  <span className="ButtonGlow"></span>
                  <span className="ButtonText">GITHUB</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProjectCardItem = ({ project, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index % 2 === 0 ? 0 : 0.15, // Stagger pairs
        ease: [0.16, 1, 0.3, 1]
      }}
      className="ProjectGridItem"
    >
      <TiltCard
        className="ProjectCard GlassPanel clickable"
        onClick={() => onSelect(project)}
      >
        <div className="ProjectMedia">
          <img src={project.image} alt={project.title} className="ProjectImage" />
          <div className="HolographicOverlay" />
        </div>
      </TiltCard>

      <div className="ProjectLinkRow">
        <a href={project.live} target="_blank" rel="noreferrer" className="ProjectActionLink">
          <LuExternalLink size={18} />
          <span>LIVE</span>
        </a>
        <a href={project.github} target="_blank" rel="noreferrer" className="ProjectActionLink">
          <LuGithub size={18} />
          <span>CODE</span>
        </a>
      </div>

      <div className="ProjectDisplayTitle">{project.title.toUpperCase()}</div>
      <div className="ProjectSeparator" />
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  return (
    <section className="PortfolioPage" ref={containerRef}>
      <KineticGeometry />

      <div className="PortfolioContainer">
        <div className="PortfolioHeader">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="HeaderDecoration"
          >
            <div className="DecorationLine" />
            <div className="DecorationDiamond" />
            <div className="DecorationLine" />
          </motion.div>
          <h2 className="SectionLabel">Project Showcase</h2>
          <h1 className="SectionHeadline">
            SELECTED <span className="GradientText">WORKS</span>
          </h1>
          <p className="HeaderTagline">A collection of projects built with passion and precision.</p>
        </div>

        <div className="ProjectGrid">
          {projects.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
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
