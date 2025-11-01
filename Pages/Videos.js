import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import VideoCard from "../Components/Videos/VideoCard";
import { baseURL } from "../Config/config";
import "./Videos.css";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const retrieveVideos = () => {
    axios
      .get(`${baseURL}/videos/all-videos`)
      .then((res) => {
        setVideos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(retrieveVideos, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!videoId) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    navigate(`/sign-kit/video/${videoId}`, { replace: false });
  };

  const handleClick = (videoId) => {
    navigate(`/sign-kit/video/${videoId}`, { replace: false });
  };

  const videoList = videos.map((video, index) => (
    <VideoCard key={index} video={video} handleClick={handleClick} />
  ));

  return (
    <div className="videos-page container-fluid d-flex flex-column align-items-center px-0">
      <div className="videos-hero container-fluid">
        <div className="container">
          <div className="videos-hero-title">
            Explore Videos!
          </div>
          <div className="videos-hero-description">
            Welcome to the ISL video section of MyVoice. Create your own public
            or private videos, share with your friends and colleagues or browse
            through the videos created by others and shared with the entire
            community!
          </div>
        </div>
      </div>

      <section id="create-video" className="videos-section">
        <div className="container">
          <div className="row">
            <div
              className="col-md-12 d-flex justify-content-center align-items-center"
              style={{ flexDirection: "column" }}
            >
              <div className="videos-section-heading">Create a new video!</div>
              <div className="videos-divider" />
              <div className="videos-section-text">
                Create your own video within a few clicks! Provide your content
                via text, speech or file and keep the videos private or share
                them with the entire community! Each video generates a video ID
                which can be used to access the video directly.
              </div>
              <Link to='/sign-kit/create-video' className="videos-btn-primary mt-3">
                Create your own Video!
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="Open-video" className="videos-section">
        <div className="container">
          <div className="row">
            <div
              className="col-md-12 d-flex justify-content-center align-items-center"
              style={{ flexDirection: "column" }}
            >
              <div className="videos-section-heading">Open a video</div>
              <div className="videos-divider" />
              <div className="videos-section-text">
                Open a video directly by using the associated video ID!
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="videos-form-section">
        <div className="container d-flex justify-content-center">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center p-0"
            style={{ width: '100%', maxWidth: '600px' }}
          >
            <Form.Group
              controlId="videoId"
              className="mb-3 w-100"
            >
              <Form.Label className="videos-form-label">Enter the Video ID</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter the Video ID here to open your video..."
                value={videoId}
                name="title"
                onChange={(e) => setVideoId(e.target.value)}
                className="videos-form-control"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a video Id.
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="videos-btn-primary">
              Open Video
            </Button>
          </Form>
        </div>
      </div>

      <section id="video-feed" className="videos-section">
        <div className="container">
          <div className="row">
            <div
              className="col-md-12 d-flex justify-content-center align-items-center"
              style={{ flexDirection: "column" }}
            >
              <div className="videos-section-heading">Your Video Feed</div>
              <div className="videos-divider" />
              <div className="videos-section-text">
                Browse through the ISL videos created by others and shared with
                the entire community!
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="videos-feed-container">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          {videoList}
        </div>
      </div>
    </div>
  );
}

export default Videos;
