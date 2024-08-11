import React from "react";
import Roundbutton from "../Roundbutton";
import { FaUserAlt } from "react-icons/fa";

const UserBtn = () => {
  return (
    <Roundbutton bgcolor="bg-[#D9D9D9]">
      <FaUserAlt color="white" />
    </Roundbutton>
  );
};

export default UserBtn;
