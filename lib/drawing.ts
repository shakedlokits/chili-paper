import type { P5 } from './p5';

/**
 * Drawing is a class interface that represents a processing(p5.js)
 * drawing that can be rendered to the printer feed.
 * It is used to create a list of drawings that can be printed in a single print job.
 * The drawings are rendered to a canvas and then printed.
 *
 * @example
 * class Title implements Drawing {
 *     get offset() { return {x: 0, y: 0}; }
 *     get height() { return 200;}
 *     get margin() { return 0; }
 *
 *     async load() {}
 *
 *     render(p5: P5) {
 *          p5.text('Hello World!', 0, 0, 400, 200);
 *     }
 * }
 */
export interface Drawing {
  /** The offset of the drawing from the top left corner of the canvas context.
   * Note that each canvas context begins after the last drawing */
  get offset(): { x: number, y: number };

  /** The height of the drawing */
  get height(): number;

  /** The top margin between the drawing and the previous drawing */
  get margin(): number;

  /** A function that is called before the drawing is rendered.
   * This function is called once for each drawing and is used to
   * load any resources that are required for the drawing.
   */
  load(): Promise<void> | void;

  /** A function that is called to render the drawing using the p5.js library.
   * @param p5 - The p5.js library client
   */
  render(p5: P5): void;
}