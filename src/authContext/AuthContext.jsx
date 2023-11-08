import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import useAxios from "../hooks/useAxios";

export const ThemeContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axios = useAxios();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userEmail = user?.email || user?.email;
      const loggedUser = { email: userEmail };

      if (user) {
        setUser(user);
        axios
          .post("/jwt", loggedUser, { withCredentials: true })
          .then((res) => {
            console.log("token response", res.data);
          });
      } else {
        setUser(null);
        axios
          .post("/logout", loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  return (
    <div>
      <ThemeContext.Provider
        value={{
          login,
          logout,
          createUser,
          user,
          loading,
          googleLogin,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </div>
  );
};

export default AuthProvider;
