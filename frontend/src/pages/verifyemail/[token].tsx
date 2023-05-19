import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/website/verification?token=${token}`,
    async (url: string) => {
      const response = await axios.get(url);
      // console.log(response.data.user);
      return response.data;
    }
  );

  if (!data) return null;
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center font-font-font-size-64">
      <h1>{data.message}</h1>
      <Link className="text-black font-size-26" href="/home">
        click here to go to home
      </Link>
    </div>
  );
};

export default VerifyEmail;
