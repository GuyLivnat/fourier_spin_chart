import transformRadix2 from './fft';


const createCoeff = async (image, units) => {
    const points = await generatePoints(image, units);
    const coeff = await calculateCoeff(points, units);
    return coeff
}

const generatePoints = (image, units) => {
    const segment = image.getTotalLength()/units;
    const points = [];
    for (let i = 0; i < units; i++) {
      let point = image.getPointAtLength(i*segment);
      points.push(point.x);
      points.push(point.y);
    }
    console.log("points generated")
    return points
  }

const calculateCoeff = (points, units) => {
    let real = [];
    let img = [];
    for (let i = 0; i < points.length;) {
      real.push(points[i++]);
      img.push(points[i++]);
    }

    transformRadix2(real, img);

    let coef = [];
    let n = 200;
    for (let i=0, j=0; i<units; i++)  {
      coef[j++] = Math.sqrt(real[i]* real[i] + img[i]*img[i])/n;
      coef[j++] = Math.atan2(img[i], real[i]);
    }

    console.log("points transformed via fft");
    return coef;
  }

export default createCoeff;