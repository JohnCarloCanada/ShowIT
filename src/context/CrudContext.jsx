import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../db/firebase";
import { useAuth } from "./AuthContext";

const CrudContext = createContext(null);

const CrudProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  /**
   * The `submitPost` function in JavaScript React handles submitting a new post with user
   * authentication and user document validation.
   * @returns The `submitPost` function returns nothing (`undefined`) if the user is not authenticated
   * or if the user document is not found. If the function successfully adds a new post to the
   * database, it does not explicitly return anything.
   */
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

    setIsSubmitting(true);

    const newPost = {
      ...data,
      createdAt: serverTimestamp(),
      userId: user.uid,
      userName: userSnapshot.data().name,
    };

    try {
      await addDoc(collection(db, "posts"), newPost);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePost = async (postId) => {
    const postDocRef = doc(db, "posts", postId);
    await deleteDoc(postDocRef);
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

  return (
    <CrudContext.Provider value={{ submitPost, posts, loading, deletePost, isSubmitting }}>
      {children}
    </CrudContext.Provider>
  );
};

const useCrud = () => {
  const context = useContext(CrudContext);

  return context;
};

export { useCrud, CrudProvider };
