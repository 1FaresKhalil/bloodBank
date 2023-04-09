import React from 'react';

type CardProps = {
  photo: string;
  title: string;
  content: string;
  btnContnet: string;
};
const Card = (props: CardProps) => {
  return (
    <div className="border rounded-xl flex flex-col items-center py-5 px-2 shadow ">
      <div className="w-[90%] m-auto">
        <img src={props.photo} className="w-full" alt={props.title} />
      </div>
      <div className="p-4">
        <h5 className="text-lg md:text-2xl font-bold mb-2 uppercase">
          {props.title}
        </h5>
        <p className="text-base py-3">{props.content}</p>
      </div>
      <button className="outlined-btn shadow shadow-red-500">
        {props.btnContnet}
      </button>
    </div>
  );
};

export default Card;
