import TutorialChart from "../chart/TutorialChart";

const TutorialPage_3 = () => {
  return (
    <div>
      <p> Next we draw a fading line at the end of the last radius.</p>
      <TutorialChart
        coeff={{
          current: [
            { r: 17386.84, angle: -0.01, frequency: 1 },
            { r: 10286.09, angle: 3.13, frequency: 2 },
          ],
        }}
        hideOutline={false}
        chartId="tutorial-chart-3"
      />
    </div>
  );
};

export default TutorialPage_3;
