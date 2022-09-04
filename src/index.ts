import * as THREE from 'three';
import "./style/style.css";
import { btw_01, quadraticBezierCurve, drawLine } from './lerp';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
function main() {
    const canvas = document.querySelector("#c") as HTMLCanvasElement;
    function makeCamera() {
        const left = window.innerWidth / -100;
        const right = window.innerWidth / 100;
        const top = window.innerHeight / 100;
        const bottom = window.innerHeight / -100;
        const camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 1000);
        return camera;
    };

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGL1Renderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const camera = makeCamera();
    const boxGeo = new THREE.SphereGeometry(0.2);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
    const mesh = new THREE.Mesh(boxGeo, material);
    const controls = new TrackballControls(camera, canvas);


    // three length because it's quadratic.
    const lineVector: THREE.Vector3[] = [];
    {
        lineVector.push(new THREE.Vector3(window.innerWidth / -200, 0, 0))
        lineVector.push(new THREE.Vector3(0, window.innerHeight / 200, 0))
        lineVector.push(new THREE.Vector3(window.innerWidth / 200, 0, 0))
        const geometry = new THREE.BufferGeometry().setFromPoints(lineVector);
        const line = new THREE.Line(geometry)
        scene.add(line)
    }

    scene.add(mesh);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0)
    let t = 0;
    {
        const drawPoints = drawLine(lineVector);
        const geometry = new THREE.BufferGeometry().setFromPoints(drawPoints);
        const line = new THREE.Line(geometry);
        scene.add(line)
    }

    function render() {
        requestAnimationFrame(render);
        let inter = btw_01(t);
        t += 0.01;
        let vec3 = quadraticBezierCurve(lineVector, inter);
        const { x, y, z } = vec3;
        mesh.position.set(x, y, z)
        renderer.render(scene, camera)
        controls.update();
        camera.updateProjectionMatrix()


    }
    render();
}
main()