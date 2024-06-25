const SearchIcon = ({
  stroke,
  className,
  strokeWidth,
}: {
  stroke?: string;
  className?: string;
  strokeWidth?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      stroke={stroke || "white"}
      strokeWidth={strokeWidth || 5.333333333333}
      aria-hidden="true"
      className={`${className} block w-3 h-3`}
      role="presentation"
      focusable="false"
    >
      <path
        fill="none"
        d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
      ></path>
    </svg>
  );
};

export default SearchIcon;
