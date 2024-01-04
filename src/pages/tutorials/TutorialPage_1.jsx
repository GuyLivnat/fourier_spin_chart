import TutorialChart from "../../components/chart/TutorialChart";

const TutorialPage_1 = () => {
  return (
    <div>
      <p>
        To begin, let's take one circle, draw its radius, and have it spin at a
        constant speed.
      </p>
      <TutorialChart
        coeff={{ current: [{ r: 17386.84, angle: -0.01, frequency: 1 }] }}
        hideOutline={true}
        chartId="tutorial-chart-1"
      />
    </div>
  );
};

export default TutorialPage_1;
