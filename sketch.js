let rez = 20;
let cols, rows;
let field = [];

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    //draw();
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");

    cols = 1 + width / rez;
    rows = 1 + height / rez;

    for (let i = 0; i < cols; i++) {
        field[i] = []; // create nested array
        for (let j = 0; j < rows; j++) {
            field[i][j] = floor(random(2));
        }
    }
}

function drawLine(v1, v2) {
    line(v1.x, v1.y, v2.x, v2.y);
}

function draw() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            stroke(field[i][j] * 255);
            strokeWeight(rez * 0.4);
            point(i * rez, j * rez);
        }
    }

    for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
            let x = i * rez;
            let y = j * rez;

            let a = new p5.Vector(x + rez * 0.5, y);
            let b = new p5.Vector(x + rez, y + rez * 0.5);
            let c = new p5.Vector(x + rez * 0.5, y + rez);
            let d = new p5.Vector(x, y + rez * 0.5);

            let state = getState(
                field[i][j],
                field[i + 1][j],
                field[i + 1][j + 1],
                field[i][j + 1]
            );
            stroke(255);
            strokeWeight(1);
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
                    drawLine(a, b)
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

    function getState(a, b, c, d) {
        return a * 8 + b * 4 + c * 2 + d * 1;
    }
}
