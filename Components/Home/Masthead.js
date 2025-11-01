import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, BookOpen, Zap } from 'lucide-react';
import './Masthead.css';

const Masthead = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className="masthead">
      <div className="masthead-background">
        <motion.div
          className="gradient-orb orb-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      <motion.div
        className="masthead-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="masthead-text">
          <motion.span
            className="masthead-badge"
            variants={itemVariants}
          >
            <motion.div
              className="badge-dot"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Powered by AI & 3D Avatars
          </motion.span>

          <motion.h1
            className="masthead-title"
            variants={itemVariants}
          >
            Bridge Communication
            <span className="title-gradient"> with Sign Language</span>
          </motion.h1>

          <motion.p
            className="masthead-description"
            variants={itemVariants}
          >
            Experience the future of Sign Language learning with interactive
            3D avatars, real-time conversion, and AI-powered animations.
          </motion.p>

          <motion.div
            className="masthead-actions"
            variants={itemVariants}
          >
            <Link to="/sign-kit/learn-sign" className="btn btn-primary btn-large">
              <span>Start Learning</span>
              <ArrowRight size={20} />
            </Link>

            <Link to="/sign-kit/convert" className="btn btn-secondary btn-large">
              <Play size={20} />
              <span>Try Converter</span>
            </Link>
          </motion.div>

          <motion.div
            className="masthead-stats"
            variants={itemVariants}
          >
            <div className="stat-item">
              <div className="stat-number">26</div>
              <div className="stat-label">Alphabets</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Words</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">3D</div>
              <div className="stat-label">Avatars</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="masthead-visual"
          variants={itemVariants}
        >
          <motion.div
            className="avatar-showcase"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="avatar-card">
              <div className="avatar-placeholder">
                <motion.span
                  className="avatar-emoji"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  🤟
                </motion.span>
              </div>
            </div>
            <motion.div
              className="floating-elements"
              variants={floatingVariants}
              animate="animate"
            >
              <motion.div
                className="float-card float-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Users size={20} />
                <span className="float-text">Real-time</span>
              </motion.div>
              <motion.div
                className="float-card float-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <BookOpen size={20} />
                <span className="float-text">Accurate</span>
              </motion.div>
              <motion.div
                className="float-card float-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Zap size={20} />
                <span className="float-text">Fast</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="scroll-line"
          animate={{ height: [0, 40, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="scroll-text">Scroll to explore</div>
      </motion.div>
    </section>
  );
};

export default Masthead;
