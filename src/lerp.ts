import { Vector3 } from "three";

function quadraticBezierCurve(p: Vector3[], t?: number) {
    if (typeof t === "undefined") {
        t = 0.5;
    }
    const x = ((1 - t) * (((1 - t) * p[0].x) + (t * p[1].x))) + (t * (((1 - t) * p[1].x) + (t * p[2].x)));
    const y = ((1 - t) * (((1 - t) * p[0].y) + (t * p[1].y))) + (t * (((1 - t) * p[1].y) + (t * p[2].y)));
    return new Vector3(x, y, 0);
}
function btw_01(n = 0) {
    if (Math.floor(n) % 2 === 0) {
        return n % 1;
    } else {
        return 1 - (n % 1)
    };
};
function drawLine(p: Vector3[]): Vector3[] {
    let t = 0;
    let arr: Vector3[] = [];

    while (t < 1) {
        const Draw = quadraticBezierCurve(p, t);
        t += 0.01;
        arr.push(Draw)
    }
    arr.push(quadraticBezierCurve(p, t));
    return arr;
}

function lerp(p0: number, p1: number, t: number) {
    return ((1 - t) * p0) + (t * p1);
};

lerp(200, 100, 0.5)

export { btw_01, quadraticBezierCurve, drawLine }
