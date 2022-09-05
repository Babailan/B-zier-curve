// Example: lerp(0.5, 0.0, 1.0) == 0.5
function lerp(t: number, p1: number, p2: number) {
    return ((1 - t) * p1) + (t * p2);
};
// Example: reduce(0.5, ...[0.0, 1.0, 2.0, 3.0]) == [0.5, 1.5, 2.5] -> [1,2]
function reduce(t: number, ps: number[]): number[] {
    let l = ps.length - 1;
    const arr = [];
    if (ps.length > 0) {
        for (let i = 0; i < l; i++) {
            arr.push(lerp(t, ps[i], ps[i + 1]));
        }
    } else {
        return [lerp(t, ps[0], ps[1])];
    };
    return arr;
};

function de_casteljau(t: number, ps: number[]): number {
    if (ps.length > 1) {
        return de_casteljau(t, reduce(t, ps));
    } else {
        return ps[0];
    }
}

export { de_casteljau, reduce }