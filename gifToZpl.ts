import omggif from "omggif";
const rgbaToZ64 = require('zpl-image').rgbaToZ64;

function(data: string):string {
  /* Create a Buffer starting from a base64 encoded GIF */
  let buf = Buffer.from(data, 'base64');
  /* Create a GifReader (with our GIF as input) to use the functions provided by omggif */
  let gif = new omggif.GifReader(buf);

  /* Creation of the RGBA frame of our GIF */
  let rgba = Buffer.alloc(gif.width * gif.height * 4);
  gif.decodeAndBlitFrameRGBA(0, rgba);

  /* Conversion to Z64*/
  let res = rgbaToZ64(rgba, gif.width, { black:47, rotate: 'R' });
  /* ZPL costruction */
  let zpl = `^XA^LH0,0^FO0,0^GFA,${res.length},${res.length},${res.rowlen},${res.z64}^FS^XZ`;
  return zpl;
}
