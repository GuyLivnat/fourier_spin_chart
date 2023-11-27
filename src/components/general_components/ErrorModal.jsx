import "./ErrorModal.css";
import Button from "./Button";

const ErrorModal = ({ text, closeFunc }) => {
  return (
    <div
      id="error-background"
      className="d-flex justify-content-center align-items-center"
      onClick={closeFunc}
    >
      <div
        className="rounded text-bg-secondary px-3 py-2 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p> {text}</p>
        <Button
          text="close"
          className="btn btn-outline-primary"
          handleClick={closeFunc}
        />
      </div>
    </div>
  );
};
export default ErrorModal;
