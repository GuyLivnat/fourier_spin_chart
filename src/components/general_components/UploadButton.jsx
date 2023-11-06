import { createRef } from "react";
import Button from "./Button";

const UploadButton = ({
  handleFile,
  text,
  className,
  img,
  imgAlt,
  dataTooltip,
  onMouseEnter,
  onMouseLeave,
}) => {
  const inputRef = createRef();
  const uploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Button
        handleClick={uploadClick}
        text={text}
        className={className}
        img={img}
        imgAlt={imgAlt}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        dataTooltip={dataTooltip}
      />
      <input
        type="file"
        onChange={handleFile}
        style={{ display: "none" }}
        ref={inputRef}
      />
    </>
  );
};

export default UploadButton;
