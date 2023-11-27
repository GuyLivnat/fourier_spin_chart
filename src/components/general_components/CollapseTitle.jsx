import { useState } from "react";
import CaretLeftIcon from "../../assets/icons/CaretLeftIcon";
import CaretDownIcon from "../../assets/icons/CaretDownIcon";

const CollapseTitle = ({ title, forBody }) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <div>
      <h2
        data-bs-toggle="collapse"
        data-bs-target={`#${forBody}`}
        aria-expanded="false"
        aria-controls={`$${forBody}`}
        onClick={() => setCollapse(!collapse)}
        style={{ cursor: "pointer" }}
      >
        {title}
        <button className="btn btn-sm" style={{ color: "grey" }} type="button">
          {collapse ? <CaretLeftIcon /> : <CaretDownIcon />}
        </button>
      </h2>
    </div>
  );
};

export default CollapseTitle;
