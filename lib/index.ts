import {Drawing} from "./drawing";
import {printImage} from "./printer";
import {p5, P5} from "./p5";
import {tmpdir} from "os";
import {join} from "path";

const BOTTOM_MARGIN = 20;

/**
 * Prints a list of drawings to the printer feed.
 * @param drawings - The list of drawings to print
 *
 * @example
 * import {Title, Sudoku} from "./components";
 * import {print} from "../lib";
 *
 *  print([
 *    new Title(),
 *    new Sudoku({width: 280, height: 280}),
 *  ]).then(() => console.log('done'));
 */
export const print = async (drawings: Drawing[]) => {
    const filePath = join(tmpdir(), 'input');
    const fileExtension = 'png';

    await Promise.all(drawings.map(drawing => drawing.load()));
    const height = drawings.reduce((acc, drawing) => acc + drawing.height + drawing.margin, 0);

    p5.createSketch((p: P5) => {
        p.setup = () => {
            const canvas = p.createCanvas(400, height + BOTTOM_MARGIN);
            p.background(255);

            drawings.reduce((currentHeight, drawing) => {
                p.translate(drawing.offset.x, currentHeight + drawing.margin + drawing.offset.y);
                drawing.render(p);
                p.translate(-drawing.offset.x, -drawing.offset.y);

                return currentHeight + drawing.height + drawing.margin;
            }, 0);

            p.saveCanvas(canvas, filePath, fileExtension);
            p.noLoop();
        };
    });

    printImage({filePath: `${filePath}.${fileExtension}`, feed: 2});
};

export {P5, p5, Drawing};