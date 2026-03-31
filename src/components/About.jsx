import React from 'react';
import { FaDownload, FaGraduationCap } from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { motion, useSpring, useScroll } from 'framer-motion';
import { skills as skillsData } from '../data/skills';
import '../styles/About.css';
import '../styles/Home.css'; // Reuse common glass/glow styles

import ModernCounter from './ModernCounter';
import TiltCard from './TiltCard';
import Hero3D from './Hero3D';

const SkillIcon = ({ label, iconName, color, index, activeChainIndex, onHover }) => {
  const IconComponent = SiIcons[iconName];
  const ref = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    onHover(index);
  };

  const isChainActive = activeChainIndex !== null && Math.abs(activeChainIndex - index) <= 1;

  return (
    <div
      className={`SkillBox ${isChainActive ? 'chain-glow' : ''}`}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => onHover(null)}
    >
      <div className="SkillIconWrapper">
        {IconComponent ? (
          <IconComponent
            className="SkillTechIcon"
            style={{ '--skill-color': color }}
          />
        ) : (
          <span className="SkillPlaceholder">{label.charAt(0)}</span>
        )}
      </div>
      <span className="SkillLabel">
        {label}
      </span>
    </div>
  );
};

const SkillLinks = ({ activeIndex }) => {
  const [positions, setPositions] = React.useState([]);
  const containerRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const updatePositions = () => {
      const boxes = document.querySelectorAll('.SkillBox');
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect || boxes.length === 0) return;

      const pos = Array.from(boxes).map(box => {
        const rect = box.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        };
      });
      setPositions(pos);
    };

    // Initial update with a small delay for DOM stability
    const timer = setTimeout(updatePositions, 100);

    const resizeObserver = new ResizeObserver(updatePositions);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    window.addEventListener('resize', updatePositions);
    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePositions);
    };
  }, []);

  return (
    <div className="ConstellationWrapper" ref={containerRef}>
      <svg width="100%" height="100%" className="ConstellationSVG">
        {positions.map((p1, i) =>
          positions.map((p2, j) => {
            if (i >= j) return null;
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist > 250) return null; // Only connect close neighbors

            const isActive = activeIndex === i || activeIndex === j;
            return (
              <motion.line
                key={`${i}-${j}`}
                x1={p1.x} y1={p1.y}
                x2={p2.x} y2={p2.y}
                stroke={isActive ? "var(--brand-accent)" : "rgba(255, 255, 255, 0.03)"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "4 4"}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isActive ? 0.6 : 0.2,
                  transition: { duration: 0.3 }
                }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

const About = () => {
  const [activeChainIndex, setActiveChainIndex] = React.useState(null);
  const workflowRef = React.useRef(null);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Rahul_Dhakad_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { scrollYProgress: workflowScroll } = useScroll({
    target: workflowRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(workflowScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const personalInfos = [
    { label: 'Name', value: 'Rahul Dhakad' },
    { label: 'Age', value: '20 Years' },
    { label: 'Freelance', value: 'Available', isGreen: true },
    { label: 'Address', value: 'Kota, Rajasthan' },
    { label: 'Phone', value: '+91 90248 50689' },
    { label: 'Email', value: 'rahul.dhakar@adypu.edu.in' },
    { label: 'Languages', value: 'Hindi, English' },
  ];

  const stats = [
    { number: '2+', text: 'YEARS OF EXPERIENCE' },
    { number: '7+', text: 'PROJECTS COMPLETED' }
  ];

  return (
    <div className="AboutPage">
      <motion.div className="AboutContainer">
        {/* Title Section */}
        <div className="AboutHeader">
          <h2 className="SectionLabel">RESUME</h2>
          <h1 className="SectionHeadline">ABOUT <span className="GradientText">ME</span></h1>
        </div>

        {/* Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="AboutGrid"
        >
          {/* Top Content: Personal Infos & Stats */}
          <div className="IntroStatsLayout">
            {/* Left: Personal Infos */}
            <div className="PersonalInfoCol">
              <h3 className="ColHeading">PERSONAL INFOS</h3>
              <p className="ColBio">
                I'm a B.Tech student specializing in Artificial Intelligence with a strong interest in full-stack development. I've built real-world projects like a MERN-based e-commerce platform and an AI-powered recruitment system. I enjoy solving problems, building scalable applications, and continuously learning new technologies.
              </p>
              <div className="InfoDetailsGrid">
                {personalInfos.map((info, idx) => (
                  <div key={idx} className="InfoItem">
                    <span className="InfoLabel">{info.label} :</span>
                    <span className={`InfoValue ${info.isGreen ? 'TextGreen' : ''}`}>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="StatsCol">
              <div className="HomeStatsSection"> {/* Reusing Home style grid */}
                <div className="StatsGrid">
                  {stats.map((stat, idx) => (
                    <TiltCard key={idx} className="StatCardWrapper">
                      <motion.div
                        className="StatCard clickable"
                        whileHover={{ y: -10 }}
                      >
                        <span className="StatLabelHeader">{stat.text}</span>
                        <div className="StatValueText">
                          <ModernCounter value={parseInt(stat.number)} />
                          <span>+</span>
                        </div>
                      </motion.div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="PageSeparator"></div>

          {/* My Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="SkillsArea"
          >
            <h3 className="ColHeading CenterText">
              MY SKILLS
            </h3>
            <div className="SkillsGrid">
              <SkillLinks activeIndex={activeChainIndex} />
              {skillsData.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <SkillIcon
                    label={skill.name}
                    iconName={skill.icon}
                    color={skill.color}
                    index={index}
                    activeChainIndex={activeChainIndex}
                    onHover={setActiveChainIndex}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Separator */}
          <div className="PageSeparator"></div>

          {/* Workflow Process */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="WorkflowArea"
            ref={workflowRef}
          >
            <h3 className="ColHeading CenterText">MY WORKING PROCESS</h3>

            <div className="WorkflowGrid">
              {/* Animated SVG Path Connection */}
              <div className="WorkflowPathWrapper">
                <svg width="100%" height="100%" viewBox="0 0 800 1200" fill="none" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--brand-accent)" />
                      <stop offset="50%" stopColor="var(--secondary-color)" />
                      <stop offset="100%" stopColor="var(--brand-accent)" />
                    </linearGradient>
                    <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="10" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Background Track */}
                  <path
                    d="M 120 100 C 400 100, 680 250, 680 400 C 680 550, 120 650, 120 800 C 120 950, 680 1050, 680 1200"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="4"
                    fill="none"
                  />

                  {/* Animated Path */}
                  <motion.path
                    d="M 120 100 C 400 100, 680 250, 680 400 C 680 550, 120 650, 120 800 C 120 950, 680 1050, 680 1200"
                    stroke="url(#pathGradient)"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#pathGlow)"
                    style={{ pathLength: pathLength }}
                  />
                </svg>
              </div>

              {[
                {
                  num: "01",
                  title: "Discovery",
                  desc: "Understanding goals, requirements, and project scope to align strategy from the start."
                },
                {
                  num: "02",
                  title: "Planning",
                  desc: "Defining structure, timelines, and technical approach for a smooth development phase."
                },
                {
                  num: "03",
                  title: "Design & Build",
                  desc: "Creating user-focused designs and developing scalable, high performance solutions."
                },
                {
                  num: "04",
                  title: "Testing",
                  ensure: "Ensuring quality, performance, and compatibility across devices and browsers."
                },
                {
                  num: "05",
                  title: "Launch & Support",
                  desc: "Deploying the project and providing ongoing support for long-term success."
                }
              ].map((step, idx) => (
                <div key={idx} className={`WorkflowStep ${idx % 2 === 0 ? 'StepLeft' : 'StepRight'}`}>
                  <div className="StepNumberOutline">{step.num}</div>
                  <div className="StepContent">
                    <h4 className="StepTitle">{step.title}</h4>
                    <p className="StepDesc">{step.desc || step.ensure}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Separator */}
          <div className="PageSeparator"></div>

          {/* Experience & Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="TimelineArea"
          >
            <h3 className="ColHeading CenterText">
              EXPERIENCE & EDUCATION
            </h3>

            <div className="TimelineGrid">
              {[
                {
                  year: "2024 - PRESENT",
                  title: "Bachelor of Technology (AI ML)",
                  inst: "NEWTON SCHOOL OF TECHNOLOGY, PUNE",
                  desc: "Pursuing B.Tech in Artificial Intelligence & Machine Learning. Current Grade: 7.3/10.0.",
                  icon: <FaGraduationCap className="TimelineIcon" />
                },
                {
                  year: "2021 - 2022",
                  title: "Intermediate (Class XII)",
                  inst: "JAWAHAR NAVODAYA VIDYALAYA, KOTA",
                  desc: "Completed higher secondary education with a focus on science and mathematics. Grade: 77.0%.",
                  icon: <FaGraduationCap className="TimelineIcon" />
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="TimelineItem"
                >
                  <div className="TimelineContent">
                    <div className="TimelineIconBox">
                      {item.icon}
                    </div>
                    <span className="TimelineBadge">
                      {item.year}
                    </span>
                    <h4 className="EntryTitle">
                      {item.title} <span className="EntryInstitution">- {item.inst}</span>
                    </h4>
                    <p className="EntryBio">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="DownloadWrapper CenterBtn" style={{ marginBottom: '2rem' }}>
            <button
              onClick={handleDownloadCV}
              className="ButtonMain group clickable"
              style={{ width: 'auto' }}
            >
              <span className="ButtonGlow"></span>
              <span className="ButtonText">DOWNLOAD CV</span>
              <span className="ButtonIcon"><FaDownload /></span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
