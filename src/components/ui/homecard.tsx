import Link from 'next/link';

type HomeCardProps = {
  title: string;
  description: string;
  buttonText: string;
  path: string;
  bg: string;
};
const HomeCard = (props: HomeCardProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${props.bg})` }}
      className="basis-1/3 bg-no-repeat bg-cover text-center rounded-[20px] px-2 "
    >
      <h2 className="text-4xl text-[#F9F1EF] font-semibold my-10">
        {props.title}{' '}
      </h2>
      <p className="text-2xl text-[#F9F1EF]  my-32 lg:mb-20 lg:mt-0">
        {props.description}
      </p>
      <Link href={props.path}>
        <button className="contained-btn border-none rounded-[20px] text-2xl font-semibold py-3 px-6 mb-5">
          {props.buttonText}
        </button>
      </Link>
    </div>
  );
};

export default HomeCard;
