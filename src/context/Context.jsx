import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import Loading from "../components/loading/Loading";
import { collection, onSnapshot, query } from "firebase/firestore";
import useFetch from "../components/Hooks/useFetch";

const BlogContext = createContext();

function Context({ children }) {
  const [userLoading, setUserLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publish, setPublish] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commentLength, setCommentLength] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
const [modal, setModal]=useState(false)
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setAllUser([]);
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
  const { data: postData, loading: postLoading } = useFetch("posts");
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
        showModal,
        setShowModal,
        commentLength,
        setCommentLength,
        updateData,
        setUpdateData,
        title,
        setTitle,
        description,
        setDescription,
        postData,
        postLoading,
        modal, 
        setModal
      }}
    >
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  );
}

export default Context;

// custom fn
export const useBlogContext = () => useContext(BlogContext);
