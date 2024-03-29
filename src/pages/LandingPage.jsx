import { TooltipContext } from "../contexts/TooltipContext";
import { useContext } from "react";
import LogoIcon from "../assets/icons/LogoIcon";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);

  return (
    <section className="container-fluid text-center col-md-8 px-auto py-5">
      <div>
        <div className="text-primary">
          <LogoIcon size={60} />
        </div>
        <h1
          className="mb-3"
          onMouseEnter={tooltipIn}
          onMouseLeave={tooltipOut}
          data-tooltip="tooltips included!"
        >
          The Fourier Spin Chart
        </h1>
        <p className="lead">
          Use a chain of circles to draw complex single line images...
          <br /> or just watch the pretty circles spin.
        </p>
      </div>
      <div className="mt-5 gap-3">
        <NavLink className="btn btn-outline-primary" to="/sandbox">
          Let's go!
        </NavLink>
        <p className="d-inline-block mx-3">or</p>
        <NavLink className="btn btn-outline-primary" to="/tutorial?page=1">
          How does this work?
        </NavLink>
      </div>
      <div className="mt-3" style={{ fontSize: 13 }}>
        Discalmer: this app has only been tested on firefox and chrome
      </div>
    </section>
  );
};

export default LandingPage;
