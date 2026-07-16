import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
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
  updateDoc,
  runTransaction,
  increment,
  writeBatch,
} from "firebase/firestore";
import { db } from "../db/firebase";
import { useAuth } from "./AuthContext";

const CrudContext = createContext(null);

const CrudProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postLimit, setPostLimit] = useState(6);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { user } = useAuth();

  const visiblePosts = useMemo(() => posts.slice(0, postLimit), [posts, postLimit]);
  const hasMorePosts = posts.length > visiblePosts.length;

  const loadMorePosts = useCallback(() => {
    setPostLimit((prevLimit) => {
      const nextLimit = Math.min(prevLimit + 6, posts.length);
      return prevLimit === nextLimit ? prevLimit : nextLimit;
    });
  }, [posts.length]);

  useEffect(() => {
    if (loading || isFetchingMore || !hasMorePosts) return;

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 300;

      if (scrollPosition >= threshold) {
        setIsFetchingMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, isFetchingMore, hasMorePosts]);

  useEffect(() => {
    if (!isFetchingMore) return;

    const timer = window.setTimeout(() => {
      loadMorePosts();
      setIsFetchingMore(false);
    }, 600);

    return () => window.clearTimeout(timer);
  }, [isFetchingMore, loadMorePosts]);

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
      userName: userSnapshot.data().name.split(" ")[0],
      likeCount: 0,
      userLikes: [],
      commentCount: 0,
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

  const getPost = (id) => {
    const post = posts.filter((post) => post.id === id);

    if (!user?.uid) return null;
    if (user?.uid !== post[0].userId) {
      return null;
    }

    return { ...post[0] };
  };

  const updatePost = async (data) => {
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

    const updatePost = {
      briefDescription: data.briefDescription,
      projectTitle: data.projectTitle,
      projectURL: data.projectURL,
      techStack: data.techStack,
      updatedAt: new Date(),
    };

    try {
      const postRef = doc(db, "posts", data.postId);
      await updateDoc(postRef, updatePost);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleUpvote = async (postId, userId) => {
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }

    const postRef = doc(db, "posts", postId);
    const likeRef = doc(db, "posts", postId, "likes", userId);

    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        const likeDoc = await transaction.get(likeRef);
        const userLikes = postDoc.data()?.userLikes || [];

        if (likeDoc.exists()) {
          // 1. If like exists, remove it (Unlike)
          transaction.delete(likeRef);
          transaction.update(postRef, {
            likeCount: increment(-1),
            userLikes: userLikes.filter((uid) => uid !== userId),
          });
        } else {
          // 2. If it doesn't exist, add it (Like)
          transaction.set(likeRef, { createdAt: new Date(), userName: user?.displayName?.split(" ")[0] });
          transaction.update(postRef, {
            likeCount: increment(1),
            userLikes: [...userLikes, userId],
          });
        }
      });
    } catch (e) {
      console.error("Transaction failed: ", e);
    }
  };

  const handleComment = async (postId, commentData) => {
    if (!user?.uid) return;

    if (!commentData.trim()) return;

    const batch = writeBatch(db);

    // 1. Reference the "comments" sub-collection folder
    const commentsRef = collection(db, "posts", postId, "comments");

    // 2. Generate a new document reference with an auto-ID
    const newCommentRef = doc(commentsRef);

    // 3. Queue up the new comment data
    batch.set(newCommentRef, {
      text: commentData,
      userId: user.uid,
      userName: user?.displayName?.split(" ")[0],
      createdAt: serverTimestamp(),
    });

    // 4. Queue up the increment on the parent post doc
    const postRef = doc(db, "posts", postId);
    batch.update(postRef, {
      commentCount: increment(1),
    });

    // 5. Commit both operations to the server simultaneously
    await batch.commit();
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

  const checkIfUserLiked = (postId) => {
    if (!user?.uid) return false;
    const post = posts.find((p) => p.id === postId);
    return post?.userLikes?.includes(user.uid) || false;
  };

  const getCommentsForPost = (postId) => {
    const q = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return unsubscribe;
  };

  return (
    <CrudContext.Provider
      value={{
        submitPost,
        posts,
        visiblePosts,
        loading,
        hasMorePosts,
        isFetchingMore,
        loadMorePosts,
        deletePost,
        isSubmitting,
        getPost,
        updatePost,
        toggleUpvote,
        checkIfUserLiked,
        handleComment,
        getCommentsForPost,
        comments,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

const useCrud = () => {
  const context = useContext(CrudContext);

  return context;
};

export { useCrud, CrudProvider };
