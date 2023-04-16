import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  // // Clear token from localStorage
  localStorage.removeItem('token');

  // // Redirect to home page after clearing token
  setTimeout(() => {
    router.replace('/');
  }, 1000);

  // // Invalidate SWR cache
  // const { mutate } = useSWR('https://gp-backend-topaz.vercel.app//admin/profile', (url) =>
  //   fetch(url).then((res) => res.json())
  // );

  // // Call mutate function to refresh data and trigger re-render of components that use this data
  // mutate();

  return (
    <div>
      <h1>You are Signed out now</h1>
    </div>
  );
};

export default Logout;
