import * as THREE from "three";
import "./style/style.css";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";
function component() {
  const canvas = document.createElement("canvas");
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
  camera.position.set(-40, 30, 40);
  camera.lookAt(scene.position);
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
  plane.position.y = 0 - 1;
  plane.rotateX(Math.PI * -0.5);
  scene.add(plane);

  renderer.render(scene, camera);
  return canvas;
}

document.body.appendChild(component());
