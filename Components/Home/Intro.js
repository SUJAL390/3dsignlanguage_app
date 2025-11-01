import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, Users, MessageSquare } from "lucide-react";
import './Intro.css';

function Intro() {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Speech Therapist",
      content: "MyVoice has revolutionized how I teach sign language to my students. The 3D avatars are incredibly realistic and engaging.",
      avatar: "👩‍⚕️",
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Kumar",
      role: "Student",
      content: "Learning ISL was never this fun! The interactive animations and real-time conversion features are amazing.",
      avatar: "👨‍🎓",
      rating: 5
    },
    {
      id: 3,
      name: "Meera Patel",
      role: "Community Leader",
      content: "This platform has helped bridge communication gaps in our deaf community. The video creation tool is a game-changer.",
      avatar: "👩‍💼",
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Users" },
    { icon: Heart, value: "50,000+", label: "Signs Learned" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
    { icon: MessageSquare, value: "24/7", label: "Support" }
  ];

  return (
    <section className="intro-section">
      <div className="container">
        <motion.div
          className="intro-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="intro-title">
            Join the <span className="title-gradient">MyVoice</span> Community
          </h2>
          <p className="intro-description">
            Be part of a growing community that's making sign language accessible to everyone.
            Share your experience, learn from others, and help us improve communication for all.
          </p>
          <div className="intro-actions">
            <Link to="/sign-kit/feedback" className="btn btn-primary">
              Share Your Feedback
            </Link>
            <Link to="/sign-kit/learn-sign" className="btn btn-secondary">
              Start Learning Today
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon size={32} className="stat-icon" />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="testimonials-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="testimonials-title">What Our Users Say</h3>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <span className="avatar-emoji">{testimonial.avatar}</span>
                  </div>
                  <div className="testimonial-info">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Intro;
