import type * as P5 from 'p5';

/** The node-p5 library client.
 * Used to generate processing sketches in Node. */
const p5 = require('node-p5') as P5 & { createSketch: (sketch: (p: P5) => void) => void };

export {p5, P5};