# Chili Paper 🌶️

Are you ready to add some **sizzle** to your thermal printer projects? Look no further than Chili Paper! This JavaScript
library makes it easy to create stunning graphics and print them on your thermal printer.

With Chili Paper, you can create a list of p5.js drawings and print them in a single job, or even save the generated
image to a local file for debugging. So spice up your projects and give Chili Paper a try! 🎉

## Getting Started

### Requirements

- Node.js
- A thermal printer that is supported by the [escpos](https://github.com/song940/node-escpos) library

### Installation

To install the library, run the following command in your terminal:

```bash
npm install chili-paper
```

### Usage

Here is a simple example that shows how to use the `Chili Paper` library to print a drawing:

```typescript
import { print, p5, Drawing } from 'chili-paper';

class Title implements Drawing {
  get offset() {
    return { x: 0, y: 0 };
  }

  get height() {
    return 200;
  }

  get margin() {
    return 0;
  }

  async load() {
  }

  render(p5: P5) {
    p5.text('Hello World!', 0, 0, 400, 200);
  }
}

print([new Title()]).then(() => console.log('done'));
```

This will print the text "Hello World!" on a thermal printer. You can find more detailed documentation for the library
in the Documentation section below.

## Documentation

### Drawing Interface

The `Drawing` interface is used to create custom drawings that can be printed using the `Chili Paper` library. It has
the following properties and methods:

#### Properties

##### offset

The `offset` property is a `{x: number, y: number}` object that represents the offset of the drawing from the top left
corner of the canvas context. Each canvas context begins after the last drawing.

##### height

The `height` property is a `number` that represents the height of the drawing.

##### margin

The `margin` property is a `number` that represents the top margin between the drawing and the previous drawing.

#### Methods

##### load

The `load` method is called before the drawing is rendered. This method is called once for each drawing and is used to
load any resources that are required for the drawing. It should return a promise that resolves when the resources are
loaded.

##### render

The `render` method is called to render the drawing using the p5.js library. It takes a `p5` object as a parameter,
which you can use to draw on the canvas.

### print Method

The `print` method is used to print a list of `Drawing` objects to the printer. It takes an object as a parameter with
the following properties:

#### drawings

The `drawings` property is an array of `Drawing` objects that represent the drawings that should be printed.

#### debug (optional)

The `debug` property is a `boolean` that indicates whether the drawings should be printed to the printer or saved to a
local file. This can be useful for testing the output of the drawings without using an actual printer.

### Example

Here is an example of using the `print` method to print two drawings:

```typescript
import { print, p5, Drawing } from 'chili-paper';

class Title implements Drawing {
  get offset() {
    return { x: 0, y: 0 };
  }

  get height() {
    return 200;
  }

  get margin() {
    return 0;
  }

  async load() {
    // load font
    this.font = await p5.loadFont('fonts/OpenSans-Regular.ttf');
  }

  render(p5: P5) {
    p5.textFont(this.font);
    p5.text('Hello World!', 0, 0, 400, 200);
  }
}

class Sudoku implements Drawing {
  get offset() {
    return { x: 0, y: 200 };
  }

  get height() {
    return 280;
  }

  get margin() {
    return 20;
  }

  async load() {
    // load sudoku data
    this.sudoku = await p5.loadJSON('sudoku.json');
  }

  render(p5: P5) {
    p5.textFont(this.font);
    p5.text('Hello World!', 0, 0, 400, 200);
  }
}

print([new Title(), new Sudoku()]).then(() => console.log('done'));
```

This will print the "Hello World!" text and a sudoku puzzle on the printer. The Title drawing is rendered first and has
a `margin` of 0, so it will be printed at the top of the page. The `Sudoku` drawing is rendered next and has a `margin`
of 20, so it will be printed below the Title drawing with a 20-pixel space between them. The total height of the printed
page will be 200 + 20 + 280 = 500 pixels.

You can customize the drawings and the printer settings to create more complex outputs.

## Project Structure

The project is structured as follows:

- `lib/`: Contains the source code for the `Chili Paper` library
    - `drawing.ts`: Defines the `Drawing` interface
    - `p5.ts`: Exports the `p5` and `P5` objects from the `node-p5` library
    - `printer.ts`: Contains the `printImage` function for printing images to the printer
    - `index.ts`: Exports the `Drawing` interface, the `print` function, and the `p5` and `P5` objects
- `example/`: Contains an example of using the `Chili Paper` library to print a simple drawing

## Contribution Model

We welcome contributions to the `Chili Paper` library! If you have a bug fix, improvement, or new feature that you would
like to contribute, please follow these steps:

1. Fork the repository on GitHub and create a new branch for your changes.
2. Make your changes and commit them to your branch.
3. Push your branch to your forked repository and submit a pull request.

Your changes will be reviewed and, if accepted, will be merged into the main branch of the repository. Thank you for
contributing to the `Chili Paper` library!
