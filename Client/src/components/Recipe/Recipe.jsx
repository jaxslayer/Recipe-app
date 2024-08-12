import React from "react";
import Button from "../Button";

const Recipe = ({ label, onclick }) => {
  return (
    <div
      className="flex w-[1228px] h-[68.67px] bg-white p-4 justify-between items-center 
    shadow-custom rounded-lg"
    >
      <h2>{label}</h2>
      <Button onClick={onclick} label="View" />
    </div>
  );
};

export default Recipe;
