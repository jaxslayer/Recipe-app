import React from "react";
import Roundbutton from "../Roundbutton";
import { MdLogin } from "react-icons/md";

const LoginBtn = ({ ...props }) => {
  return (
    <Roundbutton {...props}>
      <MdLogin />
    </Roundbutton>
  );
};

export default LoginBtn;
