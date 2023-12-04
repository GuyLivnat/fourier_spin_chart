const computeFrame = (coeff, time) => {
  const frame = { circles: [] };
  const omega = Math.PI * time;
  let x = 0;
  let y = 0;

  for (let i = 2; i < coeff.length; i += 2) {
    let r = coeff[i];
    let theta = coeff[i + 1] + omega * i;
    frame.circles.push({
      x: x,
      y: y,
      // angle: theta,
      r: r,
    });
    x += r * Math.cos(theta);
    y += r * Math.sin(theta);
  }
  frame.circles.push({
    x: x,
    y: y,
    // angle: 0,
    r: 0,
  });
  frame.outline = {
    x: x,
    y: y,
  };

  return frame;
};

export default computeFrame;
