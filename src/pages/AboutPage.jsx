const AboutPage = () => {
  return (
    <section className="row justify-content-center gx-0">
      <div className="col-lg-8 col-10">
        <h1 className="mb-5 mt-3">Why, What, How and Who</h1>
        <div>
          <h2>Why</h2>
          <p>
            This app was made both as a final project in my personal quest to
            learn how to code, and as a tribute to 3Blue1Brown (a YouTube
            channel). While studying different mathematical models as part of my
            coding studies, I was shown their{" "}
            <a href="https://www.youtube.com/watch?v=r6sGWTCMz2k">
              clip on the Fourier series
            </a>
            . I not only found the math fascinating, but the idea that a given
            set of circles playing at a constant speed could recreate an image
            was both inspiring and mesmerizing.
          </p>
        </div>
        <div>
          <h2>What</h2>
          <p>
            The app was originally only intended to recreate the use of Fourier
            transforms I witnessed in the clip, but after getting the math to
            work, I found that there were so many different functions that could
            be added around it to make the playback a fun and interactive
            experience. This was done to fulfill the original intent of allowing
            even those who do not find the concept inspiring to share in the
            mesmerizing part.
          </p>
        </div>
        <div>
          <h2>How</h2>
          <p>How the upload works:</p>
          <ol>
            <li>
              The user uploads an SVG (Scalable Vector Graphic) with a single{" "}
              {"<path>"}. This means there is a single curved line that is
              described as a series of points and curvatures. More info on paths
              can be found{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths">
                at MDN's website.
              </a>
            </li>
            <li>
              The app then samples the x and y coordinates (on a Euclidean
              plane) of a series of 256 points along the length of the path. The
              result looks something like this{" "}
              {"[{x:10, y:3}, {x:12, y:13}, …]"}.
            </li>
            <li>
              he list of x,y coordinates is then passed through a discrete FFT
              (Fast Fourier Transform).
            </li>
            <li>
              The FFT treats the coordinates as a single wavelength that it then
              breaks apart into a discrete (non-infinite) number of sine waves
              (for more info on how the FFT does that, I highly recommend the
              3Blue1Brown clip in the Why section). These sine waves are
              described by two coefficients: a real number and an imagined one.
              The result looks something like this
              {" [{real:20, imagined: 1}, {real:4, imagined: -1}, …]"}
            </li>
            <li>
              The coefficients are then saved to the user’s local storage.
            </li>
          </ol>
          <p>How the chart uses the coefficients:</p>
          <ol>
            <li>
              Each coefficient is expressed as a circle with a single drawn
              radius. The real number is expressed as the size of the circle,
              and the imagined one as the angle (in radians) in which a single
              radius is drawn.
            </li>
            <li>
              Each consecutive circle rotates around the end of the previous
              circle’s drawn radius. The result is a ‘chain’ of circles.
            </li>
            <li>
              When drawn together the last drawn radius is a single point along
              the original {"<path>"}.
            </li>
            <li>
              Each imagined number (the angle) is multiplied in a progressive
              manner (the distance from the start of the chain) by a given time
              (a number between 0 and 1). The coefficients recreate another
              point along the original {"<path>"}.
            </li>
            <li>
              The playback of the chart slowly loops from 0 to 1 (resetting to 0
              when it reaches 1), each time recalculating the angles.
            </li>
            <li>
              The end point of each calculation is then used to redraw the image
              from the original {"<path>"}.
            </li>
          </ol>
        </div>
        <div>
          <h2>Who</h2>
          <p>
            Hi there! If you’ve gotten this far, you probably enjoyed the pretty
            math and lights and are wondering who made this app. My name is Guy,
            and I’m a new programmer that, as of writing this, can code in
            Python, JavaScript, and C++. I’ve been studying with a private
            tutor, who is a retired professor for computer science, for the past
            half year. I previously studied animation in Sapir College and
            industrial design in Bezalel Academy before deciding that coding is
            the next part along my journey in the understanding of what makes
            things tick.
          </p>
        </div>
        <h1 className="mt-5">Technical and legal info</h1>
        <div>
          The app is written in JavaScript. <br /> The libraries used (and their
          licenses) are:
          <ul>
            <li>
              React (MIT License, Copyright (c) Meta Platforms, Inc. and
              affiliates).
            </li>
            <li>
              React-Router (MIT License, Copyright (c) React Training LLC
              2015-2019 Copyright (c) Remix Software Inc. 2020-2021 Copyright
              (c) Shopify Inc. 2022-2023).
            </li>
            <li>
              Vite (MI License, Copyright (c) 2019-present, Yuxi (Evan) You and
              Vite contributors).
            </li>
            <li>
              Popper (MIT license, Copyright © 2016 Federico Zivolo and
              contributors).
            </li>
            <li>
              BootStrap (MIT license, Copyright (c) 2011-2023 The Bootstrap
              Authors).
            </li>
            <li>D3 (ISC license, Copyright 2010-2023 Mike Bostock).</li>
            <li>
              The Fast Fourier Transform's code is from{" "}
              <a href="https://www.nayuki.io/page/free-small-fft-in-multiple-languages">
                this website
              </a>{" "}
              (MIT license, Copyright (c) 2022 Project Nayuki).
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
