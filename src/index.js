import * as THREE from "three";
import "./style/style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

function component() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  //resize listener

  const renderer = new THREE.WebGL1Renderer({ canvas });
  renderer.setClearColor(new THREE.Color(0x000000));
  window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  var scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // create a render and set the size
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // show axes in the screen
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);

  // add the plane to the scene
  scene.add(plane);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // position the cube
  cube.position.set(-4, 3, 0);

  // add the cube to the scene
  scene.add(cube);

  // create a sphere
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x7777ff,
    wireframe: true,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.set(20, 4, 2);

  // add the sphere to the scene
  scene.add(sphere);

  // position and point the camera to the center of the scene
  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  // render the scene
  renderer.render(scene, camera);
  return canvas;
}

document.body.appendChild(component());
