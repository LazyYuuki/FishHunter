export class CharacterInfo {
  // name: string;
  // mass: number;
  // scale: number;
  // startPos: THREE.Vector3;
  // halfExtents: THREE.Vector3;

  constructor(
    name, mass, scale, halfExtents
    // name: string, mass: number, scale: number, startPos: THREE.Vector3, 
    //   halfExtents: THREE.Vector3
  ) {
    this.name = name;
    this.mass = mass;
    this.scale = scale;
    // this.startPos = startPos;
    this.halfExtents = halfExtents;
  }
}

export class Character {

  constructor(
    name, info, body, model
  ) {
    this.info = info;
    this.body = body;
    this.model = model;
  }
}
