import * as React from "react";
const PlayButton = (props) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <path fill="#ffff" d="M2 1v14l12-7z" />
  </svg>
);
export default PlayButton;