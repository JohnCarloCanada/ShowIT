import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../db/firebase";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  /**
   * The function `googleSignin` signs in a user using Google authentication and creates a new user
   * account if it doesn't already exist.
   */
  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const signedInUser = result.user;
    await createUser(signedInUser);
  };

  const logout = () => {
    signOut(auth);
  };

  /**
   * The function `createUser` asynchronously creates a new user document in a Firestore database if
   * the current user does not already exist.
   * @returns If the `currentUser` parameter is falsy (null, undefined, etc.), the function
   * `createUser` will return null. If a user document already exists with the same `uid` as the
   * `currentUser`, the function will also return null. Otherwise, if a new user document is
   * successfully created and saved in the database, nothing will be explicitly returned (implicitly
   * undefined).
   */
  const createUser = async (currentUser) => {
    if (!currentUser) return null;

    const userDocRef = doc(db, "users", currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) return null;

    const newUser = {
      name: currentUser.displayName || "",
      slug: "",
      email: currentUser.email || "",
      photoURL: currentUser.photoURL || "",
      bio: "",
      createdAt: serverTimestamp(),
    };

    await setDoc(userDocRef, newUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ googleSignin, user, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { useAuth, AuthProvider };
