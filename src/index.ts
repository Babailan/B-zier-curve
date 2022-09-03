import * as THREE from 'three';
import "./style/style.css";
function main() {
    const canvas = document.querySelector("#c");
    function makeCamera() {
        const left = window.innerWidth / -50;
        const right = window.innerWidth / 50;
        const top = window.innerHeight / 50;
        const bottom = window.innerHeight / -50;
        const camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 1000)
        return camera;
    }
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGL1Renderer({ canvas: canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);


    const camera = makeCamera();
    const boxGeo = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
    const mesh = new THREE.Mesh(boxGeo, material);
    scene.add(mesh);
    camera.position.set(0, 0, 10)
    camera.lookAt(mesh.position)


    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera)
        camera.updateProjectionMatrix()
    }
    render();
}
main()