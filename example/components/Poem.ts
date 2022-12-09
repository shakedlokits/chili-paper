import axios from 'axios';
import { Drawing, P5, p5 } from 'chili-paper';

const youngSerifFont = p5.loadFont('YoungSerif-Regular.otf');

export class Poem implements Drawing {
  private poem!: { title: string, author: string, content: string };

  get offset() {
    return { x: 20, y: 20 };
  }

  get height() {
    return 200;
  }

  get margin() {
    return 20;
  }

  private static async getPoetry() {
    try {
      const response = await axios.get('https://poetrydb.org/random,linecount/1;2');
      const { title, author, lines } = response.data?.[0];

      return { title, author, content: lines.join('\n') };
    } catch (e) {
      console.error('Failed to fetch poem data', e);
      process.exit(1);
    }
  }

  async load() {
    this.poem = await Poem.getPoetry();
  }

  render(p5: P5) {
    p5.strokeWeight(6);
    p5.rect(0, 0, 360, 170);

    p5.textFont(youngSerifFont, 18);
    p5.text(`“${this.poem.content}”`, 20, 20, 320, 170);

    p5.textFont(youngSerifFont, 10);
    p5.text(`${this.poem.title}, ${this.poem.author}`, 20, 140, 320, 20);
  }
}