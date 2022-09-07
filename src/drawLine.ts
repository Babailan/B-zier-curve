import { Vector3, BufferGeometry, Scene, Sphere, Mesh, SphereGeometry, MeshBasicMaterial } from "three";
type s = [number, number, number]

function line(s: Array<s>, derivitive?: boolean, scene?: Scene): [BufferGeometry, Vector3[]] {
    let vector = [];
    for (let i = 0; i < s.length; i++) {
        vector.push(new Vector3(s[i][0], s[i][1], s[i][2]));
    }
    const geometry = new BufferGeometry().setFromPoints(vector);

    if (!!scene) {
        for (let i = 0; i < vector.length; i++) {
            const m = new SphereGeometry(0.05, 1, 1);
            const mesh = new Mesh(m, new MeshBasicMaterial({ color: 0xff0000 }));
            mesh.position.set(s[i][0], s[i][1], s[i][2])
            scene.add(mesh);
        }
    }
    if (derivitive) {
        let t = 0;
        while (t < 1) {
            t += 0.01;
            console.log(t)
        }
    }
    return [geometry, vector];
}

export { s, line }