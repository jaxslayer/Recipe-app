import React, { useEffect, useState } from "react";
import { IoCustomStar } from "../Star";

const Card = ({ title, url, rate, className, onClick, ...props }) => {
  const [rating, setRating] = useState([false, false, false, false, false]);
  useEffect(() => {
    let ratings = [...rating];
    for (let i = 0; i < rate; i++) {
      ratings[i] = true;
    }
    setRating(ratings);
  }, []);
  return (
    <div
      className="flex items-start w-[300px] h-[265px] flex-col gap-2 border-[1.5px] border-[#FFF5F5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer"
      onClick={onClick}
    >
      <img
        src={url}
        alt="It is a picture of item"
        className="w-[300px] h-[201px] self-stretch"
      />
      <div className="gap-2 flex flex-col">
        <p className="font-[400] text-[16px] leading-[22px] font-[Merriweather] ">
          {title}
        </p>
        <div className="inline-flex items-center gap-[4px]">
          {rating.map((click, i) => {
            return (
              <IoCustomStar
                key={i}
                className={`${click ? "fill-[#D97924]" : "fill-white"} ${
                  click ? "stroke-[#D97924]" : "stroke-black"
                }`}
                stroke={`${click ? "#D97924" : "black"}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
