import { NavLink } from "react-router-dom";
import "./Navbar.css";
import LogoIcon from "../../assets/icons/LogoIcon";

const Navbar = () => {
  return (
    <nav className="p-2 d-flex justify-content-center text-center bg-secondary">
      <div className="px-3">
        <NavLink className="navbar-brand" to="/starchart_fourier_react_d3/">
          <LogoIcon size={25} />
        </NavLink>
      </div>
      <div className="px-3">
        <NavLink className="nav-link" to="/starchart_fourier_react_d3/chart">
          Chart
        </NavLink>
      </div>
      <div className="px-3">
        <NavLink className="nav-link" to="/starchart_fourier_react_d3/docs">
          Docs
        </NavLink>
      </div>
      <div className="px-3">
        <NavLink className="nav-link" to="/starchart_fourier_react_d3/about">
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
