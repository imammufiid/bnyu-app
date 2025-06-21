import React, {useEffect} from 'react';
import {useGoogleAuth} from "../../hooks/firebase/useGoogleAuth.ts";
import {useNavigate} from "react-router-dom";
import appIcon from '../../assets/appicon.png'
import {USER_KEY} from "../../services/StorageService.ts";
// import { useFirestoreSaveCollection } from '../../hooks/firebase/useFirestoreSaveCollection.ts';
import { db, FirestoreCollection } from '../../services/FirebaseService.ts';
import { UserWater } from '../../models/UserWater.ts';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

const LoginWithGoogle: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    login().then()
  };

  // const {save} = useFirestoreSaveCollection<UserWater>(FirestoreCollection.users)
  const {user, login} = useGoogleAuth();

  useEffect(() => {
    if (!user) return

    const data: UserWater = {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      createdAt: Timestamp.now()
    }

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