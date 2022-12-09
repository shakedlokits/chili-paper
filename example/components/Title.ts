import axios from 'axios';
import { Drawing, P5, p5 } from 'chili-paper';

const youngSerifFont = p5.loadFont('YoungSerif-Regular.otf');

export class Title implements Drawing {
  private weather!: { condition: string, temperature: string, sunset: string };
  private timeOfDay!: string;

  get offset() {
    return { x: 0, y: 0 };
  }

  get height() {
    return 200;
  }

  get margin() {
    return 0;
  }

  private static async getWeather() {
    try {
      const response = await axios.get('https://wttr.in/TLV?format=%C,%f,%s');
      const [condition, temperature, sunset] = response.data.split(',');

      return {
        condition: condition.toLowerCase(),
        temperature: temperature.replace('+', ''),
        sunset: sunset.split(':').splice(0, 2).join(':'),
      };
    } catch (e) {
      console.error('Failed to fetch weather data', e);
      process.exit(1);
    }
  }

  private static getTimeOfDay() {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      return 'morning';
    } else if (hours < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  }

  async load() {
    this.weather = await Title.getWeather();
    this.timeOfDay = Title.getTimeOfDay();
  }

  render(p5: P5) {
    p5.textFont(youngSerifFont, 32);
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.text(`Good ${this.timeOfDay}!\nToday’s weather will be ${this.weather.condition} with ${this.weather.temperature} degrees `
      + `and the sun is expected to set at ${this.weather.sunset}.`, 0, 0, 400, 200);
  }
}