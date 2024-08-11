import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBtn = ({ ...props }) => {
  return (
    <div className="h-[34px] w-[294px] border-[0.5px] border-black shrink-0 bg-white flex flex-row">
      <input type="text" className="bg-transparent h-[34px] w-[262px]" />
      <button
        className="border-black border gap-[10px] h-[34px] w-8 inline-flex"
        {...props}
      >
        <FaSearch size={34} />
      </button>
    </div>
  );
};

export default SearchBtn;
