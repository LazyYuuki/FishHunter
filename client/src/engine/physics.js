import * as CANNON from "cannon-es";

export class PhysicsEngine {

  constructor() {
    this.world = new CANNON.World({
    })
    this.characters = []
  }

  addCharacter(character) {
    this.world.addBody(character.body);
    this.characters.push(character);
  }

  step(dt) {
    this.world.step(dt);
    for (const character of this.characters) {
      let position = character.body.position;
      let quaternion = character.body.quaternion;
      character.model.position.set(position.x, position.y, position.z);
      character.model.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
  }

}
