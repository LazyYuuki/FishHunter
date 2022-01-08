import * as THREE from "three"

const fishType = [
  'catfishAnim',
  "croc",
  "tuna",
  "turtle",
  "swordfish",
]

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

let pos_x = getRandomArbitrary(-80, 80);
let pos_z = getRandomArbitrary(-80, 80);
let rot_x = getRandomArbitrary(0, Math.PI);
let rot = new THREE.Euler(0, rot_x, 0);
let velocity = new THREE.Vector3(3, 0, 0);
velocity.applyEuler(rot);

const payload = {
  action: "spawnFish",
  payload: {
    position: new THREE.Vector3(pos_x, -4, pos_z),
    rot: rot,
    velocity: velocity,
  }
}

export default function spawnFish(socket) {
  socket.emit('client', {
    action: 'spawnFish',
    payload: {
      ...payload.payload,
      type: fishType[getRandomIntInclusive(0, 4)],
    }
  });
}