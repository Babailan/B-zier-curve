type Vector3 = [number, number, number] | [number, number] | [number];

// Example: lerp(0.5, 0.0, 1.0) == 0.5
function lerp(t: number, p1: number, p2: number) {
    return ((1 - t) * p1) + (t * p2);
};
// Example: reduce(0.5, ...[0.0, 1.0, 2.0, 3.0]) == [0.5, 1.5, 2.5] -> [1,2]
function reduce(t: number, ps: number[][]): number[][] {
    let l = ps.length - 1;
    const arr = [];
    if (ps.length > 0) {
        for (let i = 0; i < l; i++) {
            const x = lerp(t, ps[i][0], ps[i + 1][0]);
            const y = lerp(t, ps[i][1], ps[i + 1][1]);
            const z = lerp(t, ps[i][2], ps[i + 1][2]);
            arr.push([x, y, z])
        }
    }
    return arr;
};

function de_casteljau(t: number, ps: number[][]): Vector3 {
    if (ps.length > 1) {
        return de_casteljau(t, reduce(t, ps));
    } else {
        return [ps[0][0], ps[0][1], ps[0][2]];
    }
}

export { de_casteljau }