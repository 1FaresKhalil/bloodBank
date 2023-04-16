import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  // Check if localStorage is defined before using it
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem('token');
  }

  setTimeout(() => {
    router.replace('/');
  }, 1000);

  // Rest of your code
};

export default Logout;
