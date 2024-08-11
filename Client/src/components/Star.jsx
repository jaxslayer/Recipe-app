import { useState } from "react";
import { IoCustomStar } from "../assets/Star";

const Star = () => {
  const [click, setClick] = useState([false, false, false, false, false]);
  const handleClick = (i) => {
    let clicks = [...click];
    click.forEach((click, index) => {
      if (index <= i) return (clicks[index] = true);
      return (clicks[index] = false);
    });
    setClick(clicks);
  };
  return (
    <div className="inline-flex items-center gap-[4px]">
      {click.map((click, i) => {
        return (
          <IoCustomStar
            key={i}
            onClick={() => handleClick(i)}
            className={`${click ? "fill-[#D97924]" : "fill-white"} ${
              click ? "stroke-[#D97924]" : "stroke-black"
            }`}
            stroke={`${click ? "#D97924" : "black"}`}
          />
        );
      })}
    </div>
  );
};

export default Star;
