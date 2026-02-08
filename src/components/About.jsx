import React, { useEffect, useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import '../styles/About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Resume-Rahul%20Dhakad%20(7).pdf';
    link.download = 'Resume-Rahul_Dhakad.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills = [
    { name: 'React', level: 95 },
    { name: 'JavaScript', level: 98 },
    { name: 'Node.js', level: 90 },
    { name: 'HTML5', level: 95 },
    { name: 'CSS3', level: 92 },
    { name: 'Python', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'MySQL', level: 85 },
    { name: 'Express.js', level: 85 }
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University Name',
      year: '2018 - 2022',
      description: 'Specialized in Software Engineering and Web Development'
    },
    {
      degree: 'Full Stack Web Development',
      institution: 'Online Course',
      year: '2020',
      description: 'Completed comprehensive full-stack development program'
    }
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>About Me</h2>
        
        {/* Download CV Button */}
        <div className={`cv-download ${isVisible ? 'fade-in' : ''}`}>
          <button onClick={handleDownloadCV} className="download-btn">
            <FiDownload className="download-icon" />
            <span>Download CV</span>
          </button>
        </div>

        <div className={`about-content ${isVisible ? 'fade-in' : ''}`}>
          {/* About Me Section */}
          <div className="about-card">
            <h3 className="card-title">About Me</h3>
            <div className="about-text">
              <p>
                I am <strong>RAHUL DHAKAD</strong>, a Full Stack Developer skilled in building web and mobile applications using{' '}
                <span className="tech-highlight react">React</span>,{' '}
                <span className="tech-highlight react-native">React Native</span>,{' '}
                <span className="tech-highlight nodejs">Node.js</span>, and{' '}
                <span className="tech-highlight express">Express</span>. I work with databases like{' '}
                <span className="tech-highlight mongodb">MongoDB</span> and{' '}
                <span className="tech-highlight mysql">MySQL</span> to create scalable and efficient solutions.
              </p>
              <p>
                I have experience integrating <span className="tech-highlight api">APIs</span>,{' '}
                <span className="tech-highlight auth">authentication systems</span>, and{' '}
                <span className="tech-highlight cloud">cloud services</span>, focusing on clean code and seamless user experiences.
              </p>
              <p>
                Passionate about solving problems and delivering end-to-end functional applications, I continuously learn new technologies to stay ahead in the tech world.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="about-card">
            <h3 className="card-title">Skills</h3>
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6B5CF6" />
                  <stop offset="100%" stopColor="#8B7CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="skills-circular-grid">
              {skills.map((skill, index) => (
                <div key={index} className="circular-skill-item">
                  <div className="circular-progress-wrapper">
                    <svg className="circular-progress" viewBox="0 0 120 120">
                      <circle
                        className="progress-bg"
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        strokeWidth="8"
                      />
                      <circle
                        className="progress-fill"
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - skill.level / 100)}`}
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                      />
                    </svg>
                    <div className="circular-percent">
                      <span className="percent-value">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="circular-skill-name">{skill.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="about-card">
            <h3 className="card-title">Education</h3>
            <div className="education-list">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="edu-year">{edu.year}</div>
                  <div className="edu-content">
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <p className="edu-institution">{edu.institution}</p>
                    <p className="edu-description">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats">
            <div className="stat-item">
              <h3>7+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <h3>2+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
