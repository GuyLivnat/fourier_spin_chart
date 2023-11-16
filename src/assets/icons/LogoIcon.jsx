const LogoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="-100 200 400 400"
    >
      {/* .st2{fill:none;stroke:#000000;stroke-width:18;stroke-miterlimit:10;} */}

      <text
        transform="matrix(1 0 0 1 -66.5 485.5)"
        fontFamily="MyriadPro-Regular"
        fontSize="300px"
      >
        FC
      </text>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={18}
        d="M262,568H-65.5c-6.6,0-12-5.4-12-12V228.5c0-6.6,5.4-12,12-12H262c6.6,0,12,5.4,12,12V556
                C274,562.6,268.6,568,262,568z"
      />
    </svg>
  );
};

export default LogoIcon;
