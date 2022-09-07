import { Vector3, BufferGeometry, Scene, SphereGeometry, MeshBasicMaterial, Mesh } from "three";
import { de_casteljau } from "./lerp";
type s = number[][];

function line(s: s): BufferGeometry {
    let vector = [];
    for (let i = 0; i < s.length; i++) {
        vector.push(new Vector3(s[i][0], s[i][1], s[i][2]));
    }
    const geometry = new BufferGeometry().setFromPoints(vector);
    return geometry;
}
function drawBezierCurve(s: s): number[][] {
    let t = 0;
    const setFromPoints = [];
    setFromPoints.push(de_casteljau(t, s));
    while (t < 1) {
        t += 0.01;
        setFromPoints.push(de_casteljau(t, s))
    }
    return setFromPoints;
}
function drawPairs(s: s, scene: Scene) {
    for (let i = 0; i < s.length; i++) {
        const geometry = new SphereGeometry(0.1);
        const material = new MeshBasicMaterial({ color: 0xff0000 })
        const mesh = new Mesh(geometry, material)
        mesh.position.set(s[i][0], s[i][1], s[i][2])
        scene.add(mesh)
    }
}


export { drawBezierCurve, line, drawPairs }