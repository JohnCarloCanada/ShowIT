import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../db/firebase";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const signedInUser = result.user;
    await createUser(signedInUser);
  };

  const logout = () => {
    signOut(auth);
  };

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
