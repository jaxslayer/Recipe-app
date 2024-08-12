import React, { useState } from "react";
import Button from "./Button";

const Type = () => {
  const [click, setClick] = useState([false, false, false]);
  let type = ["Breakfast", "Lunch", "Dinner"];
  const Clicked = (i) => {
    let clicks = [...click];
    for (let j = 0; j < clicks.length; j++) {
      clicks[j] = !clicks[j];
      if (j !== i) {
        clicks[j] = false;
      }
    }

    setClick(clicks);
  };
  return (
    <div className="flex justify-between items-start w-[407px]">
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

export default Type;
