const ColorInput = ({ color, setColor }) => {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  );
};
export default ColorInput;
