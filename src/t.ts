function t(n: number) {
    if (Math.floor(n) % 2 === 0) {
        return n % 1;
    } else {
        return (1) - n % 1;
    }
}

export default t;