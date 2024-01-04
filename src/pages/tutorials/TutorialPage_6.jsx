import mushu from "../../assets/defaults/mushu";
import TutorialChart from "../../components/chart/TutorialChart";

const TutorialPage_6 = () => {
  return (
    <div>
      <p>
        Apply that same Fourier Transform on it, and voilà!
        <br /> We have a chain of circles that recreate the image of Mushu over
        time.
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
