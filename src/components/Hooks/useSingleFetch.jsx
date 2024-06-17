import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

function useSingleFetch(collectionName, id, subCol) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSignleData = () => {
      const postRef = query(collection(db, collectionName, id, subCol));
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
    getSignleData();
  }, []);
  return { data, loading };
}

export default useSingleFetch;
