import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className=" me-auto mb-2 mb-lg-0 row justify-content-center text-center m-0 p-2">
      <div className="col">
        <NavLink className="nav-link hover-underline-animation" to="/">
          Home
        </NavLink>
      </div>
      <div className="col">
        <NavLink className="nav-link" to="/chart">
          Chart
        </NavLink>
      </div>
      <div className="col">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
