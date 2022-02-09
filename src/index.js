import * as THREE from "three";
import "./style/style.css";

class Frick {
  constructor() {
    this.y = "yes";
  }
  ft() {
    return this.y;
  }
}
const ThreeJs = new Frick();
console.log(ThreeJs.ft());
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";

//query canvas
const canvas = document.getElementById("c");
//size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
//parents
const renderer = new THREE.WebGL1Renderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setClearColor(new THREE.Color(0x000000));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  size.width / size.height,
  0.1,
  1000
);
// camera.position.set(-30, 30, 40);
// show axes helper
const axes = new THREE.AxesHelper(20);
scene.add(axes);

//geometries
const planeGeometry = new THREE.PlaneGeometry(60, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x808080,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -3.5;
plane.rotateX(Math.PI * -0.5);
scene.add(plane);

const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
const materialBox = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const Box = new THREE.Mesh(boxGeometry, materialBox);
Box.position.x = -10;
scene.add(Box);

//Spotlight
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 40, -15);
spotLight.castShadow = true;
spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
console.log(spotLight.shadow.mapSize);
spotLight.shadow.camera.far = 130;
spotLight.shadow.camera.near = 40;
console.log("HERE");
//render the scene and camera
camera.rotateY(0.1);
camera.position.z = 7;
console.log(camera.position);
renderer.render(scene, camera);
