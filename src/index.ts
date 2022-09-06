import * as THREE from 'three';
import "./style/style.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { line, s } from './drawLine';
import { de_casteljau } from './lerp';
import t from "./t"

function main() {
    const canvas = document.querySelector("#c") as HTMLCanvasElement;
    function makeCamera() {
        const fov = 70
        const aspectRatio = window.innerWidth / window.innerHeight
        const near = 0.1;
        const far = 1000
        const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
        return camera;
    };

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGL1Renderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const camera = makeCamera();
    const boxGeo = new THREE.SphereGeometry(0.2);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
    const mesh = new THREE.Mesh(boxGeo, material);
    const controls = new OrbitControls(camera, canvas);

    let yawa: s[] = [[-4, 0, 0], [4, 4, 0], [4, 0, 0], [2, 1, 0], [1, 4, 0]]
    {
        const Line = line(yawa, scene);
        // x = Line[1];
        const mesh = new THREE.Line(Line[0], new THREE.MeshBasicMaterial({ color: 0xffffff }));
        scene.add(mesh);
    }

    scene.add(mesh);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
    let initialLerpValue = 0;
    {
        const [x, y, z] = de_casteljau(initialLerpValue, yawa);
        mesh.position.set(x, y, z)
    }
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera)
        controls.update();
        initialLerpValue += 0.006;


        const [x, y, z] = de_casteljau(t(initialLerpValue), yawa);
        mesh.position.set(x, y, z)

        camera.updateProjectionMatrix()
    }
    render();
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
    })
}
main()