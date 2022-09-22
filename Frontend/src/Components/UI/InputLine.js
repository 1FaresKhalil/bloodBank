import React from "react";

const InputLine = (props) => {
  console.log(props);
  return (
    <>
      <label
        className="pb-[11px] text-[#7B809A] text-[14px]"
        htmlFor={props.input.id}
      >
        {props.label}
      </label>
      <input
        onChange={props.onChange}
        className="pb-[11px] border-b border-[#C7CCD0] placeholder:text-[#C7CCD0] focus:outline-none text-[14px]"
        {...props.input}
      />
    </>
  );
};

export default InputLine;
