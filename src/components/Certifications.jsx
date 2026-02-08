import React, { useEffect, useRef, useState } from 'react';
import { certificates } from '../data/certificates';
import '../styles/Certifications.css';

const Certifications = () => {
  const [visibleCerts, setVisibleCerts] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          certificates.forEach((cert, index) => {
            setTimeout(() => {
              setVisibleCerts(prev => [...prev, cert.id]);
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

  return (
    <section id="certifications" className="certifications-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-grid">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className={`cert-card ${visibleCerts.includes(cert.id) ? 'visible' : ''}`}
            >
              <div className="cert-image">
                <img src={cert.image} alt={cert.title} />
                <div className="cert-overlay">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-date">{cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
