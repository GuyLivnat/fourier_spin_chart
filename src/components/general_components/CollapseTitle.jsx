import { useState } from "react";
import CaretLeftIcon from "../../assets/icons/CaretLeftIcon";
import CaretDownIcon from "../../assets/icons/CaretDownIcon";

const CollapseTitle = ({ title, forBody, titleType = "h2", className }) => {
  const [collapse, setCollapse] = useState(true);
  const CustomTag = titleType;

  return (
    <div>
      <CustomTag
        data-bs-toggle="collapse"
        data-bs-target={`#${forBody}`}
        aria-expanded="false"
        aria-controls={`$${forBody}`}
        onClick={() => setCollapse(!collapse)}
        style={{ cursor: "pointer" }}
        className={className}
      >
        {title}
        <button className="btn btn-sm" style={{ color: "grey" }} type="button">
          {collapse ? <CaretLeftIcon /> : <CaretDownIcon />}
        </button>
      </CustomTag>
    </div>
  );
};

export default CollapseTitle;
