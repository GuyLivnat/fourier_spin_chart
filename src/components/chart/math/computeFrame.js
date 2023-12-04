const computeFrame = (coeff, time) => {
  const circles = [];
  const omega = Math.PI * 2 * time;
  let x = 0;
  let y = 0;

  for (let i = 1; i < coeff.length; i++) {
    let r = coeff[i].r;
    let theta = coeff[i].angle + omega * coeff[i].frequency;
    circles.push({
      x: x,
      y: y,
      // angle: theta,
      r: r,
    });
    x += r * Math.cos(theta);
    y += r * Math.sin(theta);
  }
  circles.push({
    x: x,
    y: y,
    // angle: 0,
    r: 0,
  });
  const outline = {
    x: x,
    y: y,
  };

  return { circles, outline };
};

export default computeFrame;
