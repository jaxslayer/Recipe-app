import React from "react";
import HeartIcon from "../assets/Hearticon";

const Heart = () => {
  const [click, setClick] = React.useState(false);
  return (
    <HeartIcon
      className={`${
        click ? `fill-[#EB00FF] stroke-none` : `fill-none stroke-black`
      } `}
      onClick={() => {
        setClick(!click);
      }}
    />
  );
};

export default Heart;
