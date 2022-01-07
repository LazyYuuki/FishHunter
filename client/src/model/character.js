export class CharacterInfo {
  // name: string;
  // mass: number;
  // startPos: THREE.Vector3;

  constructor(
    name, mass, startPos
    // name: string, mass: number, startPos: THREE.Vector3
  ) {
    this.name = name;
    this.mass = mass;
    this.startPos = startPos;
  }
}

export class Character {
  // name: string;
  // body: CANNON.Body;
  // model: THREE.Group;

  constructor(
    name, body, model, curPos
    // name: string, body: CANNON.Body, model: THREE.Group
  ) {
    this.name = name;
    this.body = body;
    this.model = model;
    this.curPos = curPos;
  }
}
