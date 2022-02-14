import * as THREE from "three";
import "./style/style.css";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import Stats from "three/examples/jsm/libs/stats.module";
import * as dat from "dat.gui";
import randomColor from "randomcolor";

class Parent {
  constructor() {
    this.canvas = document.querySelector("#webgl-output");
    this.WebGL = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.Camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.Scene = new THREE.Scene();
    //other properties
    this.Meshes = {
      plane: this.plane(),
    };
    this.helper = {
      stats: this.stats(),
    };
    this.guiObject = {
      rotationBox: 0.04,
      addBox: () => {
        this.addBox();
      },
    };
    this.Indentifier = {};
    this.current = 0;
    this.TrackballControls = new TrackballControls(this.Camera, this.canvas);
    this.init();
  }
  init() {
    this.webGLConfig();
    this.spotLight();
    this.dat();
    this.cameraConfig();
    this.rerender();
  }
  //configurations
  webGLConfig() {
    this.WebGL.setSize(window.innerWidth, window.innerHeight);
    this.WebGL.render(this.Scene, this.Camera);
    this.WebGL.setPixelRatio(window.devicePixelRatio);
    this.WebGL.shadowMap.enabled = true;
    this.WebGL.setClearColor(0x000000);
  }
  cameraConfig() {
    this.Camera.position.set(-30, 30, 30);
    this.Camera.aspect = window.innerWidth / window.innerHeight;
    this.Camera.updateProjectionMatrix();
  }
  //Event like window eventLister
  onResize() {
    window.addEventListener("resize", () => {
      this.WebGL.setSize(window.innerWidth, window.innerHeight);
    });
  }
  //geometries
  plane() {
    const Geometry = new THREE.PlaneGeometry(50, 20);
    const Material = new THREE.MeshLambertMaterial({
      color: 0x808080,
      side: THREE.DoubleSide,
    });
    const Mesh = new THREE.Mesh(Geometry, Material);
    Mesh.receiveShadow = true;
    Mesh.rotation.x = THREE.MathUtils.degToRad(90);
    Mesh.position.y = -2;
    this.Scene.add(Mesh);
    return Mesh;
  }
  //light
  ambientLight() {
    const light = new THREE.AmbientLight(0x3c3c3c);
  }
  spotLight() {
    const light = new THREE.SpotLight(0xffffff, 1.8, 150, 120);
    light.position.set(0, 60, 0);
    light.castShadow = true;
    light.visible = true;
    light.shadow.mapSize = new THREE.Vector2(1024, 1024);
    light.shadow.camera.far = 130;
    light.shadow.camera.near = 0.1;
    this.Scene.add(light);
  }
  //helper
  stats() {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    return stats;
  }
  dat() {
    const gui = new dat.GUI();
    gui.add(this.guiObject, "rotationBox", 0, 0.5);
    gui.add(this.guiObject, "addBox");
  }
  //rerender
  rerender = () => {
    this.WebGL.render(this.Scene, this.Camera);
    this.Camera.lookAt(this.Scene.position);
    this.TrackballControls.update();
    this.helper.stats.begin();
    this.helper.stats.end();
    requestAnimationFrame(this.rerender);
  };
  //add somthin
  addBox() {
    function sizeRandom(min, max) {
      return Math.random() * (max - min) + min;
    }
    const size = sizeRandom(1, 3);
    const colur = randomColor();
    const generatedColor = parseInt(colur.replace("#", "0x"));
    const Geometry = new THREE.BoxGeometry(size, size, size);
    const Material = new THREE.MeshLambertMaterial({ color: generatedColor });
    const Mesh = new THREE.Mesh(Geometry, Material);
    Mesh.castShadow = true;
    Mesh.position.z = sizeRandom(-9, 9);
    Mesh.position.x = sizeRandom(-22, 22);
    this.Scene.add(Mesh);
    this.boxRotation(Mesh);
  }
  //animation
  boxRotation = (Mesh) => {
    requestAnimationFrame(() => {
      this.boxRotation(Mesh);
    });
    Mesh.rotation.x += this.guiObject.rotationBox;
    Mesh.rotation.y += this.guiObject.rotationBox;
    Mesh.rotation.z += this.guiObject.rotationBox;
  };
}
new Parent();
