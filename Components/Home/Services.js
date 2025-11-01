import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, BookOpen, Video, ArrowRight, Sparkles, Users, Zap, Camera, Globe } from "lucide-react";
import './Services.css';

function Services() {
  const services = [
    {
      id: 1,
      title: "Convert to Sign Language",
      description: "Transform audio or text into beautiful Indian Sign Language animations. Speak into your microphone or type your message to see real-time ISL conversion.",
      icon: Mic,
      image: "🎤",
      link: "/sign-kit/convert",
      features: ["Real-time conversion", "Audio & text input", "3D avatar animations"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Learn Sign Language",
      description: "Master Indian Sign Language with our comprehensive learning platform. Explore alphabets, words, and phrases with interactive 3D demonstrations.",
      icon: BookOpen,
      image: "📚",
      link: "/sign-kit/learn-sign",
      features: ["26 alphabets", "100+ words", "Interactive learning"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Create & Share Videos",
      description: "Generate professional ISL videos from text transcripts or audio. Share your creations with the community and bridge communication gaps.",
      icon: Video,
      image: "🎬",
      link: "/sign-kit/create-video",
      features: ["Video generation", "Community sharing", "Multiple formats"],
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      title: "Translate Nepali Sign Language to Text and Speech",
      description: "Use your webcam to perform Nepali Sign Language gestures and get real-time translation to text and speech with AI-powered recognition.",
      icon: Camera,
      image: "🎥",
      link: "/sign-kit/sign-to-text",
      features: ["Real-time recognition", "Text output", "Audio speech"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: 5,
      title: "American Sign Language (ASL) to Text and Speech",
      description: "Advanced ASL recognition using MediaPipe hands model. Perform American Sign Language gestures and get instant translation with high accuracy AI detection.",
      icon: Globe,
      image: "🌎",
      link: "/sign-kit/asl-to-text",
      features: ["ASL alphabets A-Z", "Real-time detection", "Voice output"],
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="services-section">
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="services-badge">
            <Sparkles size={16} />
            <span>Our Services</span>
          </div>
          <h2 className="services-title">
            Everything you need for
            <span className="title-gradient"> Sign Language</span>
          </h2>
          <p className="services-description">
            A comprehensive and aesthetic  Sign Language toolkit with modern AI-powered features.
            Experience seamless communication through our intuitive and accessible platform designed
            for everyone.
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                className="service-card"
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="service-header">
                  <div className="service-icon-wrapper">
                    <div className="service-icon">
                      <span className="icon-emoji">{service.image}</span>
                    </div>
                    <div className="service-icon-bg">
                      <Icon size={24} />
                    </div>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                </div>

                <p className="service-description">{service.description}</p>

                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <div className="feature-dot"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={service.link} className="service-link">
                  <span>Explore Now</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="services-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="stat-item">
            <Users size={24} />
            <div>
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
          <div className="stat-item">
            <Video size={24} />
            <div>
              <div className="stat-number">50K+</div>
              <div className="stat-label">Videos Created</div>
            </div>
          </div>
          <div className="stat-item">
            <Zap size={24} />
            <div>
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
