const valueToHex = (value) => {
  const int = Math.floor(value);
  const hex = int.toString(16);
  const paddedHex = hex.length === 1 ? "0" + hex : hex;
  return paddedHex;
};

const rgbToHex = ({ r, g, b }) => {
  const hex = "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
  return hex;
};
export default rgbToHex;
