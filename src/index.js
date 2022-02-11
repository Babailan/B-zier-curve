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
    this.Meshes = {
      plane: this.Plane(),
      box: this.Box(),
      sphere: this.Sphere(),
    };
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
    this.cameraChanges();
    this.spotLight();
    this.rendererConfig();
    //Event Listener
    this.onResize();
    this.Rerender();
  }
  rendererConfig() {
    this.Renderer.shadowMap.enabled = true;
    this.Renderer.setPixelRatio(window.devicePixelRatio);
    this.Renderer.setClearColor(0x000000);
    this.Renderer.setSize(this.size.width, this.size.height);
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
      this.Renderer.setPixelRatio(window.devicePixelRatio);
    });
  }
  // lights
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
    const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    mesh.position.y = -3.5;
    mesh.rotateX(Math.PI * -0.5);
    mesh.receiveShadow = true;
    this.Scene.add(mesh);
    return mesh;
  }
  Box() {
    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const materialBox = new THREE.MeshLambertMaterial({
      color: 0xff0000,
    });
    const mesh = new THREE.Mesh(boxGeometry, materialBox);
    mesh.position.x = -10;
    mesh.castShadow = true;
    this.Scene.add(mesh);
    return mesh;
  }
  Sphere() {
    const sphereGeometry = new THREE.SphereGeometry(4);
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.position.x = 20;
    mesh.castShadow = true;
    this.Scene.add(mesh);
    return mesh;
  }
  positionChanger = (mesh, axis, distance) => {
    mesh.position[axis] = distance;
  };
  Rerender = () => {
    requestAnimationFrame(this.Rerender);
    this.Renderer.render(this.Scene, this.Camera);
  };
}

const Render = new Frick();
Render.positionChanger(Render.Meshes.sphere, "y", 10);
Render.rendererConfig();
