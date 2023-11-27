import { TooltipContext } from "../utilities/TooltipContext";
import { useContext } from "react";
import LogoIcon from "../assets/icons/LogoIcon";

const LandingPage = () => {
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);

  return (
    <section className="container-fluid text-center col-md-8 px-auto py-5">
      <LogoIcon size={60} />
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
        Let math calculate which chain of circles recreates a given path...{" "}
        <br /> or just watch the pretty circles spin.
      </p>
    </section>
  );
};

export default LandingPage;
