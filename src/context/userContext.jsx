import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase/firebase-config';

const userContext = createContext();

const useUserContext = () => useContext(userContext);

const googleProvider = new GoogleAuthProvider();

export const signInWithGmail = () => {
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
        console.log(err.code);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.message === 'Firebase: Error (auth/wrong-password).') {
          console.log(err.message);
          setError('Invalid Password');
        } else if (err.message === 'Firebase: Error (auth/user-not-found).') {
          setError('Email Address not found');
        } else if (err.message === 'Firebase: Error (auth/invalid-email).') {
          setError('Invalid Emaill address');
        } else {
          setError(err.message);
        }
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
  };

  return <userContext.Provider value={contextValue}>{children}</userContext.Provider>;
}

export { useUserContext, userContext, UserContextProvider };
