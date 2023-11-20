const LogoIcon = ({ size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-100 200 400 400"
    >
      <circle
        stroke="currentColor"
        fill="none"
        strokeWidth="12"
        cx="97.4"
        cy="427.6"
        r="156.4"
      />
      <circle
        stroke="currentColor"
        fill="none"
        strokeWidth="12"
        cx="168"
        cy="286"
        r="50.7"
      />
      <polyline
        stroke="currentColor"
        fill="none"
        strokeWidth="12"
        points="97.4,427.6 164.5,287.5 209.3,256.7 "
      />
      <path
        stroke="currentColor"
        fill="none"
        strokeWidth="18"
        d="M209.3,256.7c-86.7-104.6-310.5-39.9-261.9,215.7"
      />
      <circle fill="currentColor" cx="97.4" cy="427.6" r="10.1" />
      <circle fill="currentColor" cx="209.3" cy="256.7" r="10.1" />
    </svg>
  );
};

export default LogoIcon;
