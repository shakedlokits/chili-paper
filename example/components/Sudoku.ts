import {Drawing} from "../../lib/drawing";
import {makepuzzle} from "sudoku";
import {P5, p5} from "../../lib/p5";

const youngSerifFont = p5.loadFont('YoungSerif-Regular.otf');

export class Sudoku implements Drawing {
    private numbers!: number[];
    private readonly _width: number;
    private readonly _height: number;

    constructor({width, height}: { width: number, height: number }) {
        this._width = width;
        this._height = height;
    }

    get offset() {
        return {x: 60, y: 0};
    }

    get height() {
        return this._height;
    }

    get margin() {
        return 20;
    }

    async load() {
        this.numbers = await makepuzzle();
    }

    render(p5: P5) {
        const cellWidth = this._width / 9;
        const cellHeight = this._height / 9;
        const fontSize = 20;

        p5.stroke(0);
        p5.strokeWeight(6);
        p5.noFill();
        p5.rect(0, 0, 280, 280);

        p5.strokeWeight(1);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const x = i * cellWidth;
                const y = j * cellHeight;
                p5.rect(x, y, cellWidth, cellHeight);
            }
        }

        p5.strokeWeight(3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const x = i * cellWidth * 3;
                const y = j * cellHeight * 3;
                p5.rect(x, y, cellWidth * 3, cellHeight * 3);
            }
        }

        p5.textFont(youngSerifFont);
        p5.textSize(fontSize);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.fill(0);
        p5.noStroke();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const x = i * cellWidth + cellWidth / 2;
                const y = j * cellHeight + cellHeight / 2;
                const number = this.numbers[i + j * 9 + 1];
                if (Boolean(number)) {
                    p5.text(number, x, y);
                }
            }
        }
    }
}