import infinityCoeff from "../assets/tutorial/infinityCoeff";
import MushuSVG from "../assets/tutorial/mushuSVG";
import TutorialChart from "../components/chart/TutorialChart";
import mushu from "../assets/defaults/mushu";

const TutorialPage = () => {
  return (
    <section className="row justify-content-center gx-0">
      <div className="col-lg-8 col-10 ">
        <h1> Tutorial</h1>
        <h3> The Visual </h3>
        <p>
          {" "}
          To begin, let's take one circle, draw its radius, and have it spin at
          a constant speed.
        </p>
        <TutorialChart
          coeff={{ current: [{ r: 17386.84, angle: -0.01, frequency: 1 }] }}
          hideOutline={true}
          chartId="tutorial-chart-1"
        />
        <p>
          {" "}
          Now let’s add another circle, have its center follow the point where
          the previous circle's radius ends, and have it spin at a slightly
          faster constant speed.
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
        <p>
          {" "}
          By adding another four circles, we will can draw an infinity symbol
        </p>
        <TutorialChart
          coeff={{
            current: infinityCoeff,
          }}
          hideOutline={false}
          chartId="tutorial-chart-4"
        />
        <h3> The Fourier part</h3>
        <p>
          {" "}
          As you saw in the visual section, by adding different circles you can
          draw different shapes. Though getting a specific image by guessing
          which chain of circles would draw it is incredibly difficult, which is
          where Fourier transforms come in. <br />
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
          Now we can take an image with a single line such as this one of Mushu
          from the film Mulan...
        </p>
        <MushuSVG size={150} />
        <br />
        apply that same Fourier Transform on it, and voilà! We have a series of
        circles that, when chained together, recreate the image over time.
        <TutorialChart
          coeff={{
            current: mushu.coeff,
          }}
          hideOutline={false}
          chartId="tutorial-chart-5"
        />
        In Sandbox mode, you can use the upload button in the Saved Paths and
        give it any SVG image with a single {"<path>"} for it to generate the
        appropriate chain of circles that expresses it.
      </div>
    </section>
  );
};

export default TutorialPage;
