import React, { useEffect, useRef, useState } from 'react';
import { skills } from '../data/skills';
import '../styles/Skills.css';

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setVisibleSkills(prev => [...prev, skill.id]);
            }, index * 100);
          });
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

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Cloud'];
  const groupedSkills = categories.map(cat => ({
    category: cat,
    items: skills.filter(skill => skill.category === cat)
  }));

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {groupedSkills.map((group) => (
            group.items.length > 0 && (
              <div key={group.category} className="skill-category">
                <h3 className="category-title">{group.category}</h3>
                <div className="skills-list">
                  {group.items.map((skill) => (
                    <div
                      key={skill.id}
                      className={`skill-card ${visibleSkills.includes(skill.id) ? 'visible' : ''}`}
                    >
                      <div className="skill-header">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <div className="skill-progress">
                        <div
                          className="skill-progress-bar"
                          style={{
                            width: visibleSkills.includes(skill.id) ? `${skill.level}%` : '0%',
                            transition: 'width 1s ease-in-out'
                          }}
                        ></div>
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
