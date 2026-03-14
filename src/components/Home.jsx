import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import { FiMonitor, FiCode, FiZap, FiBriefcase, FiLayers, FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects as projectsData } from '../data/projects';
import '../styles/Home.css';

import ModernCounter from './ModernCounter';
import Hero3D from './Hero3D';
import TiltCard from './TiltCard';

const MagneticText = ({ children, className }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;

    requestAnimationFrame(() => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance to center
      const dist = Math.hypot(clientX - centerX, clientY - centerY);
      const radius = 200; // Activation radius

      if (dist < radius) {
        // Magnetic pull effect
        const force = (radius - dist) / radius;
        mouseX.set((clientX - centerX) * force * 0.4);
        mouseY.set((clientY - centerY) * force * 0.4);
      } else {
        animate(mouseX, 0, { type: "spring", stiffness: 100, damping: 10 });
        animate(mouseY, 0, { type: "spring", stiffness: 100, damping: 10 });
      }
    });
  };

  const handleMouseLeave = () => {
    animate(mouseX, 0, { type: "spring", stiffness: 100, damping: 10 });
    animate(mouseY, 0, { type: "spring", stiffness: 100, damping: 10 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={`MagneticText ${className}`}
    >
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, to, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;

    requestAnimationFrame(() => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      x.set((clientX - centerX) * 0.3);
      y.set((clientY - centerY) * 0.3);
    });
  };

  const handleMouseLeave = () => {
    animate(x, 0, { type: "spring", stiffness: 150, damping: 15 });
    animate(y, 0, { type: "spring", stiffness: 150, damping: 15 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="MagneticWrapper"
    >
      <Link to={to} className={className}>
        {children}
      </Link>
    </motion.div>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);
  const textScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 500], [0, 50]);

  // Section Refs
  const heroRef = useRef(null);
  const bioRef = useRef(null);
  const servicesRef = useRef(null);

  // Bio Section Scroll Progress
  const { scrollYProgress: bioScroll } = useScroll({
    target: bioRef,
    offset: ["start end", "end start"]
  });
  const bioOpacity = useTransform(bioScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const bioScale = useTransform(bioScroll, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  // Services Section Scroll Progress
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });
  const servicesOpacity = useTransform(servicesScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const servicesScale = useTransform(servicesScroll, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(15px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, filter: 'blur(20px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
    },
  };

  // ----- Typing Bio Section Logic -----
  const isBioInView = useInView(bioRef, { once: true, margin: "-100px" });
  const [typedText, setTypedText] = useState('');
  const fullBioText = "I'm an India-based developer with a deep passion for crafting premium, futuristic user interfaces. Specializing in the MERN stack and modern animation libraries, I bridge the gap between stunning design and robust engineering.";

  useEffect(() => {
    if (isBioInView) {
      let currentText = "";
      let index = 0;
      const interval = setInterval(() => {
        currentText += fullBioText[index];
        setTypedText(currentText);
        index++;
        if (index >= fullBioText.length) clearInterval(interval);
      }, 15); // increased typing speed
      return () => clearInterval(interval);
    }
  }, [isBioInView]);

  // ----- Services Data -----
  const servicesData = [
    {
      id: 1,
      icon: <FiCode />,
      title: "Web Development",
      desc: "Full-stack scalable architectures utilizing the MERN stack with modern database management."
    },
    {
      id: 2,
      icon: <FiMonitor />,
      title: "Frontend Engineering",
      desc: "Pixel-perfect, responsive, and animated UI/UX implementation using React and Framer Motion."
    },
    {
      id: 3,
      icon: <FiZap />,
      title: "Web Optimization",
      desc: "Performance tuning, SEO best practices, and lightning-fast load times for premium web apps."
    }
  ];

  return (
    <div className="HomeWrapper">
      {/* --- HERO SECTION --- */}
      <section className="HeroSection" ref={heroRef}>
        <motion.div
          className="HeroContainer"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: opacityFade }}
        >
          <div className="HeroFlexWrapper">
            {/* Hero Content */}
            <motion.div className="IntroColumn" style={{ y: textY, scale: textScale }}>
              <motion.div className="IntroTextGroup" variants={itemVariants}>
                <div className="InternshipBadge">
                  <span className="PulseDot"></span>
                  OPEN FOR INTERNSHIP
                </div>
                <MagneticText className="GreetingText">HELLO, WORLD.</MagneticText>
                <MagneticText className="Headline ShimmerText">
                  I'M <span className="GradientText">RAHUL DHAKAD</span>
                </MagneticText>
                <h3 className="SubHeadline">
                  FULL-STACK DEVELOPER & WEB DESIGNER
                </h3>
              </motion.div>

              <motion.p className="IntroBio" variants={itemVariants}>
                I craft premium, high-performance digital experiences. Specializing in modern React, smooth animations, and scalable backend architectures. Let's build something extraordinary.
              </motion.p>

              <motion.div className="ActionBtnWrapper" variants={itemVariants}>
                <MagneticButton to="/about" className="PremiumButton group clickable" whileTap={{ scale: 0.95 }}>
                  <span className="ButtonGlow"></span>
                  <span className="ButtonText">EXPLORE MORE</span>
                  <span className="ButtonIcon">→</span>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Profile Photo */}
            <motion.div className="AvatarColumn" variants={imageVariants}>
              <motion.div
                className="AvatarFrame"
                whileHover={{ scale: 1.02 }}
              >
                <div className="BorderBeam" />
                <motion.div
                  className="AvatarImageWrapper GlassPanel"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                  <div className="AvatarGlassOverlay" />
                  <img src="/profile-photo.jpg" alt="Rahul" className="AvatarPhoto" />
                </motion.div>
                <div className="AvatarNeonGlow" />

                {/* Floating Tech Orbs */}
                <motion.div
                  className="FloatingOrb OrbReact"
                  animate={{ y: [-15, 15, -15], rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                >
                  ⚛️
                </motion.div>
                <motion.div
                  className="FloatingOrb OrbJs"
                  animate={{ y: [15, -15, 15], rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear", delay: 1 }}
                >
                  JS
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="EliteScrollPrompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="ScrollLabel">SCROLL TO EXPLORE</span>
          <div className="ScrollLine" />
        </motion.div>
      </section>

      {/* --- SCROLL: ABOUT BIO SECTION --- */}
      <section className="HomeBioSection" ref={bioRef}>
        <div className="ContainerBox">
          <motion.div
            className="BioContentCard GlassPanel"
            style={{ opacity: bioOpacity, scale: bioScale }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="SectionLabel">ABOUT ME</h4>
            <h2 className="BioHeadline">BRINGING IDEAS TO LIFE.</h2>
            <p className="BioTypingText">
              {typedText}
              <span className="TypingCursor">|</span>
            </p>
          </motion.div>
        </div>
      </section >

      {/* --- SCROLL: SERVICES SECTION --- */}
      < section className="HomeServicesSection" ref={servicesRef} >
        <div className="ContainerBox">
          <motion.div
            className="ServicesHeader"
            style={{ opacity: servicesOpacity, scale: servicesScale }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h4 className="SectionLabel">WHAT I DO</h4>
            <h2 className="SectionHeadline">MY <span className="GradientText">SERVICES</span></h2>
          </motion.div>

          <div className="ServicesGrid" style={{ overflowX: 'hidden', padding: '1rem 0' }}>
            {servicesData.map((service) => (
              <TiltCard key={service.id} className="ServiceCardWrapper">
                <div
                  className="ServiceCard GlassPanel"
                >
                  <div className="ServiceIconBox">
                    {service.icon}
                  </div>
                  <h3 className="ServiceTitle">{service.title}</h3>
                  <p className="ServiceDesc">{service.desc}</p>
                  <div className="ServiceGlowBackground"></div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section >

      {/* --- SCROLL: SPEEDOMETER STATS SECTION --- */}
      < section className="HomeStatsSection" >
        <div className="ContainerBox">
          <div className="StatsGrid">
            <TiltCard>
              <motion.div
                className="StatCard GlassPanel"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="StatIconWrapper">
                  <FiBriefcase />
                </div>
                <h3 className="StatNumber">
                  <ModernCounter value={2} />
                  <span className="StatPlus">+</span>
                </h3>
                <p className="StatTitle">YEARS OF EXPERIENCE</p>
                <div className="StatGlow"></div>
              </motion.div>
            </TiltCard>

            <TiltCard>
              <motion.div
                className="StatCard GlassPanel"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="StatIconWrapper">
                  <FiLayers />
                </div>
                <h3 className="StatNumber">
                  <ModernCounter value={7} />
                  <span className="StatPlus">+</span>
                </h3>
                <p className="StatTitle">PROJECTS COMPLETED</p>
                <div className="StatGlow"></div>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </section >

      {/* --- SCROLL: FEATURED PROJECTS SECTION --- */}
      < section className="HomeFeaturedProjects" >
        <div className="ContainerBox">
          <motion.div
            className="SectionHeader"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="SectionLabel">PORTFOLIO</h4>
            <h2 className="SectionHeadline">FEATURED <span className="GradientText">PROJECTS</span></h2>
          </motion.div>

          <div className="FeaturedProjectsGrid">
            {projectsData.slice(0, 2).map((project, idx) => (
              <TiltCard key={project.id}>
                <motion.div
                  className="FeaturedProjectCard GlassPanel"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                >
                  <div className="ProjectImageWrapper">
                    <img src={project.image} alt={project.title} className="ProjectImage" />
                    <div className="ProjectImageOverlay"></div>
                  </div>

                  <div className="ProjectActionLinks">
                    <a href={project.live} target="_blank" rel="noreferrer" className="ProjectLink group">
                      <FiExternalLink /> <span>LIVE</span>
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer" className="ProjectLink group">
                      <FiGithub /> <span>CODE</span>
                    </a>
                  </div>

                  <div className="ProjectFooter">
                    <h3 className="ProjectName">{project.title}</h3>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section >

      {/* --- SCROLL: FINAL CTA SECTION --- */}
      <section className="HomeCTASection">
        <div className="ContainerBox">
          <motion.div
            className="CTAContent GlassPanel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="CTAHeadline">READY TO START A <span className="GradientText">PROJECT?</span></h2>
            <p className="CTASubtext">I'm currently available for freelance work and open to new opportunities.</p>

            <div className="CTABtnWrapper">
              <Link to="/contact" className="PremiumButton group clickable">
                {/* Adding motion wrapper for tap effect since this is a Link directly */}
                <motion.div
                  style={{ display: 'flex', alignItems: 'center', gap: 'inherit', width: '100%' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="ButtonGlow"></span>
                  <span className="ButtonText">LET'S WORK TOGETHER</span>
                  <span className="ButtonIcon">→</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div >
  );
};

export default Home;
