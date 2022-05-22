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

const userContext = createContext();

//   custom use userContext hook so that we can use it diretcly in our child components and all childs can directly have access to all the below values
const useUserContext = () => useContext(userContext);

const googleProvider = new GoogleAuthProvider();

export const signInWithGmail = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (account) => {
      console.log('user status changed', account);
      account ? setUser(account) : setUser(null);
      console.log(account);
      setError('');
      setLoading(false);
      account.getIdToken().then((token) => {
        console.log(token);
      });
    });
    return unsubscribe;
  }, []);

  const registerUser = (name, email, password, confirmPassword) => {
    console.log(name, email, password, confirmPassword);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => updateProfile(auth.currentUser, { displayName: name }))
      .then((res) => console.log(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const loginUser = (email, password) => {
    console.log({ email });
    console.log({ password });
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.message === 'Firebase: Error (auth/wrong-password).') {
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
