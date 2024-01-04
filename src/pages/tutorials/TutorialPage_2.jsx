import TutorialChart from "../../components/chart/TutorialChart";

const TutorialPage_2 = () => {
  return (
    <div>
      <p>
        Now let’s add another circle, have its center follow the point where the
        previous circle's radius ends, and have it spin at a slightly faster
        constant speed.
      </p>
      <TutorialChart
        coeff={{
          current: [
            { r: 17386.84, angle: -0.01, frequency: 1 },
            { r: 10286.09, angle: 3.13, frequency: 2 },
          ],
        }}
        hideOutline={true}
        chartId="tutorial-chart-2"
      />
    </div>
  );
};

export default TutorialPage_2;
