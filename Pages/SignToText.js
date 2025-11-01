import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Play, CheckCircle2, Sparkles } from 'lucide-react';
import './SignToText.css';

function SignToText() {
  const launchDesktopApp = () => {
    const folderPath = 'C:\\Users\\97798\\Desktop\\3dsign_language\\MyVoice_development';
    
    alert(
      ' ONE-CLICK LAUNCH\n\n' +
      ' Open File Explorer to your project folder\n' +
      '   (A new window will attempt to open)\n\n' +
      ' Then choose ONE of these options:\n\n' +
      '   OPTION 1: Right-click "LAUNCH_DESKTOP_APP.ps1"\n' +
      '              Select "Run with PowerShell"\n\n' +
      '   OPTION 2: Double-click "LAUNCH_SIGN_RECOGNITION.bat"\n\n' +
      ' What happens:\n' +
      '    Flask server starts automatically\n' +
      '    Camera window opens\n' +
      '    Start recognizing signs!\n\n' +
      ' Camera Window Controls:\n' +
      '   SPACE - Record sign (3 seconds)\n' +
      '   A - Toggle audio\n' +
      '   ESC - Quit'
    );
    
    try {
      window.open('file:///' + folderPath.replace(/\\/g, '/'), '_blank');
    } catch (e) {
      console.log('Browser blocked automatic folder open');
    }
  };

  return (
    <div className="sign-to-text-page">
      <div className="container">
        <motion.div 
          className="page-header" 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <div className="header-badge">
            <Sparkles size={16} />
            <span>AI-Powered Recognition</span>
          </div>
          <h1 className="page-title">
            Nepali Sign Language
            <span className="title-gradient"> to Text & Speech</span>
          </h1>
          <p className="page-description">
            Click the button below to launch the desktop application with full functionality.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }} 
          style={{ 
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', 
            padding: '3rem 2rem', 
            borderRadius: '1.5rem', 
            marginTop: '3rem', 
            color: 'white', 
            boxShadow: '0 25px 60px rgba(102, 126, 234, 0.4)', 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '3rem auto' 
          }}
        >
          <Camera size={64} style={{ marginBottom: '1.5rem' }} />
          
          <h2 style={{ 
            margin: '0 0 1rem 0', 
            fontSize: '2.5rem', 
            fontWeight: '800' 
          }}>
            Launch Desktop Application
          </h2>
          
          <p style={{ 
            margin: '0 0 2rem 0', 
            fontSize: '1.125rem', 
            opacity: 0.95, 
            lineHeight: '1.8' 
          }}>
            Get full sign language recognition with real-time hand tracking
          </p>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.15)', 
            padding: '1.5rem', 
            borderRadius: '1rem', 
            marginBottom: '2rem', 
            textAlign: 'left', 
            backdropFilter: 'blur(10px)' 
          }}>
            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '1.05rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={24} style={{ color: '#4CAF50', flexShrink: 0 }} />
                <span><strong>Real MediaPipe hand tracking</strong> with visual landmarks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={24} style={{ color: '#4CAF50', flexShrink: 0 }} />
                <span><strong>Actual sign recognition</strong> from trained AI model</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={24} style={{ color: '#4CAF50', flexShrink: 0 }} />
                <span><strong>Audio output</strong> with Text-to-Speech</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={24} style={{ color: '#4CAF50', flexShrink: 0 }} />
                <span><strong>Live camera feed</strong> with hand landmark visualization</span>
              </div>
            </div>
          </div>
          
          <motion.button 
            onClick={launchDesktopApp} 
            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)' }} 
            whileTap={{ scale: 0.95 }} 
            style={{ 
              background: 'white', 
              color: '#667EEA', 
              border: 'none', 
              padding: '1.5rem 4rem', 
              borderRadius: '1rem', 
              fontSize: '1.75rem', 
              fontWeight: '800', 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '1rem', 
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)', 
              transition: 'all 0.3s ease', 
              marginBottom: '2rem' 
            }}
          >
            <Play size={36} fill="currentColor" />
            Click Here to Start
          </motion.button>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '1.5rem', 
            borderRadius: '1rem', 
            fontSize: '1rem', 
            lineHeight: '1.8', 
            textAlign: 'left', 
            backdropFilter: 'blur(10px)' 
          }}>
            <h3 style={{ 
              margin: '0 0 1rem 0', 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              textAlign: 'center' 
            }}>
               Two Easy Ways to Launch
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.15)', 
                padding: '1rem', 
                borderRadius: '0.75rem' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '0.5rem' 
                }}>
                  <div style={{ 
                    background: '#4CAF50', 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold', 
                    flexShrink: 0,
                    color: 'white'
                  }}>
                    1
                  </div>
                  <strong style={{ fontSize: '1.125rem' }}>PowerShell (Recommended)</strong>
                </div>
                <p style={{ margin: '0 0 0.5rem 3rem', opacity: 0.95 }}>
                  Right-click  "Run with PowerShell"
                </p>
                <code style={{ 
                  background: 'rgba(0, 0, 0, 0.3)', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '0.5rem', 
                  fontSize: '1rem', 
                  display: 'inline-block', 
                  marginLeft: '3rem', 
                  fontWeight: '600' 
                }}>
                  LAUNCH_DESKTOP_APP.ps1
                </code>
              </div>
              
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.15)', 
                padding: '1rem', 
                borderRadius: '0.75rem' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '0.5rem' 
                }}>
                  <div style={{ 
                    background: '#2196F3', 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 'bold', 
                    flexShrink: 0,
                    color: 'white'
                  }}>
                    2
                  </div>
                  <strong style={{ fontSize: '1.125rem' }}>Batch File</strong>
                </div>
                <p style={{ margin: '0 0 0.5rem 3rem', opacity: 0.95 }}>
                  Just double-click to launch
                </p>
                <code style={{ 
                  background: 'rgba(0, 0, 0, 0.3)', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '0.5rem', 
                  fontSize: '1rem', 
                  display: 'inline-block', 
                  marginLeft: '3rem', 
                  fontWeight: '600' 
                }}>
                  LAUNCH_SIGN_RECOGNITION.bat
                </code>
              </div>
            </div>
            
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem', 
              background: 'rgba(255, 193, 7, 0.2)', 
              borderRadius: '0.75rem', 
              borderLeft: '4px solid #FFC107' 
            }}>
              <p style={{ 
                margin: 0, 
                display: 'flex', 
                alignItems: 'start', 
                gap: '0.5rem' 
              }}>
                <span style={{ fontSize: '1.25rem' }}></span>
                <span>
                  <strong>Tip:</strong> Both files are in your MyVoice_development folder
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignToText;
