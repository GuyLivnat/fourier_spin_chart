import infinityCoeff from "../../assets/tutorial/infinityCoeff";
import TutorialChart from "../chart/TutorialChart";

const TutorialPage_4 = () => {
  return (
    <div>
      <p>By adding another four circles, we will can draw an infinity symbol</p>
      <TutorialChart
        coeff={{
          current: infinityCoeff,
        }}
        hideOutline={false}
        chartId="tutorial-chart-4"
      />
    </div>
  );
};

export default TutorialPage_4;
