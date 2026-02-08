import React, { useState, useEffect, useRef } from 'react';
import { socialLinks } from '../data/social';
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const getIcon = (iconName) => {
    const icons = {
      github: FiGithub,
      linkedin: FiLinkedin,
      whatsapp: FaWhatsapp,
      instagram: FiInstagram,
      email: FiMail
    };
    return icons[iconName] || FiGithub;
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'fade-in' : ''}`}>Contact Me</h2>
        <div className={`contact-content ${isVisible ? 'fade-in' : ''}`}>
          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:rahuldhakarmm@gmail.com" className="contact-link">rahuldhakarmm@gmail.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="tel:+919024850689" className="contact-link">+91 9024850689</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>KOTA (RAJ) INDIA</span>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="5"
                className="form-input form-textarea"
              ></textarea>
            </div>
            <button
              type="submit"
              className={`btn btn-submit ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        
        {/* Footer with Social Icons */}
        <footer className={`contact-footer ${isVisible ? 'fade-in' : ''}`}>
          <div className="footer-social">
            {socialLinks.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  style={{ '--icon-color': social.color }}
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
          <p className="footer-text">© 2024 Rahul Dhakad. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
