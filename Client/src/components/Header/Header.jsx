import React, { useState } from "react";
import Search from "./Search";
import SearchBtn from "./SearchBtn";
import UserBtn from "./UserBtn";
import LoginBtn from "./LoginBtn";

const Header = () => {
  const [Login, setLogin] = useState(true);
  const [click, setClick] = useState(false);
  let Role = "Planner";
  let headvalue;
  switch (Role) {
    case "Cook":
      headvalue = ["Home", "Saved", "Your Recipes"];
      break;
    case "Food Enthusiat":
      headvalue = ["Home", "Saved"];
      break;
    case "Planner":
      headvalue = ["Home", "Saved", "Your Meal"];
      break;
    default:
      headvalue = ["Home"];
      break;
  }
  return (
    <nav className="w-[100vw] h-10 px-[106px] justify-between items-center flex border border-[#FFF5F5] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <h2>Recipe App</h2>
      <div className="flex justify-between items-baseline flex-shrink-0 w-[492px]">
        {headvalue.map((val) => {
          return <button key={val}>{val}</button>;
        })}
      </div>
      <div className="flex items-center justify-center gap-4">
        {click ? (
          <SearchBtn
            onClick={() => {
              setClick(!click);
            }}
          />
        ) : (
          <Search
            onClick={() => {
              setClick(!click);
            }}
          />
        )}
        {Login ? <UserBtn /> : <LoginBtn />}
      </div>
    </nav>
  );
};

export default Header;
