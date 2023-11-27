import { TooltipContext } from "../utilities/TooltipContext";
import { useContext } from "react";
import LogoIcon from "../assets/icons/LogoIcon";
import Button from "../components/general_components/Button";
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
          data-tooltip="woo! long words!"
        >
          Progressivly rotating wave functions using fourier transforms on
          geometric space
        </h1>
        <p className="lead">
          Let math calculate which chain of circles recreates a given path...
          <br /> or just watch the pretty circles spin.
        </p>
      </div>
      <div className="mt-5 gap-3">
        <NavLink className="btn btn-outline-primary" to="/chart">
          Let's go!
        </NavLink>
        <p className="d-inline-block mx-3">or</p>
        <NavLink className="btn btn-outline-primary" to="/docs">
          How does this work?
        </NavLink>
      </div>
    </section>
  );
};

export default LandingPage;
