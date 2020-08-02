/*jshint esversion: 6 */
//Idea from the Coding Train! -> https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw
const rez = 10;
const seed = Date.now();
const openSimplex = openSimplexNoise(seed);
let cols, rows;
let field = [];
let increment = 0.15;
let zoff = 0;
let started;


//p5.disableFriendlyErrors = true; // delete this line of code when using min

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setup();
}

function setup() {
    started = true;
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");

    cols = 1 + width / rez;
    rows = 1 + height / rez;
}



function draw() {
    if (started) {
        clear(); //otherwise will draw on top of previous

        //let arcTan = abs(atan2(mouseY - height / 2, mouseX - width / 2));
        //console.log(arcTan);

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


                // console.log(ceil(field[i][j]))
                let state = getState(
                    abs(ceil(field[i][j])),
                    abs(ceil(field[i + 1][j])),
                    abs(ceil(field[i + 1][j + 1])),
                    abs(ceil(field[i][j + 1]))
                );
                //console.log(state);
                colorMode(HSB, 255, 255, 255);
                strokeWeight(4);
                stroke(map(state, 0, 15, 0, 360), 200, 255, 255);

                //The below implementation is NOT as effecient as switch
                // ... but looks better

                //console.log(state);
                // const states = {
                //     1 : () => drawLine(c, d),
                //     2 : () => drawLine(b, c),
                //     3 : () => drawLine(b, d),
                //     4 : () => drawLine(a, b),
                //     5 : () => drawLines(a, d, b, c),
                //     6 : () => drawLine(a, c),
                //     7 : () => drawLine(a, d),
                //     8 : () => drawLine(a, d),
                //     9 : () => drawLine(a, c),
                //     10 : () => drawLines(a, b, c, d),
                //     11 : () => drawLine(a, b),
                //     12 : () => drawLine(b, d),
                //     13 : () => drawLine(b, c),
                //     14 : () => drawLine(c, d)
                //     }

                // if (states[state]) {states[state]();}
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
                        drawLines(a, d, b, c);
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
                        drawLines(a, b, c, d);
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

}
const getState = (a, b, c, d) => {
    //let v = ""+a+b+c+d;
     //return((parseInt( v.split('').join(''), 2 )))

    // ^--- Less efficient --^

    return a * 8 + b * 4  + c * 2 + d * 1;


};
const drawLine = (v1, v2) => {
    line(v1.x, v1.y, v2.x, v2.y);
};
const drawLines = (v1, v2, v3, v4) => {
    line(v1.x, v1.y, v2.x, v2.y);
    line(v3.x, v3.y, v4.x, v4.y);
};
