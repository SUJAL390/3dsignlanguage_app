// Commit from astha463
import './App.css'
import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SplashCursor from './Components/SplashCursor';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./Pages/Home'));
const Convert = lazy(() => import('./Pages/Convert'));
const LearnSign = lazy(() => import('./Pages/LearnSign'));
const Video = lazy(() => import('./Pages/Video'));
const CreateVideo = lazy(() => import('./Pages/CreateVideo'));
const Videos = lazy(() => import('./Pages/Videos'));
const Feedback = lazy(() => import('./Pages/Feedback'));
const SignToText = lazy(() => import('./Pages/SignToText'));
const ASLToText = lazy(() => import('./Pages/ASLToText'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    minHeight: 'calc(100vh - 80px)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '50px',
        height: '50px',
        margin: '0 auto 1rem',
        background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <p style={{ color: '#52525B', fontSize: '1.125rem' }}>Loading...</p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

function App() {
  // Dark mode state management
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Otherwise check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme to document
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return(
    <Router>
      <div className="App">
        <SplashCursor />
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path='/sign-kit/home' element={<Home />} />
              <Route path='/sign-kit/convert' element={<Convert />} />
              <Route path='/sign-kit/learn-sign' element={<LearnSign />} />
              <Route path='/sign-kit/all-videos' element={<Videos />} />
              <Route path='/sign-kit/video/:videoId' element={<Video />} />
              <Route path='/sign-kit/create-video' element={<CreateVideo />} />
              <Route path='/sign-kit/feedback' element={<Feedback />} />
              <Route path='/sign-kit/sign-to-text' element={<SignToText />} />
              <Route path='/sign-kit/asl-to-text' element={<ASLToText />} />
              <Route path='/' element={<Navigate to='/sign-kit/home' replace />} />
              <Route path='*' element={<Navigate to='/sign-kit/home' replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App;