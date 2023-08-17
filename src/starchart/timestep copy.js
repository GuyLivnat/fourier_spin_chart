

export default function timestep(coeff, time) {
    const frame = {orbits : []}
    let step = 2 * Math.PI * time;
    
    let c = coeff[0];
    let theta = c.im;
    let x = 0;
    let y = 0;
  
    for (let i=0; i<coeff.length; i++) {
      c = coeff[i];
      theta = c.im + (step * i);
      frame.orbits.push ({
        x: x,
        y: y,
        angle: theta,
        r: c.re,
      })
      x += c.re * Math.cos(theta);
      y += c.re * Math.sin(theta);
    }
    // orbits.push ({
    //     x: x,
    //     y: y,
    //     angle: 0,
    //     r: 0,
    // })
    frame.edge = {
      x: x,
      y: y,
    }
    return frame

  }