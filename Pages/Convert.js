import '../App.css'
import './Convert.css'
import React, { useState, useEffect, useRef } from "react";
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import ybot from '../Models/ybot/ybot.glb';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Convert() {
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  let textFromAudio = React.createRef();
  let textFromInput = React.createRef();

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {

    ref.flag = false;
    ref.pending = false;

    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xf8fafc);

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

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });

    ref.camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth * 0.57 / (window.innerHeight - 70),
        0.1,
        1000
    )
    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);

    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    ref.camera.position.z = 2.4;
    ref.camera.position.y = 1.3;
    ref.camera.position.x = 0;

    let loader = new GLTFLoader();
    loader.load(
      ybot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if ( child.type === 'SkinnedMesh' ) {
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
    if(ref.animations.length === 0){
        ref.pending = false;
      return ;
    }
    requestAnimationFrame(ref.animate);
    if(ref.animations[0].length){
        if(!ref.flag) {
          if(ref.animations[0][0]==='add-text'){
            setText(text + ref.animations[0][1]);
            ref.animations.shift();
          }
          else{
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

  const sign = (inputRef) => {
    
    var str = inputRef.current.value.toUpperCase();
    var strWords = str.split(' ');
    setText('')

    for(let word of strWords){
      if(words[word]){
        ref.animations.push(['add-text', word+' ']);
        words[word](ref);
        
      }
      else{
        for(const [index, ch] of word.split('').entries()){
          if(index === word.length-1)
            ref.animations.push(['add-text', ch+' ']);
          else 
            ref.animations.push(['add-text', ch]);
          alphabets[ch](ref);
          
        }
      }
    }
  }

  const startListening = () =>{
    SpeechRecognition.startListening({continuous: true});
  }

  const stopListening = () =>{
    SpeechRecognition.stopListening();
  }

  return (
    <div className='convert-container'>
      <div className='convert-header'>
        <h1 className='convert-title'>Text to Sign Language</h1>
        <p className='convert-description'>
          Convert text or speech to sign language animations in real-time with our interactive 3D avatar
        </p>
      </div>
      
      <div className='convert-content'>
        <div className='convert-control-panel'>
          <div className='convert-section'>
            <h3 className='convert-section-title'>Processed Text</h3>
            <textarea rows={3} value={text} className='convert-textarea' readOnly placeholder='Processed text will appear here...' />
          </div>
          
          <div className='convert-section'>
            <div className={listening ? 'speech-status active' : 'speech-status'}>
              <i className={listening ? 'fa fa-circle' : 'fa fa-circle-o'} />
              Speech Recognition: {listening ? 'Active' : 'Inactive'}
            </div>
            <div className='convert-button-group'>
              <button className="convert-btn convert-btn-primary" onClick={startListening}>
                <i className="fa fa-microphone"/> Mic On
              </button>
              <button className="convert-btn convert-btn-secondary" onClick={stopListening}>
                <i className="fa fa-microphone-slash"/> Mic Off
              </button>
              <button className="convert-btn convert-btn-secondary" onClick={resetTranscript}>
                <i className="fa fa-eraser"/> Clear
              </button>
            </div>
            <textarea rows={3} ref={textFromAudio} value={transcript} placeholder='Speak to input text...' className='convert-textarea' />
            <button onClick={() => {sign(textFromAudio)}} className='convert-btn convert-btn-success'>
              <i className="fa fa-play"/> Start Speech Animation
            </button>
          </div>
          
          <div className='convert-section'>
            <h3 className='convert-section-title'>Text Input</h3>
            <textarea rows={3} ref={textFromInput} placeholder='Type text here...' className='convert-textarea' />
            <button onClick={() => {sign(textFromInput)}} className='convert-btn convert-btn-success'>
              <i className="fa fa-play"/> Start Text Animation
            </button>
          </div>
        </div>
        
        <div className='convert-canvas-panel'>
          <div id='canvas'/>
        </div>
        
        <div className='convert-settings-panel'>
          <div className='slider-setting'>
            <label className='slider-label'>
              Animation Speed: {Math.round(speed*100)/100}
            </label>
            <Slider
              axis="x"
              xmin={0.05}
              xmax={0.50}
              xstep={0.01}
              x={speed}
              onChange={({ x }) => setSpeed(x)}
              className='slider-container'
            />
          </div>
          
          <div className='slider-setting'>
            <label className='slider-label'>
              Pause Time: {pause} ms
            </label>
            <Slider
              axis="x"
              xmin={0}
              xmax={2000}
              xstep={100}
              x={pause}
              onChange={({ x }) => setPause(x)}
              className='slider-container'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Convert;