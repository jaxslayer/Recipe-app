import React from "react";

const Roundbutton = ({ children, bgcolor = "", className = "", ...props }) => {
  return (
    <button
      className={`h-10 w-10  ${bgcolor} border drop-shadow-[0px_4px_4px_rgba(0, 0, 0, 0.25] 
      rounded-full flex items-center justify-center border-[#fff5f5] `}
    >
      {children}
    </button>
  );
};

export default Roundbutton;
