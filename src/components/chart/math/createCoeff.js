import transformRadix2 from "./fft";

const createCoeff = (path, units) => {
  const points = generatePoints(path, units);
  const coeff = calculateCoeff(points, units);
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

const calculateCoeff = (points, units) => {
  const real = [];
  const img = [];
  for (let i = 0; i < points.length; ) {
    real.push(points[i++]);
    img.push(points[i++]);
  }

  transformRadix2(real, img);

  const coeff = [];
  for (let i = 0; i < units; i++) {
    coeff.push(Math.sqrt(real[i] * real[i] + img[i] * img[i]));
    coeff.push(Math.atan2(img[i], real[i]));
  }
  return coeff;
};

export default createCoeff;
