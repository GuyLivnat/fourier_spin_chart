import HomeChart from "../components/chart/HomeChart";
import welcome from "../assets/defaults/welcome";
import { TooltipContext } from "../utilities/TooltipContext";
import { useContext } from "react";
import LogoIcon from "../assets/icons/LogoIcon";

const HomePage = () => {
  const units = 512; // must be a power of 2! 256 suggested, 512 smoothes the edges
  const coeff = welcome;
  const { tooltipIn, tooltipOut } = useContext(TooltipContext);

  return (
    <section className="container-fluid text-center col-md-8 mx-auto my-5">
      <LogoIcon />
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

export default HomePage;
