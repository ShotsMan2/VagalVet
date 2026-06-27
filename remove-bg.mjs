import { Jimp } from 'jimp';

async function removeBackground() {
  const image = await Jimp.read('public/logo.png');
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = image.getPixelColor(x, y);
      const r = (color >> 24) & 255;
      const g = (color >> 16) & 255;
      const b = (color >> 8) & 255;
      
      if (r > 230 && g > 230 && b > 230) {
        image.setPixelColor(0x00000000, x, y);
      }
    }
  }

  await image.write('public/logo_transparent.png');
  console.log('Background removed successfully.');
}

removeBackground().catch(console.error);
