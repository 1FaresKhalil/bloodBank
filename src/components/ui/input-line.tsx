import React from 'react';

type InputProps = {
  input: {
    placeholder: string;
    id: string;
    type: string;
    name: string;
  };
  label: string;
  validtion?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
const InputLine = (props: InputProps) => {
  return (
    <>
      <label
        className={`pb-[11px]  text-[14px] ${
          props.validtion === false
            ? "text-red-500 after:content-['*'] after:ml-0.5 after:text-red-500"
            : 'text-[#7B809A]'
        }`}
        htmlFor={props.input.id}
      >
        {props.label}
      </label>
      <input
        onBlur={props.onBlur}
        onChange={props.onChange}
        className={`pb-[11px] border-b placeholder:text-[#C7CCD0]  focus:outline-none text-[14px]
        ${
          props.validtion === false
            ? 'border-red-500 text-red-600'
            : 'border-[#C7CCD0] '
        }`}
        {...props.input}
      />
    </>
  );
};

export default InputLine;
