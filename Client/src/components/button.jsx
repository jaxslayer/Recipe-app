import React from "react";

const Button = ({
  label = "",
  bgcolor = "bg-[#1E1F21]",
  hbgcolor = "hover:bg-[#636363]",
  textcolor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={` inline-flex gap-[8px] justify-center items-center px-4 py-2 
        rounded-lg font-[Merriweather]  text-[18px] font-[900] leading-[24px] ${bgcolor} ${textcolor} ${className} ${hbgcolor}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
