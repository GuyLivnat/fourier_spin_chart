import transformRadix2 from "./fft";

const createCoeff = (path, units) => {
  const points = generatePoints(path, units);
  const coeff = calculateCoeff(points);
  return coeff;
};

const generatePoints = (path, units) => {
  const segment = path.getTotalLength() / units;
  const points = [];
  for (let i = 0; i < units; i++) {
    let point = path.getPointAtLength(i * segment);
    points.push(point.x);
    points.push(point.y);
    setTimeout(() => {
      return;
    }, 0);
  }
  return points;
};

const calculateCoeff = (points) => {
  const real = [];
  const img = [];
  for (let i = 0; i < points.length; ) {
    real.push(points[i++]);
    img.push(points[i++]);
  }

  transformRadix2(real, img);

  const coeff = [];
  for (let i = 1; i < real.length; i++) {
    coeff.push({
      //toFixed for cleaner info, but it returns a string. thus parseFloat
      r: parseFloat(Math.sqrt(real[i] * real[i] + img[i] * img[i]).toFixed(2)),
      angle: parseFloat(Math.atan2(img[i], real[i]).toFixed(2)),
      frequency: i,
    });
  }
  return coeff;
};

export default createCoeff;
