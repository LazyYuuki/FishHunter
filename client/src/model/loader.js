import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as CANNON from "cannon-es";
import { Character } from './character.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

const loader = new GLTFLoader();

export default {
  loadEnv() {
    return loader.loadAsync(`../../resources/env.gltf`).then(gltf => {
      let model = gltf.scene;
      model.scale.setScalar(10);
      return model;
    });
  },

  loadCharacter(charInfo) {
    console.log(charInfo)
    return loader.loadAsync(`../../resources/${charInfo.name}.gltf`).then(gltf => {
      let halfExtents = charInfo.halfExtents;
      let model = gltf.scene;
      console.log(gltf)
      let body = new CANNON.Body({
        mass: charInfo.mass,
        shape: new CANNON.Box(new CANNON.Vec3(halfExtents.x, halfExtents.y, halfExtents.z)),
        collisionResponse: false
      });
      model.scale.setScalar(charInfo.scale);
      return new Character(charInfo, body, model);
    });
  },

  cloneCharacter(character) {
    let info = character.info;
    let halfExtents = info.halfExtents;
    let model = SkeletonUtils.clone(character.model);
    let body = new CANNON.Body({
      mass: info.mass,
      shape: new CANNON.Box(new CANNON.Vec3(halfExtents.x, halfExtents.y, halfExtents.z)),
      collisionResponse: false
    });
    return new Character(info, body, model);
  }

};
