const RecenterIcon = ({ size = 22 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="-2 -2 16 16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8.83" y1="3.3" x2="8.83" y2="1.22" />
      <line x1="8.83" y1="3.3" x2="10.91" y2="3.3" />
      <line x1="8.83" y1="3.3" x2="11.76" y2="0.38" />
      <line x1="3.3" y1="8.98" x2="1.22" y2="8.98" />
      <line x1="3.3" y1="8.98" x2="3.3" y2="11.06" />
      <line x1="3.3" y1="8.98" x2="0.38" y2="11.91" />
      <line x1="8.83" y1="8.98" x2="8.83" y2="11.06" />
      <line x1="8.83" y1="8.98" x2="10.91" y2="8.98" />
      <line x1="8.83" y1="8.98" x2="11.76" y2="11.91" />
      <line x1="3.3" y1="3.3" x2="3.3" y2="1.22" />
      <line x1="3.3" y1="3.3" x2="1.22" y2="3.3" />
      <line x1="3.3" y1="3.3" x2="0.38" y2="0.38" />
      <circle cx="6.14" cy="6.14" r="1.45" />
    </svg>
  );
};

export default RecenterIcon;
