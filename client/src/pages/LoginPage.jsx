import { useState } from 'react';
import LoginForm from '../components/LoginForm';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        window.location.href = "http://localhost:3000/home"
      )}
    </>
  );
}