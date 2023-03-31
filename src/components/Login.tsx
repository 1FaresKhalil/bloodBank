type Props = {
  className?: string;
};
const Login = (props: Props) => {
  return (
    <div
      className={`${props.className} bg-white rounded-[15px] lg:py-[3.229vw] lg:px-[2.969vw]`}
    >
      <div className="text-center lg:mb-[3.438vw]">
        <span className="font-size-18 text-math-black lg:mb-[0.833vw]">
          Welcome to
        </span>
        <h2 className="font-size-46 text-green font-bold">Passion to Learn</h2>
        <p className="font-size-18 lg:mt-[0.833vw]">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        </p>
      </div>
      <form className="">
        <div className="relative border rounded-[5px] border-gray-300 lg:mb-[1.250vw]">
          <input
            type="text"
            id="name"
            name="name"
            className="rounded-[5px] font-size-16 font-bold peer h-10 w-full border-none bg-light-gray lg:py-[1.8vw] lg:pt-[2.1vw] lg:px-[1.510vw] lg:pl-[3.4vw] text-gray-900 placeholder:text-transparent focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-[0.4vw] text-[0.729vw] opacity-[0.3] peer-placeholder-shown:text-sm peer-placeholder-shown:text-black peer-placeholder-shown:top-[1.05vw] transition-all peer-focus:top-[.3vw] peer-focus:opacity-100 peer-focus:text-green-700 peer-focus:text-xs lg:pl-[3.1vw]"
          >
            Username or Email
          </label>
          <div className="absolute top-[30%] left-[3%]">
            <img src="/assets/images/person.svg" alt="" />
          </div>
        </div>
        <div className="relative border rounded-[5px] border-gray-300">
          <input
            type="password"
            id="password"
            name="password"
            className="rounded-[5px] font-size-16 font-bold peer h-10 w-full border-none bg-light-gray lg:py-[1.8vw] lg:pt-[2.1vw] lg:px-[1.510vw] lg:pl-[3.4vw] text-gray-900 placeholder:text-transparent focus:outline-none"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute left-3 top-[0.4vw] text-[0.729vw] opacity-[0.3] peer-placeholder-shown:text-sm peer-placeholder-shown:text-black peer-placeholder-shown:top-[1.05vw] transition-all peer-focus:top-[.3vw] peer-focus:opacity-100 peer-focus:text-green-700 peer-focus:text-xs lg:pl-[3.1vw]"
          >
            Password
          </label>
          <div className="absolute top-[30%] left-[3%]">
            <img src="/assets/images/key.svg" alt="" />
          </div>
        </div>
      </form>
      {/* <div className="login-footet">
        <p>
          Contact Us: <span>support@tamergroup.com</span>
        </p>
        <p>
          Don’t have an account? <span>Register</span>
        </p>
      </div> */}
    </div>
  );
};

export default Login;
