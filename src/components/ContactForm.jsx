import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your EmailJS credentials
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 text-tunis-text placeholder-tunis-text-dark focus:outline-none focus:border-tunis-yellow focus:shadow-neon-yellow transition-all"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 text-tunis-text placeholder-tunis-text-dark focus:outline-none focus:border-tunis-yellow focus:shadow-neon-yellow transition-all"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full px-4 py-3 rounded-lg bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 text-tunis-text placeholder-tunis-text-dark focus:outline-none focus:border-tunis-yellow focus:shadow-neon-yellow transition-all"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows="6"
          className="w-full px-4 py-3 rounded-lg bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20 text-tunis-text placeholder-tunis-text-dark focus:outline-none focus:border-tunis-yellow focus:shadow-neon-yellow transition-all resize-none"
        />
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-tunis-yellow to-tunis-yellow-light text-tunis-dark font-bold rounded-lg shadow-neon-yellow hover:shadow-neon-yellow/50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitted ? (
          <>
            <FiCheckCircle size={20} />
            Message Sent!
          </>
        ) : (
          <>
            <FiSend size={20} />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;

