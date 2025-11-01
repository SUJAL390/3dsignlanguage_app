import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Type,
  Settings,
  RotateCcw,
  Zap,
  Clock
} from "lucide-react";
import Slider from 'react-input-slider';

import ybot from '../Models/ybot/ybot.glb';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import './LearnSign.css';

function LearnSign() {
  const [activeTab, setActiveTab] = useState('alphabets');
  const [selectedSign, setSelectedSign] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [showSettings, setShowSettings] = useState(false);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = null; // Transparent background

    // Enhanced lighting for proper avatar color rendering
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    ref.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = false;
    ref.scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 0, -5);
    ref.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
    rimLight.position.set(0, -5, -5);
    ref.scene.add(rimLight);

    ref.camera = new THREE.PerspectiveCamera(
      30,
      1,
      0.1,
      1000
    );

    ref.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    ref.renderer.setSize(400, 500);
    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    ref.camera.position.z = 1.7;
    ref.camera.position.y = 1.5;
    ref.camera.position.x = 0;

    let loader = new GLTFLoader();
    loader.load(
      ybot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.type === 'SkinnedMesh') {
            child.frustumCulled = false;
            // Apply light cyan/turquoise color to avatar
            child.material = new THREE.MeshStandardMaterial({
              color: 0x7FE5E8,
              metalness: 0.2,
              roughness: 0.3,
              emissive: 0x4DD4D7,
              emissiveIntensity: 0.15
            });
          }
        });
        ref.avatar = gltf.scene;
        ref.avatar.position.set(0, 0, 0);
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => {
        console.log(xhr);
      }
    );
  }, [ref]);

  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      setIsPlaying(false);
      return;
    }
    requestAnimationFrame(ref.animate);
    if (ref.animations[0].length) {
      if (!ref.flag) {
        for (let i = 0; i < ref.animations[0].length;) {
          let [boneName, action, axis, limit, sign] = ref.animations[0][i];
          if (sign === "+" && ref.avatar.getObjectByName(boneName)[action][axis] < limit) {
            ref.avatar.getObjectByName(boneName)[action][axis] += speed;
            ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(ref.avatar.getObjectByName(boneName)[action][axis], limit);
            i++;
          } else if (sign === "-" && ref.avatar.getObjectByName(boneName)[action][axis] > limit) {
            ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
            ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(ref.avatar.getObjectByName(boneName)[action][axis], limit);
            i++;
          } else {
            ref.animations[0].splice(i, 1);
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false;
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  };

  const handleSignClick = (sign, type) => {
    if (ref.animations.length === 0) {
      setSelectedSign(sign);
      setIsPlaying(true);
      if (type === 'alphabet') {
        alphabets[sign](ref);
      } else {
        words[sign](ref);
      }
    }
  };

  const resetAvatar = () => {
    if (ref.avatar) {
      defaultPose(ref);
      setSelectedSign(null);
      setIsPlaying(false);
    }
  };

  const alphabetsList = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const wordsList = words.wordList || [];

  return (
    <div className="learn-sign-container">
      <div className="learn-sign-header">
        <div className="header-content">
          <h1>
            <BookOpen size={32} />
            Learn Sign Language
          </h1>
          <p className="page-description">
            Master Sign Language through interactive 3D avatar demonstrations.
            Choose from alphabets and common words to begin your learning journey.
          </p>
        </div>
      </div>

      <div className="learn-sign-content">
        <div className="signs-panel">
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'alphabets' ? 'active' : ''}`}
              onClick={() => setActiveTab('alphabets')}
            >
              <Type size={18} />
              Alphabets
            </button>
            <button
              className={`tab-button ${activeTab === 'words' ? 'active' : ''}`}
              onClick={() => setActiveTab('words')}
            >
              <BookOpen size={18} />
              Words
            </button>
          </div>

          {activeTab === 'alphabets' && (
            <div className="signs-grid">
              {alphabetsList.map((letter) => (
                <button
                  key={letter}
                  className={`sign-button ${selectedSign === letter ? 'active' : ''}`}
                  onClick={() => handleSignClick(letter, 'alphabet')}
                  disabled={isPlaying}
                >
                  <span className="sign-letter">{letter}</span>
                  <span className="sign-label">Letter</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'words' && (
            <div className="signs-grid">
              {wordsList.map((word) => (
                <button
                  key={word}
                  className={`sign-button ${selectedSign === word ? 'active' : ''}`}
                  onClick={() => handleSignClick(word, 'word')}
                  disabled={isPlaying}
                >
                  <span className="sign-letter">{word}</span>
                  <span className="sign-label">Word</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="avatar-panel">
          <div className="avatar-content-wrapper">
            <div className="avatar-header">
              <h3>
                <BookOpen size={20} />
                Animation Preview
              </h3>
              {selectedSign && (
                <span className="avatar-status-badge">
                  Showing: <strong>{selectedSign}</strong>
                </span>
              )}
            </div>
            
            <div id="canvas" />
            
            {isPlaying && (
              <div className="playing-indicator">
                <div className="playing-pulse" />
                Playing Animation
              </div>
            )}
          </div>

          <div className="avatar-controls">
            <div className="controls-section">
              <div className="control-row">
                <button 
                  className="control-button secondary" 
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings size={18} />
                  {showSettings ? 'Hide Settings' : 'Show Settings'}
                </button>
                <button 
                  className="control-button secondary" 
                  onClick={resetAvatar}
                  disabled={!selectedSign}
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>
            </div>

            {showSettings && (
              <div className="panel-section">
                <h4>
                  <Settings size={16} />
                  Animation Settings
                </h4>

                <div className="setting-group">
                  <label className="setting-label">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Zap size={14} />
                      Speed
                    </span>
                    <span className="setting-value">{Math.round(speed * 100) / 100}</span>
                  </label>
                  <Slider
                    axis="x"
                    xmin={0.05}
                    xmax={0.50}
                    xstep={0.01}
                    x={speed}
                    onChange={({ x }) => setSpeed(x)}
                    className="speed-slider"
                  />
                </div>

                <div className="setting-group">
                  <label className="setting-label">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={14} />
                      Pause
                    </span>
                    <span className="setting-value">{pause}ms</span>
                  </label>
                  <Slider
                    axis="x"
                    xmin={0}
                    xmax={2000}
                    xstep={100}
                    x={pause}
                    onChange={({ x }) => setPause(x)}
                    className="pause-slider"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnSign;
