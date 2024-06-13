import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import Loading from "../components/loading/Loading";
import { collection, onSnapshot, query } from "firebase/firestore";

const BlogContext = createContext();

function Context({ children }) {
  const [userLoading, setUserLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publish, setPublish] = useState(false);
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [currentUser]);

  // get users
  // fetch user data
  useEffect(() => {
    const getUsers = () => {
      const postRef = query(collection(db, "users"));
      onSnapshot(postRef, (snapshot) => {
        setAllUser(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setUserLoading(false);
      });
    };
    getUsers();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "users"));

  //       setAllUser(
  //         querySnapshot.docs.map((doc) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         }))
  //       );
  //       setUserLoading(false)
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <BlogContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        allUser,
        setAllUser,
        userLoading,
        publish,
        setPublish,
      }}
    >
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  );
}

export default Context;

// custom fn
export const useBlogContext = () => useContext(BlogContext);
