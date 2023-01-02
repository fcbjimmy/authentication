import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { errorCode } from './helper';

const userContext = createContext();

const useUserContext = () => useContext(userContext);

const googleProvider = new GoogleAuthProvider();

const signInWithGmail = () => {
  signInWithPopup(auth, googleProvider);
};

function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (account) => {
      account ? setUser(account) : setUser(null);
      setError('');
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);

  const registerUser = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => updateProfile(auth.currentUser, { displayName: name }))
      .then((res) => setUser(res))
      .catch((err) => {
        setError(errorCode(err.code));
      })
      .finally(() => setLoading(false));
  };

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        console.log(err.code);
      })
      .finally(() => setLoading(false));
  };

  const signOutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

  const contextValue = {
    user,
    loading,
    error,
    registerUser,
    loginUser,
    signOutUser,
    forgotPassword,
    setError,
    signInWithGmail,
  };

  return <userContext.Provider value={contextValue}>{children}</userContext.Provider>;
}

export { useUserContext, userContext, UserContextProvider };
