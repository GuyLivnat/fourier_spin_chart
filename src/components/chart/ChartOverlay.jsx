const ChartOverlay = ({ playable }) => {
  return (
    <h4
      className={
        "position-absolute justify-content-center align-items-center text-center m-0" +
        (!playable ? " d-flex" : " d-none")
      }
      id="chart-overlay"
      style={{ bottom: 0, right: 0, left: 0, top: 0, background: "black" }}
    >
      Load a saved path or make your own path by using the editor to get
      started.
    </h4>
  );
};

export default ChartOverlay;
