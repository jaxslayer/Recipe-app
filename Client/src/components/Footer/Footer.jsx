import React from "react";
import Roundbutton from "../Roundbutton";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-[100vw] py-[14px] h-[100px] flex justify-center items-center border-[#FFF5F5] shadow-[-1px_-4px_4px_0px_rgba(0,0,0,0.25)] absolute bottom-0">
      <div className="flex flex-col h-[72px] w-[277px] gap-2 items-center">
        <h2>Contact us</h2>
        <div className="flex justify-between self-stretch items-center">
          <a href="http://www.instagram.com" target="_blank">
            <Roundbutton bgcolor="bg-[#636363]">
              <RiInstagramFill color="white" />
            </Roundbutton>
          </a>
          <a href="http://www.x.com" target="_blank">
            <Roundbutton bgcolor="bg-[#636363]">
              <BsTwitterX color="white" />
            </Roundbutton>
          </a>
          <a href="http://mail.google.com" target="_blank">
            <Roundbutton bgcolor="bg-[#636363]">
              <MdMailOutline color="white" />
            </Roundbutton>
          </a>
          <a href="https://www.facebook.com" target="_blank">
            <Roundbutton bgcolor="bg-[#636363]">
              <FaFacebook color="white" />
            </Roundbutton>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
