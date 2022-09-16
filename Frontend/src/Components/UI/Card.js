import React from "react";

const Card = (props) => {
  return (
    <div class="border rounded-xl flex flex-col items-center py-5 px-2 shadow ">
      <div className="w-[90%] m-auto">
        <img src={props.photo} class="w-full" alt={props.title} />
      </div>
      <div class="p-4">
        <h5 class="text-lg md:text-2xl font-bold tracking-widest mb-2 uppercase">
          {props.title}
        </h5>
        <p className="text-base py-3">{props.content}</p>
      </div>
      <button class="outlined-btn shadow shadow-red-500">
        {props.btnContnet}
      </button>
    </div>
  );
};

export default Card;
