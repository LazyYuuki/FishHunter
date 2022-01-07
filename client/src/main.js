import ModelLoader from './model/loader.js'
import { RenderEngine } from './engine/render.js'
import { PhysicsEngine } from './engine/physics.js';
import { CharacterInfo } from './model/character.js';
import * as THREE from 'three'
import { GameEngine } from './engine/game.js';
import server from "./socket/socket.js"

const fishType = [
  'catfishAnim',
  "croc",
  "tuna",
  "turtle",
  "swordfish",
]

server()

const characterInfos = [
  new CharacterInfo(
    'catfishAnim', 10, 1, new THREE.Vector3(1, 1, 1)
  ),
  new CharacterInfo(
    'croc', 10, 1, new THREE.Vector3(1, 1, 1)
  ),
  new CharacterInfo(
    'raft', 10, 10, new THREE.Vector3(1, 1, 1)
  ),
  new CharacterInfo(
    'swordfish', 10, 1, new THREE.Vector3(1, 1, 1)
  ),
  new CharacterInfo(
    'tuna', 10, 1, new THREE.Vector3(1, 1, 1)
  ),
  new CharacterInfo(
    'turtle', 10, 1, new THREE.Vector3(1, 1, 1)
  ),
  new CharacterInfo(
    'Derringer', 10, 1, new THREE.Vector3(1, 1, 1)
  ),
  new CharacterInfo(
    'machi', 10, 1, new THREE.Vector3(1, 1, 1)
  ),
];

function startAnimation(gameEngine) {
  gameEngine.loop()
  window.requestAnimationFrame(() => startAnimation(gameEngine));
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

async function init() {
  const env = await ModelLoader.loadEnv();
  // const water = await ModelLoader.loadWater();water
  const renderEngine = new RenderEngine(
    document.querySelector('canvas.webgl'),
    { width: window.innerWidth, height: window.innerHeight },
    env
  );
  const physicsEngine = new PhysicsEngine();
  const gameEngine = new GameEngine(renderEngine, physicsEngine);

  window.addEventListener('resize', () => {
    renderEngine.resize({ width: window.innerWidth, height: window.innerHeight });
  });
  // keyboardJS.bind('w', () => {
  //     renderEngine.moveCamera({x: 0, y: 0, z: -1});
  // });

  // keyboardJS.bind('s', () => {
  //     renderEngine.moveCamera({x: 0, y: 0, z: 1});
  // });

  // keyboardJS.bind('a', () => {
  //     renderEngine.moveCamera({x: -1, y: 0, z: 0});
  // });

  // keyboardJS.bind('d', () => {
  //     renderEngine.moveCamera({x: 1, y: 0, z: 0});
  // });

  console.log("Loading all characters")
  await gameEngine.loadCharacters(characterInfos);
  startAnimation(gameEngine);

  gameEngine.spawnCharacter('raft', new THREE.Vector3());
  setInterval(() => {
    // console.log("SPAWMING CATFISH")
    let pos_x = getRandomArbitrary(-80, 80);
    let pos_z = getRandomArbitrary(-80, 80);
    gameEngine.spawnCharacter(
      fishType[Math.floor(Math.random() * fishType.length)],
      new THREE.Vector3(pos_x, -4, pos_z)
    );
  }, 3000);

}

init();
