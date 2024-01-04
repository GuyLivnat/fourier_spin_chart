import MushuSVG from "../../assets/tutorial/mushuSVG";

const TutorialPage_5 = () => {
  return (
    <div>
      <p>
        As you saw in the visual section, by adding different circles you can
        draw different shapes. Though getting a specific image by guessing which
        chain of circles would draw it is incredibly difficult, which is where
        Fourier transforms come in. <br />
        The short version of what a Fouirer transform does is take a complex
        wave function and separates it into a series of sine waves.
        <br />
        For the longer version, I suggest watching the{" "}
        <a href="https://www.youtube.com/watch?v=r6sGWTCMz2k">
          youtube clip
        </a>{" "}
        done by 3Blue1Brown where he explains a short history and a lot of math
        on how Fourier transforms work. The clip also explains how you can take
        a series of points on an euclidean plane as a complex wave function,
        then express the series of sine waves as a chain of rotating circles.
        <br />
        Can you see where this is going? <br />
        Good, so now we can take any image with a single line, such as this one
        of Mushu from the film Mulan:
      </p>
      <div className="d-flex justify-content-center">
        <MushuSVG size={150} />
      </div>
    </div>
  );
};

export default TutorialPage_5;
