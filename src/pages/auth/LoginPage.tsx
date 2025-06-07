import React, {useEffect} from 'react';
import {CircleStackIcon} from '@heroicons/react/24/outline';
import {useGoogleAuth} from "../../hooks/firebase/useGoogleAuth.ts";
import {useNavigate} from "react-router-dom";
import appIcon from '../../assets/appicon.png'
import {USER_KEY} from "../../services/StorageService.ts";

const LoginWithGoogle: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    login().then()
  };

  const {user, login} = useGoogleAuth();

  useEffect(() => {
    if (!user) return
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    navigate('/home')
  }, [user]);
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center p-6  rounded-lg">
        <img src={appIcon} className="w-44 h-44 mb-4" alt="logo"/>
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