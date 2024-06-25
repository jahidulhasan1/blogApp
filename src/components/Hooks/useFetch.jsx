import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../../firebase/firebase";

function useFetch(collectionName) {
  console.log(collectionName);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      const postRef = query(
        collection(db, collectionName),
        orderBy("created", "desc")
      );
      onSnapshot(postRef, (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );

        setLoading(false);
      });
    };
    getUsers();
  }, []);
  return { data, loading };
}

export default useFetch;
