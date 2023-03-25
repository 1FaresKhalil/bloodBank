import React from "react";

const Input = (props) => {
  // console.log(props);
  return (
    <>
      <label
        className={`pb-[11px]  text-[14px] ${
          props.validtion === false
            ? "text-red-500 after:content-['*'] after:ml-0.5 after:text-red-500"
            : "text-[#7B809A]"
        } ${props.label === "ذكر" ? "pb-0 mr-2" : "pb-[11px] mr-0"} ${
          props.label === "انثى" ? "pb-0" : "pb-[11px]"
        }`}
        htmlFor={props.input.id}
      >
        {props.label}
      </label>
      <input
        onBlur={props.onBlur}
        onChange={props.onChange}
        className={`py-3 px-3 border rounded-lg placeholder:text-[#7B809A]  focus:outline-none text-[14px] ${
          props.className
        }
        ${
          props.validtion === false
            ? "border-red-500 text-red-600"
            : "border-[#C7CCD0] "
        }`}
        {...props.input}
      />
    </>
  );
};

export default Input;
