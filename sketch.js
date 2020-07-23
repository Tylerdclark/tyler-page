let rez = 10;
let cols, rows;
let field = [];
let increment = 0.15;
const seed = Date.now();
let zoff = 0;
const openSimplex = openSimplexNoise(seed);
let started;

p5.disableFriendlyErrors = true; // delete this line of code when using min

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setup();
    //draw();
}

function setup() {
    started = true;
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");

    cols = 1 + width / rez;
    rows = 1 + height / rez;

    // let xoff = 0;
    // for (let i = 0; i < cols; i++) {
    //     field[i] = []; // create nested array
    //     xoff += increment;
    //     let yoff = 0;
    //     for (let j = 0; j < rows; j++) {
    //         let n = openSimplex.noise3D(xoff, yoff, zoff);
    //         field[i][j] = n;
    //         yoff += increment;
    //     }
    // }
}

function drawLine(v1, v2) {
    line(v1.x, v1.y, v2.x, v2.y);
}

function draw() {
    if (started) {
        clear(); //otherwise will draw on top of previous

        let fps = frameRate();
        fill(255);
        stroke(0);
        text("FPS: " + fps.toFixed(2), 10, height - 10);

        let xoff = 0;
        for (let i = 0; i < cols; i++) {
            field[i] = []; // create nested array
            xoff += increment;
            let yoff = 0;
            for (let j = 0; j < rows; j++) {
                let n = openSimplex.noise3D(xoff, yoff, zoff);
                field[i][j] = n;
                yoff += increment;
            }
        }
        zoff += 0.005; //map(fps, 5, 60, 0.005, 0.009);

        for (let i = 0; i < cols - 1; i++) {
            for (let j = 0; j < rows - 1; j++) {
                let x = i * rez;
                let y = j * rez;

                let a = new p5.Vector(x + rez * 0.5, y);
                let b = new p5.Vector(x + rez, y + rez * 0.5);
                let c = new p5.Vector(x + rez * 0.5, y + rez);
                let d = new p5.Vector(x, y + rez * 0.5);

                let state = getState(
                    ceil(field[i][j]),
                    ceil(field[i + 1][j]),
                    ceil(field[i + 1][j + 1]),
                    ceil(field[i][j + 1])
                );
                colorMode(HSB, 255, 255, 255);
                strokeWeight(4);
                stroke(map(state, 0, 15, 0, 360), 200, 255, 255);
                switch (state) {
                    case 1:
                        drawLine(c, d);
                        break;
                    case 2:
                        drawLine(b, c);
                        break;
                    case 3:
                        drawLine(b, d);
                        break;
                    case 4:
                        drawLine(a, b);
                        break;
                    case 5:
                        drawLine(a, d);
                        drawLine(b, c);
                        break;
                    case 6:
                        drawLine(a, c);
                        break;
                    case 7:
                        drawLine(a, d);
                        break;
                    case 8:
                        drawLine(a, d);
                        break;
                    case 9:
                        drawLine(a, c);
                        break;
                    case 10:
                        drawLine(a, b);
                        drawLine(c, d);
                        break;
                    case 11:
                        drawLine(a, b);
                        break;
                    case 12:
                        drawLine(b, d);
                        break;
                    case 13:
                        drawLine(b, c);
                        break;
                    case 14:
                        drawLine(c, d);
                        break;
                }
            }
        }
    }
    function getState(a, b, c, d) {
        return a * 8 + b * 4 + c * 2 + d * 1;
    }
}
