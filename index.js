const escpos = require('escpos');
escpos.USB = require("escpos-usb");
const path = require("path");
const p5 = require('node-p5');
const {get} = require('axios');
const sudoku = require("sudoku");
const {HDate} = require("@hebcal/core");

const {USB, Printer, Image} = escpos;
const youngSerifFont = p5.loadFont('YoungSerif-Regular.otf');

const printImage = (fileName) => {
    const device = new USB();
    const printer = new Printer(device);

    const imagePath = path.join(__dirname, fileName);

    Image.load(imagePath, (image) => {
        device.open(function (error) {
            if (!(image instanceof Image)) return device.close();

            printer.feed(2);
            printer.image(image, 'D8');
            printer.feed(8);
            printer.close();
        });
    });
};

const getWeather = async () => {
    const response = await get('https://wttr.in/TLV?format=%C,%f,%s');
    const [condition, temperature, sunset] = response.data.split(',');

    return {
        condition: condition.toLowerCase(),
        temperature: temperature.replace('+', ''),
        sunset: sunset.split(':').splice(0, 2).join(':')
    };
}

const timeOfDay = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours < 12) {
        return 'morning';
    } else if (hours < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
};

function drawTitle({condition, temperature, sunset, timeOfDay}) {
    const [width, height] = [400, 200];
    this.textFont(youngSerifFont, 32);
    this.text(`Good ${timeOfDay}!\nToday’s weather will be ${condition} with ${temperature} degrees `
        + `and the sun is expected to set at ${sunset}.`, 0, 0, width, height);

    return height;
}

function drawSudoku(numbers, {width, height}) {
    const cellWidth = width / 9;
    const cellHeight = height / 9;
    const fontSize = 20;

    this.stroke(0);
    this.strokeWeight(6);
    this.noFill();
    this.rect(0, 0, width, height);

    this.strokeWeight(1);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const x = i * cellWidth;
            const y = j * cellHeight;
            this.rect(x, y, cellWidth, cellHeight);
        }
    }

    this.strokeWeight(3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const x = i * cellWidth * 3;
            const y = j * cellHeight * 3;
            this.rect(x, y, cellWidth * 3, cellHeight * 3);
        }
    }

    this.textFont(youngSerifFont);
    this.textSize(fontSize);
    this.textAlign(this.CENTER, this.CENTER);
    this.fill(0);
    this.noStroke();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const x = i * cellWidth + cellWidth / 2;
            const y = j * cellHeight + cellHeight / 2;
            const number = numbers[i + j * 9 + 1];
            if (Boolean(number)) {
                this.text(number, x, y);
            }
        }
    }

    return height;
}

(async () => {
    const {condition, temperature, sunset} = await getWeather();
    const time = timeOfDay();
    const sudokuBoardNumbers = await sudoku.makepuzzle();
    const hebrewDate = (new HDate()).toString();

    p5.createSketch((p) => {
        p.setup = () => {
            const canvas = p.createCanvas(400, 610);
            p.background(255);

            const titleHeight = drawTitle.call(p, {condition, temperature, sunset, timeOfDay: time});

            // We can add custom offsets
            const sudokuOffset = {x: 60, y: 0};
            p.translate(sudokuOffset.x, titleHeight + 20 + sudokuOffset.y);
            const sudokuHeight = drawSudoku.call(p, sudokuBoardNumbers, {width: 280, height: 280});
            p.translate(-sudokuOffset.x, -sudokuOffset.y);

            p.translate(sudokuOffset.x, sudokuHeight + 20 + sudokuOffset.y);
            const sudokuHeight2 = drawSudoku.call(p, sudokuBoardNumbers, {width: 280, height: 280});
            p.translate(-sudokuOffset.x, -sudokuOffset.y);

            p.resizeCanvas(400, titleHeight + sudokuHeight + sudokuHeight2 + 40);

            p.saveCanvas(canvas, 'input', 'png');
            p.noLoop();
        };
    });

    // printImage('input.png');
})()