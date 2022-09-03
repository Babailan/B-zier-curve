import * as THREE from 'three';
import "./style/style.css";
import { btw_01, lerp2points } from './lerp'
function main() {
    const canvas = document.querySelector("#c");
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
    const boxGeo = new THREE.SphereGeometry(0.4, 4, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
    const mesh = new THREE.Mesh(boxGeo, material);


    const lineVector: THREE.Vector3[] = [];
    {
        lineVector.push(new THREE.Vector3(-2, -2, 0))
        lineVector.push(new THREE.Vector3(2, 2, 0))
        const geometry = new THREE.BufferGeometry().setFromPoints(lineVector);
        const line = new THREE.Line(geometry)
        scene.add(line)
    }
    let t = btw_01(0.1);
    let vec3 = lerp2points(lineVector[0], lineVector[1], t)
    // const { x, y, z } = lineVector[0];
    mesh.position.set(vec3.x, vec3.y, vec3.z);
    scene.add(mesh);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0)
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera)
        // console.log(btw_01(t));
        // t += 0.1;
        // const [p1,p2] =
    }
    render();
}
main()