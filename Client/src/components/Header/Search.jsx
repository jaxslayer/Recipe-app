import React from "react";
import Roundbutton from "../Roundbutton";
import { FaSearch } from "react-icons/fa";

const Search = ({ ...props }) => {
  return (
    <Roundbutton {...props}>
      <FaSearch />
    </Roundbutton>
  );
};

export default Search;
