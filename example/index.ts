import {Title, Sudoku} from "./components";
import {print} from "../lib";

print([
    new Title(),
    // new Sudoku({width: 280, height: 280}),
]).then(() => console.log('done'));