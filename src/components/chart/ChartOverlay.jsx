import rgbObjToString from "../../utilities/RGBObjToString";

const ChartOverlay = ({ playable, chartColors }) => {
  return (
    <h4
      className={
        "position-absolute justify-content-center align-items-center text-center m-0 p-5" +
        (!playable ? " d-flex" : " d-none")
      }
      id="chart-overlay"
      style={{
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        background: rgbObjToString(chartColors.backgroundColor),
        color: rgbObjToString(chartColors.circlesColor),
      }}
    >
      Load a saved chain or make your own path by using the editor to get
      started.
    </h4>
  );
};

export default ChartOverlay;
