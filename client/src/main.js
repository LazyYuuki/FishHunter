import ModelLoader from './model/loader.js'
import { RenderEngine } from './engine/render.js'
import { PhysicsEngine } from './engine/physics.js';
import { CharacterInfo } from './model/character.js';
import * as keyboardJS from 'keyboardjs'
import * as THREE from 'three'

import server from "./socket/socket.js"

server()

// function randomParameter() {
//   return Math.random(1, 100) * 20, Math.random(1, 100) * 20, Math.random(1, 100) * 20
// }

// const characterInfos = [
//   new CharacterInfo('raft', 10, new THREE.Vector3(0, 0, 0)),
  // new CharacterInfo('catfishAnim', 10, new THREE.Vector3(randomParameter())),
  // new CharacterInfo('croc', 10, new THREE.Vector3(randomParameter())),
  // new CharacterInfo('swordfish', 10, new THREE.Vector3(randomParameter())),
  // new CharacterInfo('tuna', 10, new THREE.Vector3(randomParameter())),
  // new CharacterInfo('turtle', 10, new THREE.Vector3(randomParameter())),
// ];

// function startAnimation(physicsEngine) {
//   physicsEngine.animate();
//   window.requestAnimationFrame(() => startAnimation(physicsEngine));
// }

// async function init() {
//   const characters = await Promise.all(characterInfos.map(info => ModelLoader.loadCharacter(info)));
//   const env = await ModelLoader.loadEnv();
//   const renderEngine = new RenderEngine(
//     document.querySelector('canvas.webgl'),
//     { width: window.innerWidth, height: window.innerHeight },
//     characters,
//     env
//   );
//   const physicsEngine = new PhysicsEngine(renderEngine, characters);
//   window.addEventListener('resize', () => {
//     renderEngine.resize({ width: window.innerWidth, height: window.innerHeight });
//   });
//   keyboardJS.bind('w', () => {
//     renderEngine.moveObject(
//       "forward"
//     )
//   });

  // keyboardJS.bind('w', () => {
  //   renderEngine.moveCamera({ x: 0, y: 0, z: -1 });
  // });

  // keyboardJS.bind('s', () => {
  //   renderEngine.moveCamera({ x: 0, y: 0, z: 1 });
  // });

  // keyboardJS.bind('a', () => {
  //   renderEngine.moveCamera({ x: -1, y: 0, z: 0 });
  // });

  // keyboardJS.bind('d', () => {
  //   renderEngine.moveCamera({ x: 1, y: 0, z: 0 });
  // });

//   startAnimation(physicsEngine);
// }

// init();
