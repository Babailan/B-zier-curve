import * as THREE from "three";
import "./style/style.css";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";

class Frick {
  constructor() {
    //properties
    const canvas = document.querySelector("#c");
    this.Renderer = new THREE.WebGL1Renderer({ canvas });
    this.Scene = new THREE.Scene();
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.Camera = new THREE.PerspectiveCamera(
      70,
      this.size.width / this.size.height,
      0.1,
      1000
    );

    this.init();
  }
  cameraChanges() {
    this.Camera.position.set(-30, 40, 40);
    this.Camera.lookAt(this.Scene.position);
  }
  axesHelper() {
    const axes = new THREE.AxesHelper(20);
    this.Scene.add(axes);
  }
  Plane() {
    const planeGeometry = new THREE.PlaneGeometry(60, 30);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x808080,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -3.5;
    plane.rotateX(Math.PI * -0.5);
    this.Scene.add(plane);
  }
  Box() {
    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const materialBox = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    const Box = new THREE.Mesh(boxGeometry, materialBox);
    Box.position.x = -10;
    this.Scene.add(Box);
  }
  spotLight() {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    console.log(spotLight.shadow.mapSize);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;
    this.Scene.add(spotLight);
  }
  onResize() {
    window.addEventListener("resize", () => {
      this.size.width = window.innerWidth;
      this.size.height = window.innerHeight;
      this.Camera.aspect = window.innerWidth / window.innerHeight;
      this.Camera.updateProjectionMatrix();

      //render Again
      this.Renderer.setSize(this.size.width, this.size.height);
      this.Renderer.render(this.Scene, this.Camera);
    });
  }
  init() {
    this.axesHelper();
    this.cameraChanges();
    this.Plane();
    this.Box();
    this.Renderer.setPixelRatio(window.devicePixelRatio);
    this.Renderer.setSize(this.size.width, this.size.height);
    this.Renderer.render(this.Scene, this.Camera);

    //Event Listener
    this.onResize();
  }
}

new Frick();
