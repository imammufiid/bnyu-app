import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import appIcon from '../../assets/appicon.png'
import {USER_KEY} from "../../services/StorageService.ts";
import { db, FirestoreCollection } from '../../services/FirebaseService.ts';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { useEmailPasswordAuth } from './useEmailPasswordAuth.ts';
import { useRegisterUser } from './useRegisterUser.ts';
import { MdPerson } from "react-icons/md";

const LoginWithGoogle: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login: emailLogin, error: emailError, loading } = useEmailPasswordAuth();
  const { register, loading: regLoading, error: err, success: regSuccess } = useRegisterUser();


  // Registration state
  const [showRegistration, setShowRegistration] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState<string | null>(null);
  const [regAvatar, setRegAvatar] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = await emailLogin(email, password);
    if (userData) {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      navigate('/home');
    }
    // error is handled by the hook
  };

  const handleRegistration = () => {
    setShowRegistration(true);
    setRegError(null);
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords do not match.");
      return;
    }
    const userData = await register(regEmail, regDisplayName, regPassword, regAvatar);
    if (userData) {
      setShowRegistration(false);
      setEmail(regEmail);
      setPassword("");
      setRegEmail("");
      setRegDisplayName("");
      setRegPassword("");
      setRegConfirmPassword("");
    }
  };

  useEffect(() => {
    if (!user) return

    const userRef = doc(db, FirestoreCollection.users, user.uid);
    getDoc(userRef).then((docSnap) => {
      if (docSnap.exists()) {
        // Update only fields you want, do not overwrite createdAt
        setDoc(userRef, {
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? ''
        }, { merge: true }).then(() => {
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          navigate('/home');
        });
      } else {
        // Create new user with createdAt
        setDoc(userRef, {
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
          createdAt: Timestamp.now()
        }).then(() => {
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          navigate('/home');
        });
      }
    });
  }, [user]);

  useEffect(() => {
    if (regSuccess) {
      setShowRegistration(false);
    }
  }, [regSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center p-8 rounded-2xl w-md" style={{ boxShadow: '0 4px 24px 0 rgba(156, 163, 175, 0.15)' }}>
        {!showRegistration && (
          <img src={appIcon} className="w-32 h-32 mb-6" alt="logo"/>
        )}
        {!showRegistration ? (
          <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-3 mb-4">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {emailError && <div className="text-red-500 text-center text-sm mt-1">{emailError}</div>}
            <div className="text-center text-sm text-gray-500 mt-2">
              Not yet have an account?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer font-semibold"
                onClick={handleRegistration}
              >
                Register
              </span>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegistrationSubmit} className="w-full flex flex-col gap-3 mb-4">
            <div className="flex flex-col items-center mb-2">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                {regAvatar ? (
                  <img
                    src={regAvatar}
                    alt="Avatar Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                    <MdPerson size={36} className="text-gray-400" />
                  </div>
                )}
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setRegAvatar(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <span className="text-xs text-gray-500 mt-1">Click avatar to upload</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Display Name"
              className="px-3 py-2 rounded border border-gray-300 focus:outline-none"
              value={regDisplayName}
              onChange={e => setRegDisplayName(e.target.value)}
              required
            />
            <div className="flex gap-3 w-full">
              <input
                type="password"
                placeholder="Password"
                className="flex-1 min-w-0 px-3 py-2 rounded border border-gray-300 focus:outline-none"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="flex-1 min-w-0 px-3 py-2 rounded border border-gray-300 focus:outline-none"
                value={regConfirmPassword}
                onChange={e => setRegConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
              disabled={regLoading}
            >
              {regLoading ? 'Registering...' : 'Register'}
            </button>
            {(regError || err) && <div className="text-red-500 text-center text-sm mt-1">{regError || err}</div>}
            {regSuccess && <div className="text-green-500 text-center text-sm mt-1">{regSuccess}</div>}
            <div className="text-center text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <span
                className="text-blue-600 hover:underline cursor-pointer font-semibold"
                onClick={() => setShowRegistration(false)}
              >
                Login
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginWithGoogle;