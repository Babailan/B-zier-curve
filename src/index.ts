import { Scene, PerspectiveCamera, WebGLRenderer, PointLight, AxesHelper, Mesh, SphereGeometry, MeshPhongMaterial, MeshBasicMaterial, BufferGeometryLoader } from "three";
import "./style/style.css";
import WebGL from './test';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
if (window.innerWidth < window.innerHeight) {
    document.body.innerHTML += ("<h1>landscape bruh</h1>")
} else {
    if (WebGL.isWebGLAvailable()) {
        let fov = 70;
        let near = 0.1;
        let far = 1000;
        const camera = new PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
        {
            camera.position.y = 40;
        }
        const scene = new Scene();

        const renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight)

        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (window.innerWidth < window.innerHeight) {
                document.body.innerHTML += ("<h1>landscape bruh</h1>");
            };
        })

        const canvas = renderer.domElement;


        document.body.appendChild(canvas)
        // an array of objects whose rotation to update
        const objects: Mesh[] = [];


        {    // sun
            const radius = 5;
            const widthSegments = 15;
            const heightSegments = 15;
            const sphereGeometry = new SphereGeometry(
                radius, widthSegments, heightSegments);
            const sunMaterial = new MeshPhongMaterial({ "color": 0xffff00, shininess: 100, emissive: 0xffff00, wireframe: false });
            const sunMesh = new Mesh(sphereGeometry, sunMaterial);
            scene.add(sunMesh);
            // earth
            {
                const earthMaterial = new MeshPhongMaterial({ specular: 0x000000, color: 0x0000ff, shininess: 0, emissive: 152238, emissiveIntensity: 0.4, wireframe: false });
                const earthMesh = new Mesh(sphereGeometry, earthMaterial);
                earthMesh.position.x = sunMesh.position.x + 15;
                earthMesh.scale.set(0.2, 0.2, 0.2);
                // add child
                sunMesh.add(earthMesh);
                camera.lookAt(earthMesh.position.x, earthMesh.position.y, earthMesh.position.z);
                earthMesh.name = "earth";

                {
                    const moonMaterial = new MeshPhongMaterial({ color: 0xffffff })
                    const moonMesh = new Mesh(sphereGeometry, moonMaterial);
                    moonMesh.scale.set(0.2, 0.2, 0.2);
                    moonMesh.position.x = 10
                    earthMesh.add(moonMesh);
                }
                objects.push(earthMesh);
            };
            objects.push(sunMesh);
        }

        const control = new OrbitControls(camera, canvas);
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);


        {
            // light
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new PointLight(color, intensity);
            scene.add(light);
            // const axesHelper = new AxesHelper(1);
            // axesHelper.scale.set(3, 3, 3);
            // axesHelper.position.y = 20
            // scene.add(axesHelper);
        }
        const times = 0.006;
        function animate() {
            requestAnimationFrame(animate)
            control.update();

            objects.map((v) => {

                if (v.name !== "earth") {
                    v.rotation.y += times;
                    if (v.rotation.y > Math.PI * 2) {
                        v.rotation.y %= (Math.PI * 2);
                    };
                } else {
                    if (v.rotation.z > Math.PI * 2) {
                        v.rotation.z = v.rotation.z % (Math.PI * 2);
                    }
                    v.rotation.z += (times * 5);
                }

            })
            renderer.render(scene, camera);
        };
        animate()
    } else {
        document.body.innerHTML += ("<h1>WebGL is not avaiable in this Browser</h1>")
    }
}