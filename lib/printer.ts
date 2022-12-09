const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const { USB, Printer, Image: PrinterImage } = escpos;

export const printImage = ({ filePath, feed }: { filePath: string; feed: number }) => {
  const device = new USB();
  const printer = new Printer(device);

  PrinterImage.load(filePath, (image: typeof PrinterImage | Error) => {
    device.open(function(error: Error) {
      if (!(image instanceof PrinterImage)) return device.close();

      printer.image(image, 'D24');
      printer.cut(false, feed);
      printer.close();
    });
  });
};