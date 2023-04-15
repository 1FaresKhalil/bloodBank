import { useRouter } from 'next/router';
import useSWR from 'swr';

const Logout = () => {
  const router = useRouter();

  // Clear token from localStorage
  localStorage.removeItem('token');

  // Redirect to home page after clearing token
  router.push('/');

  // Invalidate SWR cache
  const { mutate } = useSWR('http://localhost:8000/admin/profile', (url) =>
    fetch(url).then((res) => res.json())
  );

  // Call mutate function to refresh data and trigger re-render of components that use this data
  mutate();

  return (
    <div>
      <h1>You are Signed out now</h1>
    </div>
  );
};

export default Logout;
