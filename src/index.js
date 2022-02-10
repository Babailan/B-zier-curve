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
    this.Meshes = {};
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
  init() {
    this.axesHelper();
    this.cameraChanges();
    this.Plane();
    this.Box();
    this.Sphere();
    this.spotLight();
    this.rendererConfig();

    //Event Listener
    this.onResize();
  }
  rendererConfig() {
    this.Renderer.shadowMap.enabled = true;
    this.Renderer.setPixelRatio(window.devicePixelRatio);
    this.Renderer.setClearColor(0x000000);
    this.Renderer.setSize(this.size.width, this.size.height);
    this.Renderer.render(this.Scene, this.Camera);
  }
  cameraChanges() {
    this.Camera.position.set(-30, 30, 30);
    this.Camera.lookAt(this.Scene.position);
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

  //geometries
  axesHelper() {
    const axes = new THREE.AxesHelper(12);
    this.Scene.add(axes);
  }
  Plane() {
    const planeGeometry = new THREE.PlaneGeometry(60, 30);
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0x808080,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.y = -3.5;
    plane.rotateX(Math.PI * -0.5);
    plane.receiveShadow = true;
    this.Meshes["plane"] = { ...plane };
    this.Scene.add(plane);
  }
  Box() {
    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const materialBox = new THREE.MeshLambertMaterial({
      color: 0xff0000,
    });
    const Box = new THREE.Mesh(boxGeometry, materialBox);
    Box.position.x = -10;
    Box.castShadow = true;
    this.Scene.add(Box);
  }
  spotLight() {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-50, 30, 10);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 4;
    spotLight.visible = true;
    this.Scene.add(spotLight);
  }
  Sphere() {
    const sphereGeometry = new THREE.SphereGeometry(4);
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.position.x = 20;
    mesh.castShadow = true;
    this.Scene.add(mesh);
  }

  animate() {
    this.rendererConfig();
  }
}

const Render = new Frick();
Render.animate();
