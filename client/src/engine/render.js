import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class RenderEngine {
  // canvas: Element;
  // scene: THREE.Scene;
  // characters: Character[];
  // env: THREE.Group;
  // pointLight: THREE.PointLight;
  // camera: THREE.PerspectiveCamera;
  // renderer: THREE.WebGLRenderer;

  constructor(
    canvas, sizes, characters, env
    // canvas: Element, sizes: { width: number, height: number },
    // characters: Character[], env: THREE.Group
  ) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.characters = characters;
    for (const character of this.characters) {
      this.scene.add(character.model);
    }
    this.env = env;
    this.scene.add(env);
    let ambi_light_color = new THREE.Color(0xffffff);   //0x2a1a3a
    this.scene.add(new THREE.AmbientLight(ambi_light_color, 0.75));
    this.pointLight = new THREE.PointLight(0xffffff, 1, 100);
    this.pointLight.position.set(0, 0, 10);
    this.scene.add(this.pointLight);
    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 20;
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.update();
  }

  resize(
    sizes
    // sizes: { width: number, height: number }
  ) {
    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  moveCamera(vec) {
    this.camera.position.add(new THREE.Vector3(vec.x, vec.y, vec.z));
  }
}
