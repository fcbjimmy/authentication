import { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const userContext = createContext();

//custom use userContext hook so that we can use it diretcly in our child components and all childs can directly have access to all the below values
const useUserContext = () => useContext(userContext);

const googleProvider = new GoogleAuthProvider();

export const signInWithGmail = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => console.log(console.log(result)))
    .catch((error) => console.log(error));
};

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user status changed", user);
      user ? setUser(user) : setUser(null);
      console.log(user);
      setError("");
      setLoading(false);
      user.getIdToken().then((token) => {
        console.log(token);
      });
    });
    return unsubscribe;
  }, []);

  const registerUser = (name, email, password) => {
    console.log(name, email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return updateProfile(auth.currentUser, { displayName: name });
      })
      .then((res) => console.log(res))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const loginUser = (email, password) => {
    console.log({ email });
    console.log({ password });
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const signOutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const contextValue = {
    user,
    loading,
    error,
    registerUser,
    loginUser,
    signOutUser,
    forgotPassword,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}

export { useUserContext, userContext, UserContextProvider };
