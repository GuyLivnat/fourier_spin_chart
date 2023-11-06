const ChartOverlay = ({ playable }) => {
  return (
    <div
      className={
        "position-absolute justify-content-center align-items-center" +
        (!playable ? " d-flex" : " d-none")
      }
      id="chart-overlay"
      style={{ bottom: 0, right: 0, left: 0, top: 0, background: "blue" }}
    >
      (placeholder!) load a path or make your own using the editor
    </div>
  );
};

export default ChartOverlay;
