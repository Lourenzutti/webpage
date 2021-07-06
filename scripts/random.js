runif = (a, b) => {
    return Math.random() * b + a;
};

rnorm = (n, mean, sd) => {
    values = new Array(n);
    for (let i = 0; i < n; i += 2) {
        u = Math.random();
        v = Math.random();
        values[i] = sd * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) + mean;
        values[i + 1] = sd * Math.sqrt(-2.0 * Math.log(u)) * Math.sin(2.0 * Math.PI * v) + mean;
    }

    if (n % 2 == 1) {
        u = Math.random();
        v = Math.random();
        values[n - 1] = sd * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) + mean;
    }

    if (n == 1) {
        return values[0];
    }

    return values;

};

sample = (elements) => {
    return elements[Math.floor(Math.random() * elements.length)];
}