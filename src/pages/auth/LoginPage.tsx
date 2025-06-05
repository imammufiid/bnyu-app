import React, {useEffect} from 'react';
import {CircleStackIcon} from '@heroicons/react/24/outline';
import {useGoogleAuth} from "../../hooks/firebase/useGoogleAuth.ts";

const LoginWithGoogle: React.FC = () => {
  const handleGoogleLogin = () => {
    login().then()
  };

  const {user, login} = useGoogleAuth();

  useEffect(() => {
    console.log("User Google Login", user)
  }, [user]);
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center p-6  rounded-lg">
        <CircleStackIcon
          className="w-32 h-32 mb-6"
        />
        <button
          onClick={handleGoogleLogin}
          className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginWithGoogle;