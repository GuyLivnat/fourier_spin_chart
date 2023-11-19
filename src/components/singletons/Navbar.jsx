import { NavLink } from "react-router-dom";
import "./Navbar.css";
import LogoIcon from "../../assets/icons/LogoIcon";

const Navbar = () => {
  return (
    <nav className=" p-2 d-flex justify-content-center text-center">
      <div className="px-3 float-start">
        <NavLink className="" to="/">
          <LogoIcon />
        </NavLink>
      </div>
      <div className="px-3">
        <NavLink className="nav-link" to="/chart">
          Chart
        </NavLink>
      </div>
      <div className="px-3">
        <NavLink className="nav-link" to="/docs">
          Docs
        </NavLink>
      </div>
      <div className="px-3">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
