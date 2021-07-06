const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = canvas.parentElement.clientHeight;

runif = (a, b) => {
    return Math.random() * (b - a) + a;
}

class Circle {
    constructor(x, y, velX, velY, size, color) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

totalConnectors = 50;
let connectors = [];
while (connectors.length < totalConnectors) {
    let size = runif(1, 2);
    let intensity = runif(220, 255);
    connectors.push(
        new Circle(
            runif(0 + size, width - size),
            runif(0 + size, height - size),
            runif(-1, 1),
            runif(-1, 1),
            size,
            'rgb(' + intensity + ',' + intensity + ',' + intensity + ')'
        )
    )
}

loop = () => {
    ctx.fillStyle = 'rgba(0, 0, 50, 0.25)';
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath()
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.font = "70px Arial";
    ctx.fillText("STAT 200", width / 2.5, height / 1.7);
    ctx.fill();
    for (connector of connectors) {
        connector.draw();
        connector.update();
    }
    requestAnimationFrame(loop);
}

loop();