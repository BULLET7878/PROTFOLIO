import React, { useState, useEffect } from 'react';
import { FaDownload, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { skills as skillsData } from '../data/skills';
import '../styles/About.css';

const SkillIcon = ({ label, iconName, color }) => {
  const IconComponent = SiIcons[iconName];

  return (
    <div className="SkillBox">
      <div className="SkillIconWrapper">
        {IconComponent ? (
          <IconComponent className="SkillTechIcon" style={{ color: color }} />
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

const About = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Rahul_Dhakad_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const personalInfos = [
    { label: 'Name', value: 'Rahul Dhakad' },
    { label: 'Age', value: '22 Years' },
    { label: 'Freelance', value: 'Available', isGreen: true },
    { label: 'Address', value: 'Kota, Rajasthan' },
    { label: 'Phone', value: '+91 90248 50689' },
    { label: 'Email', value: 'rahuldhakarmm@gmail.com' },
    { label: 'Languages', value: 'Hindi, English' },
  ];

  const stats = [
    { number: '2+', text: 'YEARS OF\nEXPERIENCE' },
    { number: '7+', text: 'COMPLETED\nPROJECTS' }
  ];

  return (
    <section className="AboutPage">
      <div className="AboutContainer">

        {/* Title Section */}
        <div className="SectionTitleBox">
          <h2 className="FaintTitle">
            RESUME
          </h2>
          <h1 className="BoldTitle">
            ABOUT <span className="BlueAccent">ME</span>
          </h1>
        </div>

        {/* Content Wrapper */}
        <div className="AboutGrid">
          {/* Top Content: Personal Infos & Stats */}
          <div className="IntroStatsLayout">

            {/* Left: Personal Infos */}
            <div className="PersonalInfoCol">
              <h3 className="ColHeading">
                PERSONAL INFOS
              </h3>

              <p className="ColBio">
                I'm a passionate Full Stack Developer specializing in the MERN stack. I focus on building clean, high-performance web applications and am always eager to learn and implement innovative solutions.
              </p>

              <div className="InfoDetailsGrid">
                {personalInfos.map((info, idx) => (
                  <div key={idx} className="InfoItem">
                    <span className="InfoLabel">{info.label} :</span>
                    <span className={`InfoValue ${info.isGreen ? 'TextGreen' : ''}`}>
                      {info.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="StatsCol">
              <div className="StatsGrid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="StatCard">
                    <h3 className="StatNumber">
                      {stat.number.replace('+', '')}
                      <span className="StatPlus">+</span>
                    </h3>
                    <p className="StatText">
                      <span className="StatLine"></span>
                      {stat.text.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i === 0 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="PageSeparator"></div>

          {/* My Skills */}
          <div className="SkillsArea">
            <h3 className="ColHeading CenterText">
              MY SKILLS
            </h3>
            <div className="SkillsGrid">
              {skillsData.map((skill) => (
                <SkillIcon
                  key={skill.id}
                  label={skill.name}
                  iconName={skill.icon}
                  color={skill.color}
                />
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="PageSeparator"></div>

          {/* Experience & Education */}
          <div className="TimelineArea">
            <h3 className="ColHeading CenterText">
              EXPERIENCE & EDUCATION
            </h3>

            <div className="TimelineGrid">
              {/* College */}
              <div className="TimelineItem">
                <div className="TimelineContent">
                  <div className="TimelineIconBox">
                    <FaGraduationCap className="TimelineIcon" />
                  </div>
                  <span className="TimelineBadge">
                    2024 - PRESENT
                  </span>
                  <h4 className="EntryTitle">
                    Bachelor of Technology <span className="EntryInstitution">- NEWTON SCHOOL OF TECHNOLOGY</span>
                  </h4>
                  <p className="EntryBio">
                    Pursuing B.Tech with a focus on cutting-edge technologies and industry-ready skills.
                  </p>
                </div>
              </div>

              {/* School */}
              <div className="TimelineItem">
                <div className="TimelineContent">
                  <div className="TimelineIconBox">
                    <FaGraduationCap className="TimelineIcon" />
                  </div>
                  <span className="TimelineBadge">
                    2020 - 2022
                  </span>
                  <h4 className="EntryTitle">
                    10th & 12th Education <span className="EntryInstitution">- JAWAHAR NAVODAYA VIDYALAYA KOTA</span>
                  </h4>
                  <p className="EntryBio">
                    Completed secondary and higher secondary education with a focus on science and mathematics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Download CV Button at Bottom */}
          <div className="DownloadWrapper CenterBtn">
            <button
              onClick={handleDownloadCV}
              className="DownloadButton group"
            >
              <div className="DownloadBtnBg"></div>
              <span className="DownloadBtnText">
                DOWNLOAD CV
              </span>
              <div className="DownloadBtnIconBox">
                <FaDownload className="DownloadIcon" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
