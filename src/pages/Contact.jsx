import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

const Contact = () => {
  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'contact@example.com',
      link: 'mailto:contact@example.com',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'New York, USA',
      link: null,
    },
    {
      icon: FiClock,
      label: 'Available',
      value: 'Mon - Fri, 9AM - 6PM',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's work together on your next project"
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20">
              <h3 className="text-2xl font-bold text-tunis-yellow mb-6">
                Contact Information
              </h3>
              <p className="text-tunis-text-dark mb-6 leading-relaxed">
                Feel free to reach out if you have any questions or would like
                to discuss a project. I'm always open to new opportunities and
                interesting projects.
              </p>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-tunis-gray-light/50 hover:bg-tunis-gray-light transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-tunis-yellow/20 flex items-center justify-center">
                        <Icon className="text-tunis-yellow text-xl" />
                      </div>
                      <div>
                        <div className="text-sm text-tunis-text-dark mb-1">
                          {info.label}
                        </div>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-tunis-text hover:text-tunis-yellow transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-tunis-text">{info.value}</div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20"
            >
              <h3 className="text-xl font-bold text-tunis-yellow mb-4">
                Follow Me
              </h3>
              <div className="flex gap-4">
                {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map(
                  (social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-lg bg-tunis-gray-light text-tunis-text hover:text-tunis-yellow hover:bg-tunis-yellow/20 transition-all"
                    >
                      {social}
                    </motion.a>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-glass-dark backdrop-blur-xl border border-tunis-yellow/20"
          >
            <h3 className="text-2xl font-bold text-tunis-yellow mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

