import * as THREE from "three";
import "./style/style.css";
import Stats from "three/examples/jsm/libs/stats.module";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import * as dat from "dat.gui";

class Parent {
  constructor() {
    //properties
    this.canvas = document.querySelector("#webgl-output");
    this.Renderer = new THREE.WebGL1Renderer({ canvas: this.canvas });
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
      window.innerWidth / window.innerHeight,
      0.01,
      2000
    );
    this.trackball = this.cameraChanges();
    //stats
    this.stats = this.statsPanel();
    //otherProperties
    this.steps = 0;
    this.guiProperties = {
      bounceSpeed: 0.04,
      boxRotation: 0.04,
    };
    this.guiObject = {
      rotationBox: 0.04,
      addBox: () => {
        this.addBox();
      },
      removeCube: () => {
        this.removeCube();
      },
      removeAllCube: () => {
        this.removeAllCube();
      },
    };

    this.Indentifier = {};
    this.current = 0;
    this.TrackballControls = new TrackballControls(this.Camera, this.canvas);
    this.animations = [];
    this.track;
    this.init();
  }
  init() {
    this.sceneConfig();
    this.ambientLight();
    this.webGLConfig();
    this.spotLight();
    this.dat();
    this.cameraConfig();
    this.rerender();
    this.onResize();
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
    const trackBall = new TrackballControls(this.Camera, this.canvas);
    const clock = new THREE.Clock();
    return { trackBall, clock };
  }
  sceneConfig() {
    this.Scene.fog = new THREE.Fog(0xffffff, 0.01, 100);
  }
  //Event like window eventLister
  onResize() {
    window.addEventListener("resize", () => {
      this.Camera.aspect = window.innerWidth / window.innerHeight;
      this.Camera.updateProjectionMatrix();
      this.WebGL.setSize(window.innerWidth, window.innerHeight);
      this.WebGL.setPixelRatio(window.devicePixelRatio);
      if (window.innerWidth < 768) {
        this.Camera.position.z = 0;
        this.Camera.rotateX(0);
        this.Camera.rotateZ(0);
        this.Camera.rotateY(0);
      } else {
        this.Camera.position.z = 30;
        this.Camera.rotateX(0);
        this.Camera.rotateZ(0);
        this.Camera.rotateY(0);
      }
    });
  }
  // lights
  spotLight() {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 50, 30);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 0.1;
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
    const Mesh = new THREE.Mesh(Geometry, Material);
    Mesh.receiveShadow = true;
    Mesh.rotation.x = THREE.MathUtils.degToRad(-90);
    Mesh.position.y = -2;
    this.Scene.add(Mesh);
    return Mesh;
  }
  //light
  ambientLight() {
    const light = new THREE.AmbientLight(0x3c3c3c);
    light.position.y = 10;
    this.Scene.add(light);
  }
  spotLight() {
    const light = new THREE.SpotLight(0xffffff, 1.8, 150, 120);
    light.position.set(0, 60, 0);
    light.castShadow = true;
    light.visible = true;
    light.shadow.camera.far = 130;
    light.shadow.camera.near = 0.1;
    this.Scene.add(light);
  }
  statsPanel() {
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
    return stats;
  }
  //rerenderer
  Rerender = () => {
    this.stats.begin();
    this.stats.end();
    this.Renderer.render(this.Scene, this.Camera);
    requestAnimationFrame(this.Rerender);
    this.trackball.trackBall.update(this.trackball.clock.getDelta());
  };
  // gui
  gui = () => {
    const gui = new dat.GUI();
    gui.add(this.guiObject, "rotationBox", 0, 0.5);
    gui.add(this.guiObject, "addBox");
    gui.add(this.guiObject, "removeCube");
    gui.add(this.guiObject, "removeAllCube");
  }
  //add somthing
  removeAllCube() {
    let length = this.Scene.children.length - 1;
    for (let i = length; i >= 0; i--) {
      if (this.Scene.children[i].name.includes("cube-")) {
        this.Scene.children.splice(i, 1);
      }
    }
  }
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
    Mesh.name = "cube-" + this.Scene.children.length;
    this.Scene.add(Mesh);
  }
  removeCube() {
    const length = this.Scene.children.length - 1;
    if (this.Scene.children[length].name.includes("cube-")) {
      this.Scene.children.pop();
    }
  }
  //animation
  boxRotation() {
    this.Scene.traverse((object) => {
      if (object.name.includes("cube")) {
        object.rotateX(this.guiObject.rotationBox);
        object.rotateY(this.guiObject.rotationBox);
        object.rotateZ(this.guiObject.rotationBox);
      }
    });
  }
  //rerender
  rerender = () => {
    this.WebGL.render(this.Scene, this.Camera);
    this.Camera.lookAt(this.Meshes.plane.position);
    this.TrackballControls.update();
    this.helper.stats.update();
    this.boxRotation();
    requestAnimationFrame(this.rerender);
  };
}

new Parent();
