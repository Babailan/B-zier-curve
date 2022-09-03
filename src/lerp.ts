import { Vector3 } from "three";

function lerp2points(p1: Vector3, p2: Vector3, alpha: number): Vector3 {
    let newPointX = lerp(p1.x, p2.x, alpha)
    let newPointY = lerp(p1.y, p2.y, alpha)
    return new Vector3(newPointX, newPointY, 0);
}
function btw_01(n = 0) {
    if (Math.floor(n) % 2 === 0) {
        return n % 1;
    } else {
        return 1 - (n % 1)
    };
};

function lerp(min: number, max: number, alpha: number) {
    return ((max - min) * alpha) + min;
};

lerp(200, 100, 0.5)

export { btw_01, lerp2points }
