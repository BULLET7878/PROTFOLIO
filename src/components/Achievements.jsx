import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaUsers, FaVolleyballBall, FaBaseballBall, FaTableTennis, FaHandsHelping } from 'react-icons/fa';

const Achievements = () => {
  const achievements = [
    {
      category: "Leadership",
      icon: FaUsers,
      items: [
        "School Volleyball Team Captain",
        "House Captain",
        "Event Organizer",
        "Student Council Member"
      ]
    },
    {
      category: "Sports",
      icon: FaTrophy,
      items: [
        "Volleyball Player",
        "Cricket Enthusiast", 
        "Badminton Player",
        "Sports Team Member"
      ]
    },
    {
      category: "Social Work",
      icon: FaHandsHelping,
      items: [
        "Community Service Volunteer",
        "Social Awareness Campaigns",
        "Charity Event Organizer",
        "Mentorship Programs"
      ]
    }
  ];

  const sports = [
    { name: "Volleyball", icon: FaVolleyballBall, level: "Team Captain" },
    { name: "Cricket", icon: FaBaseballBall, level: "Active Player" },
    { name: "Badminton", icon: FaTableTennis, level: "Regular Player" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="achievements" className="braxton-section bg-white dark:bg-slate-900">
      <div className="braxton-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="braxton-heading">
            Achievements & Activities
          </h2>
          <div className="w-24 h-1 braxton-gradient mx-auto rounded-full"></div>
          <p className="braxton-subheading max-w-2xl mx-auto">
            Beyond coding, I'm passionate about leadership, sports, and making a positive impact in my community
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Achievement Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.category}
                variants={itemVariants}
                className="braxton-card rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <achievement.icon className="text-4xl braxton-text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{achievement.category}</h3>
                </div>
                
                <ul className="space-y-3">
                  {achievement.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 text-slate-600 dark:text-slate-300"
                    >
                      <div className="w-2 h-2 bg-braxton-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Sports Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="braxton-card rounded-xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
              Sports & Physical Activities
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {sports.map((sport, index) => (
                <motion.div
                  key={sport.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-lg bg-braxton-primary/5 hover:bg-braxton-primary/10 transition-all duration-300"
                >
                  <sport.icon className="text-3xl braxton-text-primary mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{sport.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{sport.level}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="braxton-card rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Leadership Philosophy
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              "I believe that true leadership is about empowering others, fostering collaboration, 
              and creating an environment where everyone can thrive. Through my experiences as a 
              team captain and event organizer, I've learned that the best leaders are those who 
              listen, inspire, and lead by example."
            </p>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Team Building",
                "Communication",
                "Problem Solving",
                "Motivation"
              ].map((skill, index) => (
                <div
                  key={skill}
                  className="p-3 rounded-lg bg-braxton-secondary/10 text-braxton-secondary dark:text-braxton-accent text-sm font-medium"
                >
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
