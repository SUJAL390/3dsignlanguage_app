import '../App.css'
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Play, Pause, RotateCcw, Settings, User, BookOpen, Zap } from 'lucide-react';
import './LearnSign.css';

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function LearnSign() {
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [activeTab, setActiveTab] = useState('alphabets');
  const [selectedSign, setSelectedSign] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xf8fafc);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    ref.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 5, 5);
    ref.scene.add(directionalLight);

    ref.camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth*0.57 / (window.innerHeight - 70),
        0.1,
        1000
    )

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.setSize(window.innerWidth * 0.57, (window.innerHeight - 70));
    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    let loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if ( child.type === 'SkinnedMesh' ) {
            child.frustumCulled = false;
          }
    });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      (xhr) => {
        console.log(xhr);
      }
    );

  }, [ref, bot]);

  ref.animate = () => {
    if(ref.animations.length === 0){
        ref.pending = false;
        setIsPlaying(false);
      return ;
    }
    requestAnimationFrame(ref.animate);
    if(ref.animations[0].length){
        if(!ref.flag) {
          for(let i=0;i<ref.animations[0].length;){
            let [boneName, action, axis, limit, sign] = ref.animations[0][i]
            if(sign === "+" && ref.avatar.getObjectByName(boneName)[action][axis] < limit){
                ref.avatar.getObjectByName(boneName)[action][axis] += speed;
                ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(ref.avatar.getObjectByName(boneName)[action][axis], limit);
                i++;
            }
            else if(sign === "-" && ref.avatar.getObjectByName(boneName)[action][axis] > limit){
                ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
                ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(ref.avatar.getObjectByName(boneName)[action][axis], limit);
                i++;
            }
            else{
                ref.animations[0].splice(i, 1);
            }
          }
        }
    }
    else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  }

  const playSign = (signType, signName) => {
    if(ref.animations.length === 0){
      setSelectedSign(signName);
      setIsPlaying(true);
      if(signType === 'alphabet') {
        alphabets[signName](ref);
      } else {
        words[signName](ref);
      }
    }
  };

  const resetAvatar = () => {
    if(ref.avatar) {
      defaultPose(ref);
      setSelectedSign(null);
      setIsPlaying(false);
    }
  };

  const alphabetsList = [];
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(i + 65);
    alphabetsList.push(
      <motion.button
        key={letter}
        className={`sign-button ${selectedSign === letter ? 'active' : ''}`}
        onClick={() => playSign('alphabet', letter)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isPlaying}
      >
        <span className="sign-letter">{letter}</span>
        <span className="sign-label">Alphabet</span>
      </motion.button>
    );
  }

  const wordsList = [];
  for (let i = 0; i < words.wordList.length; i++) {
    const word = words.wordList[i];
    wordsList.push(
      <motion.button
        key={word}
        className={`sign-button ${selectedSign === word ? 'active' : ''}`}
        onClick={() => playSign('word', word)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isPlaying}
      >
        <span className="sign-letter">{word}</span>
        <span className="sign-label">Word</span>
      </motion.button>
    );
  }

  return (
    <div className="learn-sign-container">
      <div className="learn-sign-header">
        <div className="header-content">
          <h1 className="page-title">
            <BookOpen size={32} />
            Learn Sign Language
          </h1>
          <p className="page-description">
            Interactive 3D learning experience with customizable avatars and real-time animations
          </p>
        </div>
        <div className="header-actions">
          <motion.button
            className="settings-toggle"
            onClick={() => setShowSettings(!showSettings)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </div>

      <div className="learn-sign-content">
        <div className="signs-panel">
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'alphabets' ? 'active' : ''}`}
              onClick={() => setActiveTab('alphabets')}
            >
              <span className="tab-icon">🔤</span>
              Alphabets (A-Z)
            </button>
            <button
              className={`tab-button ${activeTab === 'words' ? 'active' : ''}`}
              onClick={() => setActiveTab('words')}
            >
              <span className="tab-icon">📝</span>
              Words ({words.wordList.length})
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="signs-grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'alphabets' ? alphabetsList : wordsList}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="avatar-panel">
          <div className="avatar-header">
            <div className="avatar-info">
              <h3>3D Avatar Preview</h3>
              {selectedSign && (
                <div className="current-sign">
                  <span className="sign-indicator">Currently showing:</span>
                  <span className="sign-value">{selectedSign}</span>
                </div>
              )}
            </div>
            <div className="avatar-controls">
              <motion.button
                className="control-button reset"
                onClick={resetAvatar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Reset Avatar"
              >
                <RotateCcw size={16} />
              </motion.button>
            </div>
          </div>

          <div className="canvas-container">
            <div id='canvas' className="avatar-canvas" />
            {isPlaying && (
              <div className="playing-indicator">
                <motion.div
                  className="playing-pulse"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span>Playing Animation</span>
              </div>
            )}
          </div>
        </div>

        <div className="controls-panel">
          <div className="panel-section">
            <h4 className="panel-title">
              <User size={18} />
              Avatar Selection
            </h4>
            <div className="avatar-selection">
              <motion.div
                className={`avatar-option ${bot === xbot ? 'active' : ''}`}
                onClick={() => setBot(xbot)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={xbotPic} alt='XBOT Avatar' />
                <span>XBOT</span>
              </motion.div>
              <motion.div
                className={`avatar-option ${bot === ybot ? 'active' : ''}`}
                onClick={() => setBot(ybot)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={ybotPic} alt='YBOT Avatar' />
                <span>YBOT</span>
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                className="panel-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="panel-title">
                  <Settings size={18} />
                  Animation Settings
                </h4>

                <div className="setting-group">
                  <label className="setting-label">
                    <Zap size={16} />
                    Animation Speed: {Math.round(speed*100)/100}
                  </label>
                  <Slider
                    axis="x"
                    xmin={0.05}
                    xmax={0.50}
                    xstep={0.01}
                    x={speed}
                    onChange={({ x }) => setSpeed(x)}
                    className='speed-slider'
                  />
                </div>

                <div className="setting-group">
                  <label className="setting-label">
                    <Pause size={16} />
                    Pause Duration: {pause}ms
                  </label>
                  <Slider
                    axis="x"
                    xmin={0}
                    xmax={2000}
                    xstep={100}
                    x={pause}
                    onChange={({ x }) => setPause(x)}
                    className='pause-slider'
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default LearnSign;