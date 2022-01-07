import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as CANNON from "cannon";
import { Character } from './character.js';

const loader = new GLTFLoader();

export default {
  loadEnv() {
    return loader.loadAsync(`../../resources/env.gltf`).then(gltf => {
      return gltf.scene;
    });
  },
  // loadEnv(): Promise<THREE.Group> {
  //   return loader.loadAsync(`/env.gltf`).then(gltf => {
  //     return gltf.scene;
  //   });
  // },
  loadCharacter(charInfo) {
    return loader.loadAsync(`../../resources/${charInfo.name}.gltf`).then(gltf => {
      let model = gltf.scene;
      let body = new CANNON.Body({
        mass: charInfo.mass,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
        collisionResponse: 0,
      });
      let startPos = charInfo.startPos;
      model.position.copy(startPos);
      body.position.set(startPos.x, startPos.y, startPos.z);
      return new Character(charInfo.name, body, model);
    });
  }
  // loadCharacter(charInfo: CharacterInfo): Promise<Character> {
  //   return loader.loadAsync(`/${charInfo.name}.gltf`).then(gltf => {
  //     let model = gltf.scene;
  //     let body = new CANNON.Body({
  //       mass: charInfo.mass,
  //       shape: new CANNON.Sphere(1)
  //     });
  //     let startPos = charInfo.startPos;
  //     model.position.copy(startPos);
  //     body.position.set(startPos.x, startPos.y, startPos.z);
  //     return new Character(charInfo.name, body, model);
  //   });
  // }
};
