import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelopeOpen, FaPhoneSquareAlt, FaPaperPlane, FaMap, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Contact.css';
import '../styles/Home.css'; // Glows & common styles
import Hero3D from './Hero3D';
import TiltCard from './TiltCard';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // 'success', 'validation-error', 'submission-error'
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Direct Check for empty fields
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.subject.trim()) newErrors.subject = true;
    if (!formData.message.trim()) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus('validation-error');
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors({ email: true });
      setStatus('validation-error');
      return;
    }

    setIsLoading(true);
    setStatus(null);
    setErrors({});

    try {
      const response = await fetch('https://formsubmit.co/ajax/rahuldhakarmm@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          _subject: `New Message from ${formData.name}: ${formData.subject}`,
          message: formData.message,
          _template: 'table',
          _captcha: "false", // Use string "false" as some setups prefer it
          _honey: "" // Honeypot field for spam prevention
        }),
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        const text = await response.text();
        result = { success: response.ok, message: text };
      }

      console.log('FormSubmit Status:', response.status);
      console.log('FormSubmit Response:', result);

      if (response.ok && (result.success === "true" || result.success === true)) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (response.status === 403 || response.status === 401) {
        // Special case for unverified domains or emails
        setStatus('unverified-error');
      } else {
        console.error('Submission failed with status:', response.status, result);
        setStatus('submission-error');
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
      setStatus('submission-error');
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  return (
    <section className="GetInTouchArea">
      {/* Header Section */}
      <div className="PageHeader">
        <h2 className="SectionLabel">RESUME</h2>
        <h1 className="SectionHeadline">GET IN <span className="GradientText">TOUCH</span></h1>
      </div>

      <div className="ContactLayout">
        {/* Left Column: Contact Info */}
        <div className="InfoSidebar">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="GlassCard ContactInfoCard"
          >
            <h3 className="SidebarHeading">DON'T BE SHY !</h3>
            <p className="SidebarDesc">
              Feel free to get in touch with me. I am always open to discussing new projects & creative ideas.
            </p>

            <div className="CardListing">
              <div className="ContactItem">
                <FaMap className="ItemIcon mt-1" />
                <div className="ItemBody">
                  <span className="ItemLabel">ADDRESS POINT</span>
                  <p className="ItemValue">Ramganjmandi, Kota, Rajasthan, 326519</p>
                </div>
              </div>

              <div className="ContactItem">
                <FaEnvelopeOpen className="ItemIcon mt-1" />
                <div className="ItemBody">
                  <span className="ItemLabel">MAIL ME</span>
                  <a href="mailto:rahuldhakarmm@gmail.com" className="ItemValue MailLink">rahuldhakarmm@gmail.com</a>
                </div>
              </div>

              <div className="ContactItem">
                <FaPhoneSquareAlt className="ItemIcon mt-1" />
                <div className="ItemBody">
                  <span className="ItemLabel">CALL ME</span>
                  <a href="tel:+919024850689" className="ItemValue">+91 90248 50689</a>
                </div>
              </div>
            </div>

            <div className="SocialBar">
              <h4 className="SocialBarTitle">FIND ME ON</h4>
              <div className="SocialIconList">
                <a href="https://github.com/BULLET7878" target="_blank" rel="noopener noreferrer" className="SocialIconLink"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/rahuldhakad0907/" target="_blank" rel="noopener noreferrer" className="SocialIconLink"><FaLinkedin /></a>
                <a href="https://www.instagram.com/rahul_dhakad_78?igsh=MWVweHJyNHE1bzkzdg==" target="_blank" rel="noopener noreferrer" className="SocialIconLink"><FaInstagram /></a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <div className="FormPanel">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="GlassCard"
          >
            <form onSubmit={handleSubmit} className="MessageForm">
              <div className="FormGrid">
                <div className={`FormGroup ${focusedField === 'name' ? 'focused' : ''} ${errors.name ? 'error' : ''}`}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="YOUR NAME"
                    className="FormInput"
                  />
                  <div className="InputBeam" />
                </div>
                <div className={`FormGroup ${focusedField === 'email' ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="YOUR EMAIL"
                    className="FormInput"
                  />
                  <div className="InputBeam" />
                </div>
              </div>

              <div className={`FormGroup ${focusedField === 'subject' ? 'focused' : ''} ${errors.subject ? 'error' : ''}`}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="YOUR SUBJECT"
                  className="FormInput"
                />
                <div className="InputBeam" />
              </div>

              <div className={`FormGroup ${focusedField === 'message' ? 'focused' : ''} ${errors.message ? 'error' : ''}`}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="YOUR MESSAGE"
                  rows="4"
                  className="FormTextArea"
                ></textarea>
                <div className="InputBeam" />
              </div>



              <button
                type="submit"
                disabled={isLoading}
                className={`ButtonMain group clickable ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
                style={{ padding: '1rem 3rem', width: 'fit-content' }}
              >
                <span className="ButtonGlow"></span>
                <span className="ButtonText">
                  {isLoading ? 'SENDING...' : (status === 'success' ? 'SENT!' : 'SEND MESSAGE')}
                </span>
                <span className="ButtonIcon">
                  <FaPaperPlane className={status === 'success' || isLoading ? 'IconBounce' : ''} />
                </span>
              </button>

              <AnimatePresence>
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`StatusMessage ${status === 'success' ? 'SuccessText' : 'ErrorText'}`}
                  >
                    {status === 'success' && "Message sent successfully! I'll get back to you soon."}
                    {status === 'validation-error' && "Please enter a valid email address."}
                    {status === 'unverified-error' && "Domain not verified. Please check your email inbox (and spam) for a FormSubmit activation link!"}
                    {status === 'submission-error' && "Submission failed. Please try again or contact me directly via email."}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
