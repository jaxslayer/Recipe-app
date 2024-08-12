import React, { useState } from "react";
import Button from "./Button";

const Days = () => {
  const [click, setClick] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  let type = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const Clicked = (i) => {
    let clicks = [...click];
    clicks[i] = !clicks[i];
    setClick(clicks);
  };
  return (
    <div className="inline-flex items-center gap-2 ">
      {type.map((label, i) => {
        return (
          <Button
            label={label}
            key={i}
            bgcolor={click[i] ? "bg-[#636363]" : ""}
            className={
              click[i]
                ? "border border-[#636363]"
                : "border border-black text-black"
            }
            hbgcolor=""
            onClick={() => {
              Clicked(i);
            }}
          />
        );
      })}
    </div>
  );
};

export default Days;
