import React, { useId } from "react";

const Input = (
  { Label = "Label of field", type = "text", className, ...props },
  ref
) => {
  const id = useId();
  return (
    <div className="flex-col gap-[6px] items-start w-[296px] h-[59px]">
      <label htmlFor={id} className="text-[24px] leading-[26.4px] font-[700]">
        {Label}
      </label>
      <input
        type={type}
        id={id}
        {...props}
        ref={ref}
        className={`w-[296px] h-[32px] border-[0.5px] border-black ${className}`}
      />
    </div>
  );
};

export default React.forwardRef(Input);
