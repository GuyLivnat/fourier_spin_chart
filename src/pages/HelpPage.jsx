import HideIcon from "../assets/icons/HideIcon";
import RecenterIcon from "../assets/icons/RecenterIcon";
import ShownIcon from "../assets/icons/ShownIcon";
import UndoIcon from "../assets/icons/UndoIcon";
import ZoomInIcon from "../assets/icons/ZoomInIcon";
import ZoomOutIcon from "../assets/icons/ZoomOutIcon";

const HelpPage = () => {
  return (
    <section className="row justify-content-center gx-0">
      <div className="col-lg-8 col-10">
        <div>
          <h1 className="mb-5 mt-3">The tools and their options</h1>
          <div>
            <h2>The Chart</h2>
            <p>The chart takes a series of circles and chains them together.</p>
            <ul>
              <li>
                Each circle's center revolves around the previous circle's
                center.
              </li>
              <li>
                The speed at which each circle revolves is constant, and
                determined by its place in the chain, so that each circle is
                slightly faster than the previous one.
              </li>
              <li>
                Each circle has an angle which refers to where along its edge
                the next circle's center is.
              </li>
              <li> The last circle in the chain draws a fading path.</li>
              <li>
                The chart can be zoomed in or out via the zoom <ZoomInIcon />{" "}
                <ZoomOutIcon /> buttons or with the mouse wheel.
              </li>
              <li>The chart can be panned by clicking and dragging.</li>
              <li>
                The recenter <RecenterIcon /> button will reset the zoom and
                pan.
              </li>
            </ul>
          </div>
          <div>
            <h2>The Editor</h2>
            <p>
              The Editor lets you remove any circle or add one to the end of the
              chain.
            </p>
            <ul>
              <li>
                Remove a circle by clicking the 'x' button to the right of the
                listed circle.
              </li>
              <li>
                Add a circle by inputting a radius and a starting angle (in
                radians) at the bottom of the list of circles and pressing the
                '+' button on the right of the inputs.
              </li>
              <li>
                The save button will save your current chain in the Saved Paths.
                The new save's name will be the current time.
              </li>
              <li>
                The reset button will remove all the circles, resulting in an
                empty chain.
              </li>
              <li>
                Double click a radius or angle from the list to directly edit
                it.
              </li>
            </ul>
          </div>
          <div>
            <h2>The Saved Chains</h2>
            <p>
              You can load any of your saved chains made in the Editor, one of
              the default paths, or upload an SVG image.
            </p>
            <ul>
              <li>To load a path, click it.</li>
              <li>To rename a path, double click the name.</li>
              <li>
                To remove a path, click the 'x' button to the right of the name.
              </li>
              <li>
                The 'del all' button removes all the currently saved paths.
              </li>
              <li>The 'defaults' button will restore any deleted defaults.</li>
              <li>
                To upload an SVG press the upload button and select an SVG with
                a single {"<path>"}.
              </li>
            </ul>
          </div>
          <div>
            <h2>The Colorizer</h2>
            <p>You can change the colors of the Chart</p>
            <ul>
              <li>
                The color picker tool is browser spesific. Try it out on a
                different one for a new experience!
              </li>
              <li>
                The reset <UndoIcon size={16} /> button resets the color to its
                original setting.
              </li>
              <li>
                The <ShownIcon size={16} />/<HideIcon size={16} /> button
                toggles visibility.
              </li>
              <li>
                The Fade slider alters how much the of the outline fades out.
              </li>
            </ul>
          </div>
          <div>
            <h2>The Graphs & Filters</h2>
            <h3>The Frequency Graph</h3>
            <ul>
              <li>
                The graph shows the circle chain in acending order of frequency
                from left to right
              </li>
              <li>Each circle's bar's height is dictated by its radius</li>
              <li>
                The filter can be dragged from right to left to remove the
                circles from the end of the chain inwards
              </li>
            </ul>
            <h3>The Histogram Graph</h3>
            <ul>
              <li>The graph shows the quantity of each radius in the chain </li>
              <li>
                The filter can be dragged from left to right to remove
                progressivly larger circles from the chain. This leads to a neat
                loss of detail effect.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpPage;
