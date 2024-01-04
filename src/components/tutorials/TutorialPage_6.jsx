import mushu from "../../assets/defaults/mushu";
import TutorialChart from "../chart/TutorialChart";

const TutorialPage_6 = () => {
  return (
    <div>
      <p>
        Apply that same Fourier Transform on it, and voilà! We have a series of
        circles that, when chained together, recreate the image over time.
        <TutorialChart
          coeff={{
            current: mushu.coeff,
          }}
          hideOutline={false}
          chartId="tutorial-chart-5"
        />
      </p>
    </div>
  );
};

export default TutorialPage_6;
