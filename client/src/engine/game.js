import * as THREE from "three";
import ModelLoader from '../model/loader.js';

const timeStep = 1 / 60;

export class GameEngine {
  // renderEngine: RenderEngine;
  // physicsEngine: PhysicsEngine;
  // characterMap: Map<string, Character>;
  // clock: THREE.Clock;

  constructor(
    renderEngine, physicsEngine
    // renderEngine: RenderEngine, physicsEngine: PhysicsEngine
  ) {
    this.renderEngine = renderEngine;
    this.physicsEngine = physicsEngine;
    this.clock = new THREE.Clock();
    this.characterMap = new Map();
  }

  async loadCharacters(infos) {
    console.log("loadCharacters")
    const characters = await Promise.all(
      infos.map(info => ModelLoader.loadCharacter(info))
    );
    console.log(characters)
    console.log("FOR LOOP")
    for (const character of characters) {
      console.log(character)
      this.characterMap.set(character.info.name, character);
    }
  }

  spawnCharacter(name,pos) {
    console.log(this.characterMap)
    if (!this.characterMap.has(name)) {
      return;
    }
    let character = this.characterMap.get(name);
    console.log(character)
    let spawned = ModelLoader.cloneCharacter(character);
    spawned.model.position.copy(pos);
    spawned.body.position.set(pos.x, pos.y, pos.z);
    this.renderEngine.addCharacter(spawned);
    this.physicsEngine.addCharacter(spawned);
  }

  loop() {
    let dt = this.clock.getDelta();
    this.physicsEngine.step(dt ? dt : timeStep);
    this.renderEngine.render();
  }
}
