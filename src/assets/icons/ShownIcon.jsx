const ShownIcon = ({ size = 25 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="-297 389 16 16"
    >
      <path
        d="M-289,392.9c-5.1,0-7.8,4-7.8,4s2.7,4.2,7.8,4.2s7.8-4.2,7.8-4.2S-283.9,392.9-289,392.9z M-289,400.3
	c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3s3.3,1.5,3.3,3.3S-287.2,400.3-289,400.3z"
      />
      <circle cx="-289" cy="397" r="2.5" />
    </svg>
  );
};

export default ShownIcon;
