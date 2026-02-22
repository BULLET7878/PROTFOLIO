import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelopeOpen, FaPhoneSquareAlt, FaPaperPlane, FaMap, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [status, setStatus] = useState(null); // 'success', 'validation-error', 'submission-error'

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setStatus('validation-error');
      return;
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/rahuldhakarmm@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject,
          message: formData.message,
          _template: 'table'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('submission-error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('submission-error');
    }

    setTimeout(() => {
      if (status !== 'in-progress') setStatus(null);
    }, 5000);
  };

  return (
    <section className="GetInTouchArea">

      {/* Header Section */}
      <div className="PageHeader">
        <h2 className="BackgroundTitle">
          CONTACT
        </h2>
        <h1 className="MainTitle">
          GET IN <span className="AccentText">TOUCH</span>
        </h1>
      </div>

      <div className="ContactLayout">
        {/* Left Column: Contact Info */}
        <div className="InfoSidebar">
          <h3 className="SidebarHeading">
            DON'T BE SHY !
          </h3>
          <p className="SidebarDesc">
            Feel free to get in touch with me. I am always open to discussing new projects & creative ideas.
          </p>

          <div className="CardListing">
            {/* Address Card */}
            <div className="ContactItem">
              <FaMap className="ItemIcon mt-1" />
              <div className="ItemBody">
                <span className="ItemLabel">ADDRESS POINT</span>
                <p className="ItemValue pr-4">
                  Ramganjmandi, Kota, Rajasthan, 326519
                </p>
              </div>
            </div>

            {/* Mail Card */}
            <div className="ContactItem">
              <FaEnvelopeOpen className="ItemIcon mt-1" />
              <div className="ItemBody">
                <span className="ItemLabel">MAIL ME</span>
                <a href="mailto:rahuldhakarmm@gmail.com" className="ItemValue MailLink">
                  rahuldhakarmm@gmail.com
                </a>
              </div>
            </div>

            {/* Call Card */}
            <div className="ContactItem">
              <FaPhoneSquareAlt className="ItemIcon mt-1" />
              <div className="ItemBody">
                <span className="ItemLabel">CALL ME</span>
                <a href="tel:+919024850689" className="ItemValue">
                  +91 90248 50689
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="SocialBar">
            <h4 className="SocialBarTitle">FIND ME ON</h4>
            <div className="SocialIconList">
              <a href="https://github.com/BULLET7878" target="_blank" rel="noopener noreferrer" className="SocialIconLink">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/rahuldhakad0907/" target="_blank" rel="noopener noreferrer" className="SocialIconLink">
                <FaLinkedin />
              </a>
              <a href="https://www.instagram.com/rahul_dhakad_78?igsh=MWVweHJyNHE1bzkzdg==" target="_blank" rel="noopener noreferrer" className="SocialIconLink">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="FormPanel">
          <form onSubmit={handleSubmit} className="MessageForm">
            <div className="FormGrid">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                className="FormInput"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="YOUR EMAIL"
                className="FormInput"
                required
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="YOUR SUBJECT"
                className="FormInput"
                required
              />
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="YOUR MESSAGE"
              rows="6"
              className="FormTextArea"
              required
            ></textarea>

            <button
              type="submit"
              className="SubmitBtn group"
            >
              <div className="SubmitBtnBg"></div>
              <span className="SubmitBtnText">
                {status === 'success' ? 'SENT!' : 'SEND MESSAGE'}
              </span>
              <div className="SubmitBtnIconWrapper">
                <FaPaperPlane className={`SubmitBtnIcon ${status === 'success' ? 'IconBounce' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="StatusMessage SuccessText"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'validation-error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="StatusMessage ErrorText"
                >
                  Please enter a valid email address.
                </motion.p>
              )}
              {status === 'submission-error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="StatusMessage ErrorText"
                >
                  Submission failed. Please try again or check your internet.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
