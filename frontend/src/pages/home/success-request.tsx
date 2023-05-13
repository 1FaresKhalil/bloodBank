import Link from 'next/link';
import type { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const SucessRequest = () => {
  return (
    <div className="h-screen flex flex-col gap-2 justify-center items-center">
      <h1 className="font-size-64 text-green-500">
        Your request has been sent successfully
      </h1>
      <Link className="text-black font-size-22" href={'/home'}>
        Go back
      </Link>
    </div>
  );
};

export default SucessRequest;
