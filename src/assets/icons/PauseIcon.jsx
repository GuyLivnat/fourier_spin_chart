const PauseIcon = ({ size = 25 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 16 16"
      strokeWidth="2"
    >
      <line x1="5" y1="5" x2="5" y2="12" />
      <line x1="10" y1="5" x2="10" y2="12" />
    </svg>
  );
};

export default PauseIcon;
