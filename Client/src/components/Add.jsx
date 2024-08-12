import React from "react";
import Button from "./Button";

const Add = () => {
  return (
    <div className="h-[30px] w-[808px] flex items-center px-[5px] py-[4px] border-[0.5px] border-black bg-white">
      <input
        type="text"
        className="bg-transparent w-full h-full"
        placeholder="Search for recipe"
      />
      <Button className="h-[30px] relative mx-[-5px] my-[4px]" label="Add" />
    </div>
  );
};

export default Add;
