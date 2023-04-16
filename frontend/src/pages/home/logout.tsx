import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    // Perform any necessary token removal or cleanup here
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
    }

    // Redirect to home page
    await router.replace('/');
  };

  // Call handleLogout during render to perform the logout logic
  handleLogout();

  return (
    <div>
      <div>Signing out...</div>
    </div>
  );
};

export default Logout;
