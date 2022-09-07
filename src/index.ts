import * as THREE from 'three';
import "./style/style.css";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { line, drawBezierCurve, drawPairs } from './drawLine';
import { de_casteljau } from './lerp';
import t from "./t"

function main() {
    let MAX_X = window.innerWidth / -100;
    let MAX_Y = window.innerHeight / -100;
    const canvas = document.querySelector("#c") as HTMLCanvasElement;
    function makeCamera() {
        const left = window.innerWidth / -100;
        const right = window.innerWidth / 100;
        const top = window.innerHeight / 100;
        const far = window.innerHeight / -100;
        const camera = new THREE.OrthographicCamera(left, right, top, far, 0.01, 1000);
        return camera;
    };

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGL1Renderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const camera = makeCamera();
    const boxGeo = new THREE.SphereGeometry(0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
    const mesh = new THREE.Mesh(boxGeo, material);
    const controls = new OrbitControls(camera, canvas);
    renderer.setPixelRatio(window.devicePixelRatio);

    const startingPointsToEnd = [];
    function getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    while (startingPointsToEnd.length < 5) {
        const x = getRandomArbitrary(-1, 1)
        const y = getRandomArbitrary(-1, 1)
        const z = getRandomArbitrary(-1, 1)
        startingPointsToEnd.push([MAX_X * x, MAX_Y * y, z * 5])
    }
    // let yawa = [[0, -4, 0], [-5, -1, 0], [0, 0, 0], [0, -2, 0], [4, 0, 0]]
    {
        const Line = line(startingPointsToEnd);
        // x = Line[1];
        const mesh = new THREE.Line(Line, new THREE.MeshBasicMaterial({ color: 0xffffff }));
        drawBezierCurve(startingPointsToEnd)
        scene.add(mesh);
    }

    scene.add(mesh);
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);
    let initialLerpValue = 0;
    {
        const [x, y, z] = de_casteljau(initialLerpValue, startingPointsToEnd);
        mesh.position.set(x, y, z)
    }
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera)
        controls.update();
        initialLerpValue += 0.004;
        const [x, y, z] = de_casteljau(t(initialLerpValue), startingPointsToEnd);
        mesh.position.set(x, y, z)
    }
    {
        // axes helper 
        const axesHelper = new THREE.AxesHelper(window.innerWidth / window.innerHeight * 1)
        scene.add(axesHelper)
    }
    {
        // draw bezier curve
        const points = drawBezierCurve(startingPointsToEnd);
        const draw = line(points);
        const Line = new THREE.Line(draw, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
        scene.add(Line)
    }
    {
        // draw points
        const points = drawPairs(startingPointsToEnd, scene)
    }
    render();
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
    })

}
main()