import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center font-font-font-size-64">
      <h1>user not authenticated</h1>
      <Link className="text-black font-size-26" href="/login">
        click here to login
      </Link>
    </div>
  );
};

export default ErrorPage;
