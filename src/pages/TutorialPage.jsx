import TutorialChart from "../components/chart/TutorialChart";

const TutorialPage = () => {
  return (
    <section className="row justify-content-center gx-0">
      <div className="col-lg-8 col-10 ">
        <h1> Tutorial</h1>
        <h2> The Basics </h2>
        <h3> The Visual </h3>
        <p>
          {" "}
          To begin, let's take one circle, and mark one dot at a point along its
          edge, then let's make that circle spin.
        </p>
        <TutorialChart
          coeff={{ current: [{ r: 20000, angle: 1, frequency: 1 }] }}
          hideOutline={true}
          chartId="tutorial-chart-1"
        />
        <p>
          {" "}
          Now let’s take another circle and have its center follow the dot of
          the previous circle.
        </p>
        <TutorialChart
          coeff={{
            current: [
              { r: 20000, angle: 1, frequency: 1 },
              { r: 15000, angle: 1, frequency: 2 },
            ],
          }}
          hideOutline={true}
          chartId="tutorial-chart-2"
        />
        <p>
          {" "}
          Then we place another rotating dot on that circle, and have it “draw”
          a fading line behind it as it moves.
        </p>
        <TutorialChart
          coeff={{
            current: [
              { r: 20000, angle: 1, frequency: 1 },
              { r: 15000, angle: 1, frequency: 2 },
              { r: 10000, angle: 1, frequency: 3 },
            ],
          }}
          hideOutline={false}
          chartId="tutorial-chart-3"
        />
        <p>
          {" "}
          Let’s add a few more circles to the ‘chain’ and draw the radii that
          connect the dots in purple. Try using the Editor to add your own
          circle. Give it a radius size and a starting angle for the drawn
          radius (in radians)
        </p>
        {/* <chart with 5 circles and all things shown with the editor open> */}
        <h3> The Fourier part</h3>
        <p>
          {" "}
          As you saw in the visual section, by adding different circles you can
          draw different shapes. Though getting a specific image by guessing
          which chain of circles, which is where Fourier transforms come in.{" "}
          <br />
          The short version of what a Fouirer transform does is take a complex
          wave function and separates it into a series of sine waves.
          <br />
          For the longer version, I suggest watching the{" "}
          <a href="https://www.youtube.com/watch?v=r6sGWTCMz2k">
            youtube clip
          </a>{" "}
          done by 3Blue1Brown where he explains a short history and a lot of
          math on how Fourier transforms work. The clip also explains how you
          can take a series of points on an euclidean plane as a complex wave
          function, then express the series of sine waves as a chain of rotating
          circles.
          <br />
          Can you see where this is going? <br />
          Now we can take an image with a single line.
        </p>
        {/* <svg image> */}
        Then we apply that same Fourier Transform on it, and voilà! We have a
        series of circles that, when chained together, recreate the image over
        time. Simply select the image from the Saved Paths menu and press play.
        {/* <show chart with saved paths and only one path used in the image beforehand> */}
        In Sandbox mode, you can use the upload button in the Saved Paths and
        give it any SVG image with a single {"<path>"} for it to generate the
        appropriate chain of circles that express it.
      </div>
    </section>
  );
};

export default TutorialPage;
