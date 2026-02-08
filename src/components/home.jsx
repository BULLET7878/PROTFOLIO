import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const fullText = "I'm a Full Stack Developer";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleScrollDown = () => {
    navigate('/about');
  };

  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <div className="home-content">
          <div className="home-text">
            <h1 className="home-title">
              <span className="greeting">Hello, I'm</span>
              <span className="name">Rahul Dhakad</span>
              <span className="typing-text">
                {displayText}
                <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
              </span>
            </h1>
            <p className="home-description">
              I create beautiful, functional, and user-friendly web experiences.
              Passionate about building excellent software that improves lives.
            </p>
            <div className="home-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>
          <div className="home-image">
            <div className="image-wrapper">
              <img 
                src="/profile-photo.jpg" 
                alt="Rahul Dhakad" 
                className="profile-image"
              />
              <div className="image-glow"></div>
            </div>
          </div>
        </div>
        <button className="scroll-down" onClick={handleScrollDown} aria-label="Scroll down">
          <span></span>
        </button>
      </div>
    </section>
  );
};

export default Home;
