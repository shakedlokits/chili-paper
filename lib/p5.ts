import type * as P5 from 'p5';
const nodeP5 = require('node-p5');

/** The node-p5 library client.
 * Used to generate processing sketches in Node. */
const p5: P5 & typeof nodeP5 = nodeP5;

export {p5, P5};