import { useEffect, useState } from "react";
import CaretLeftIcon from "../../assets/icons/CaretLeftIcon";
import CaretDownIcon from "../../assets/icons/CaretDownIcon";

const CollapseTitle = ({
  title,
  forBody,
  titleType = "h2",
  className,
  collapseFunc,
}) => {
  const [collapsed, setCollapse] = useState(true);
  const collapse = () => {
    setCollapse(!collapsed);
    if (collapseFunc && collapsed === true) collapseFunc();
  };
  if (collapseFunc) {
    useEffect(() => {
      collapseFunc();
    }, [collapsed]);
  }
  const CustomTag = titleType;

  return (
    <div>
      <CustomTag
        data-bs-toggle="collapse"
        data-bs-target={`#${forBody}`}
        aria-expanded="false"
        aria-controls={`$${forBody}`}
        onClick={collapse}
        style={{ cursor: "pointer" }}
        className={className}
      >
        {title}
        <button className="btn btn-sm" style={{ color: "grey" }} type="button">
          {collapsed ? <CaretLeftIcon /> : <CaretDownIcon />}
        </button>
      </CustomTag>
    </div>
  );
};

export default CollapseTitle;
