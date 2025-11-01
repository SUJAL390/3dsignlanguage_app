import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import "./Feedback.css";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRating = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.rating && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", rating: 0, message: "" });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Share Your Feedback</h1>
        <p>Help us create the best learning experience for Sign Language</p>
      </div>

      <div className="feedback-content">
        <div className="feedback-form-section">
          {submitted ? (
            <div className="success-message">
              <CheckCircle size={64} />
              <h2>Thank You!</h2>
              <p>Your feedback has been received successfully.</p>
            </div>
          ) : (
            <form className="feedback-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Rate Your Experience *</label>
                <div className="rating-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-button ${
                        formData.rating >= star ? "active" : ""
                      }`}
                      onClick={() => handleRating(star)}
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Feedback *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us what you think..."
                  className="form-input textarea"
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Send Feedback
              </button>
            </form>
          )}
        </div>

        <div className="feedback-info-section">
          <div className="info-card">
            <div className="info-icon">💭</div>
            <h3>Why Your Feedback Matters</h3>
            <p>
              Your insights help us improve the user experience and make Sign
              Language learning more accessible and enjoyable for everyone.
            </p>
            <div className="improvement-tag">Feature Enhancement</div>
          </div>

          <div className="info-card">
            <div className="info-icon">🎯</div>
            <h3>What We'll Do</h3>
            <p>
              We analyze every piece of feedback to identify improvements,
              prioritize features, and ensure the platform meets your needs.
            </p>
            <div className="improvement-tag">Quality Focused</div>
          </div>

          <div className="info-card">
            <div className="info-icon">⭐</div>
            <h3>Recent Improvements</h3>
            <p>
              Based on user feedback, we've enhanced the UI/UX, improved
              performance, and added new interactive features.
            </p>
            <div className="improvement-tag">User Driven</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
