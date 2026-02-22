import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Full-Stack Developer", "Web-Designer"];

  useEffect(() => {
    let currentText = "";
    let isDeleting = false;
    let speed = 100;
    let timeout;

    const type = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        currentText = currentRole.substring(0, currentText.length - 1);
        speed = 50;
      } else {
        currentText = currentRole.substring(0, currentText.length + 1);
        speed = 100;
      }

      setDisplayText(currentText);

      if (!isDeleting && currentText === currentRole) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        setRoleIndex((prev) => (prev + 1) % roles.length);
        speed = 500;
      }

      timeout = setTimeout(type, speed);
    };

    timeout = setTimeout(type, speed);
    return () => clearTimeout(timeout);
  }, [roleIndex]);

  return (
    <section className="HeroSection">
      <div className="HeroContainer">
        <div className="HeroFlexWrapper">

          {/* Profile Photo */}
          <div className="AvatarColumn">
            <div className="AvatarFrame">
              <div className="AvatarImageWrapper">
                <img
                  src="/profile-photo.jpg"
                  alt="Rahul Dhakad"
                  className="AvatarPhoto"
                />
              </div>
              <div className="AvatarGlow"></div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="IntroColumn">
            <div className="IntroTextGroup">
              <h1 className="Headline">
                <span className="BigName">I'M RAHUL DHAKAD.</span>
                <span className="RoleTitle">{displayText}<span className="TypingCursor">|</span></span>
              </h1>
            </div>

            <p className="IntroBio">
              I'm an India-based full-stack developer passionate about building clean, scalable, and user-friendly web experiences.
            </p>

            <div className="ActionBtnWrapper">
              <Link
                to="/about"
                className="CtaButton group"
              >
                <div className="CtaBtnBackground"></div>
                <span className="CtaBtnText">
                  MORE ABOUT ME
                </span>
                <div className="CtaBtnIconBox">
                  <span className="CtaBtnIcon">→</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="ScrollIndicator">
        <span className="ScrollText">Scroll Down</span>
      </div>
    </section>
  );
};

export default Home;
