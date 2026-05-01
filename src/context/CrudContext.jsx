import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp, doc, getDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../db/firebase";
import { useAuth } from "./AuthContext";

const CrudContext = createContext(null);

const CrudProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const submitPost = async (data) => {
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      console.error("User document not found");
      return;
    }

    const newPost = {
      ...data,
      createdAt: serverTimestamp(),
      userId: user.uid,
      userName: userSnapshot.data().name,
    };

    const docRef = await addDoc(collection(db, "posts"), newPost);
  };

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <CrudContext.Provider value={{ submitPost, posts, loading }}>{children}</CrudContext.Provider>;
};

const useCrud = () => {
  const context = useContext(CrudContext);

  return context;
};

export { useCrud, CrudProvider };
