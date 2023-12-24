const gradientSampler = (start, end, place) => {
  const r = start.r * place + (1 - place) * end.r;
  const g = start.g * place + (1 - place) * end.g;
  const b = start.b * place + (1 - place) * end.b;
  return { r, g, b };
};
export default gradientSampler;
