import React from "react";
import Button from "../Button";

const Recipe = ({ label, onclick }) => {
  return (
    <div
      className="flex w-[1228px] h-[68.67px] bg-white p-4 justify-between items-center 
    shadow-custom rounded-lg"
    >
      <h2>{label}</h2>
      <div
        className="flex items-center p-[10px] gap-[10px] border-[#E83A3A] rounded-lg border hover:cursor-pointer"
        onClick={onclick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="17"
          viewBox="0 0 15 17"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 1.66667H5V0H10V1.66667ZM6.66667 6.66667H5V13.3333H6.66667V6.66667ZM10 6.66667H8.33333V13.3333H10V6.66667ZM15 3.33333V5H13.3333V16.6667H1.66667V5H0V3.33333H15ZM11.6667 5H3.33333V15H11.6667V5Z"
            fill="#E83A3A"
          />
        </svg>
      </div>
    </div>
  );
};

export default Recipe;
